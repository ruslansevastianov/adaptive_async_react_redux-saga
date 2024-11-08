import {put, delay, takeEvery, select, call, take, fork } from "redux-saga/effects";
import { v4 } from "uuid";


export default function *customerSaga(arg){
    
    const [currentId, exchangeChannel] = arg;


    const currentIdSaga = v4();

    yield take('CUSTOMER_REGISTRATION');
    yield call(workerCustomerRegistration, currentId);

     yield take('CUSTOMER_COORDINATION'); 
     yield call(workerCustomerCoordination, currentId);

     yield take('CUSTOMER_BOOKING');
     yield call(workerCustomerBooking, [currentId, currentIdSaga]);

     yield take('CUSTOMER_CONCLUSION');
     yield call(workerCustomerConclusion, currentId);

    //  yield takeEvery(exchangeChannel, additionalWorker);  ошибка будет выброшена т.к. НЕМЕДЛЕННО ПОТРЕБЛЯЕТСЯ ТЕЙКЕРОМ 
    yield fork(additionalWorker, [exchangeChannel, currentId, currentIdSaga]);

}


function *workerCustomerRegistration(currentId){


    // const currentId = yield select((state) => state.currentId);
    const listCustomers = yield select((state) => state.listCustomers);

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                if(list[i].name !== ''){
                    return true;
                }      
                break;           
            }      
        }
    }, currentId, listCustomers);

    if(isResult){
        yield delay(1000);
        yield put({type: 'CUSTOMER_REGISTRATION_STAGE'});
    }
}

function *workerCustomerCoordination(currentId){

    // const currentId = yield select((state) => state.currentId);
    const listCustomers = yield select((state) => state.listCustomers);

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                if(list[i].category !== '' && list[i].total !== ''){
                    return true;
                }      
                break;           
            }           
        }
    }, currentId, listCustomers);
    if(isResult){
        yield delay(1000);
        yield put( {type: 'CUSTOMER_COORDINATION_STAGE'});
    }
}

function *workerCustomerBooking(arg){

    const [currentId, currentIdSaga] = arg;

    // const currentId = yield select((state) => state.currentId);
    const listCustomers = yield select((state) => state.listCustomers);
    let currentName = '';  

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                currentName = listCustomers[i].name;  
                if(list[i].sum !== ''){
                    return true;
                }      
                break;           
            }          
        }
    }, currentId, listCustomers);
    if(isResult){
        yield delay(1000);
        yield put({type: 'CUSTOMER_BOOKING_STAGE'})


        let resultPayment =  yield call(()=>{
            return new Promise((resolve) => {setTimeout(()=>{resolve('очікується')},8000)})
        })
        yield put({type: 'PAYMENT', payload: {resultPayment, currentId, currentName, currentIdSaga, timeMinute: new Date().getMinutes(), idNotification: v4()}})
    }
}

function *workerCustomerConclusion(currentId){
    
    // const currentId = yield select((state) => state.currentId);
    const listCustomers = yield select((state) => state.listCustomers);

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                if(list[i].rekvizit !== ''){
                    return true;
                }      
                break;           
            }      
        }
    }, currentId, listCustomers);
    if(isResult){
        yield delay(1000);
        yield put({type: 'CUSTOMER_CONCLUSION_STAGE'})
    }
}

function *additionalWorker(arg){
    
    while(true){

        const [exchangeChannel, currentId, currentIdSaga] = arg

        // теперь слушаем канал
        let message = yield take(exchangeChannel, '*');
        
        // этот блока был перед take() и так работало
        // const currentId = yield select((state) => state.currentId); //уже не надо
        const listCustomers = yield select((state) => state.listCustomers);
        let currentName = '';
                
        for(let i = 0; i < listCustomers.length; i++){
            if(listCustomers[i].id === currentId){
                currentName = listCustomers[i].name;     
                break;           
            }      
        }

            if(message.resultDelivery === 'доставлено'){
                let resultPayment = yield call(() => {
                    return new Promise((resolve) => {setTimeout(() => {resolve('огляд')}, 3000)})
                })
                yield put({type: 'PAYMENT', payload: {resultPayment, currentId, currentName, currentIdSaga, timeMinute: new Date().getMinutes(), idNotification: v4()}})
        
                resultPayment =  yield call(()=>{
                    return new Promise((resolve) => {setTimeout(()=>{resolve('оплачено')}, 3000)})
                })
                yield put({type: 'PAYMENT', payload: {resultPayment, currentId, currentName, currentIdSaga, timeMinute: new Date().getMinutes(), idNotification: v4()}})

            }
            
    }
}