import {put, delay, takeEvery, select, call, take, fork } from "redux-saga/effects";
import { v4 } from "uuid";



export default function *logisticsSaga(arg){

    const [currentId, exchangeChannel] = arg;

    const currentIdSaga = v4();

    yield take('LOGISTICS_REGISTRATION');
    yield call(workerLogisticsRegistration, currentId);

    yield take('LOGISTICS_COORDINATION');
    yield call(workerLogisticsCoordination, [currentId, currentIdSaga]);

    yield take('LOGISTICS_BOOKING');
    yield call(workerLogisticsBooking, currentId);

    yield take('LOGISTICS_CONCLUSION');
    yield call(workerLogisticsConclusion, [currentId, exchangeChannel, currentIdSaga]);

    // yield takeEvery(exchangeChannel, additionalWorker);  ошибка будет выброшена т.к. НЕМЕДЛЕННО ПОТРЕБЛЯЕТСЯ ТЕЙКЕРОМ 
    yield fork(additionalWorker, [currentId, exchangeChannel, currentIdSaga]); 
}


function *workerLogisticsRegistration(currentId){

    // const currentId = yield select((state) => state.currentId);
    const listLogisticss = yield select((state) => state.listLogisticss);

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                if(list[i].name !== ''){
                    return true;
                } 
                break;
            }       
        }
    }, currentId, listLogisticss);

    if(isResult){
        yield delay(1000);
        yield put({type: 'LOGISTICS_REGISTRATION_STAGE'});     
    }
}

function *workerLogisticsCoordination(arg){

    const [currentId, currentIdSaga] = arg;

    // const currentId = yield select((state) => state.currentId);
    const listLogisticss = yield select((state) => state.listLogisticss);
    let currentName = '';

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                currentName = listLogisticss[i].name;
                if(list[i].nameVendor !== '' && list[i].nameCustomer !== '' && list[i].typeDelivery !== ''){
                    return true;
                } 
                break;
            }       
        }
    }, currentId, listLogisticss);
    if(isResult){
        yield delay(1000);
        yield put({type: 'LOGISTICS_COORDINATION_STAGE'});

        let resultDelivery =  yield call(()=>{
            return new Promise((resolve) => {setTimeout(()=>{resolve('очікування')}, 1000)});
        })    
        yield put({type: 'DELIVERY', payload: { resultDelivery, currentId, currentName, currentIdSaga, timeMinute: new Date().getMinutes(), idNotification: v4()}});
    }
}

function *workerLogisticsBooking(currentId){

    // const currentId = yield select((state) => state.currentId);
    const listLogisticss = yield select((state) => state.listLogisticss);


    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                if(list[i].sum !== ''){
                    return true;
                } 
                break;
            }       
        }
    }, currentId, listLogisticss);
    if(isResult){
        yield delay(1000);
        yield put({type: 'LOGISTICS_BOOKING_STAGE'});
    }
}

function *workerLogisticsConclusion(arg){

    const [currentId, exchangeChannel, currentIdSaga] = arg;

    // const currentI = yield select((state) => state.currentId);

    const listLogisticss = yield select((state) => state.listLogisticss);
    let currentName = '';

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                currentName = listLogisticss[i].name;
                if(list[i].addressVidpravlennia !== '' && list[i].addressOtrimannia !== '' && list[i].sposibDostavki !== ''){
                    return true;
                } 
                break;
            }       
        }
    }, currentId, listLogisticss);

    if(isResult){
        yield delay(1000);
        yield put({type: 'LOGISTICS_CONCLUSION_STAGE'});      

    // сначала слушаем канал ---- и ничего не слышно
    // let message = yield take(exchangeChannel, '*');      
    // if(message === 'оформлено'){
    //     let resultDelivery =  yield call(()=>{
    //         return new Promise((resolve) => {setTimeout(()=>{resolve('очікування')},1000)})
    //     })    
    // yield put({type: 'DELIVERY', payload: { resultDelivery, currentId, currentName, currentIdSaga }});    
    // yield put(exchangeChannel, resultDelivery); // и передаем в канал  'очікування'
    // }
    let resultDelivery = yield call(() => {
        return new Promise((resolve) => { setTimeout(() => {resolve('відправлено')}, 1000)})
    })
    yield put({type: 'DELIVERY', payload: { resultDelivery, currentId, currentName, currentIdSaga, timeMinute: new Date().getMinutes(), idNotification: v4()}})
    // и
    yield put(exchangeChannel, { resultDelivery }); // отправляем в канал 'відправлено'
    }
}


function *additionalWorker(arg){

    while(true){

      const  [currentId, exchangeChannel, currentIdSaga] = arg;

         // теперь слушаем канал
        let message = yield take(exchangeChannel, '*');    
        
         // этот блока был перед take() и так работало
        // const currentId = yield select((state) => state.currentId);
        const listLogisticss = yield select((state) => state.listLogisticss);
        let currentName = '';
        
        for (let i = 0; i < listLogisticss.length; i++){
            if(listLogisticss[i].id === currentId){
                currentName = listLogisticss[i].name;
                    break;
                }
            }
        
        if(message.resultBookingInsurance === 'схвалено'){

            let  resultDelivery =  yield call(()=>{
                return new Promise((resolve) => { setTimeout(()=>{resolve('доставка')}, 3000)})
            })              
            yield put({type: 'DELIVERY', payload: { resultDelivery, currentId, currentName, currentIdSaga, timeMinute: new Date().getMinutes(), idNotification: v4()}})
        
            resultDelivery =  yield call(()=>{
                return new Promise((resolve) => { setTimeout(()=>{resolve('доставлено')}, 3000)})
            })
            yield  put({type: 'DELIVERY', payload: { resultDelivery, currentId, currentName, currentIdSaga, timeMinute: new Date().getMinutes(), idNotification: v4()}})
            // и
            yield put(exchangeChannel, {resultDelivery}); // и отправляем в канал 'доставлено'
        }
    }
}


