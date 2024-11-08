import {put, delay, takeEvery, select, call, take, fork } from "redux-saga/effects";
import { v4 } from "uuid";

export default function *insuranceSaga(arg){

    const [currentId, exchangeChannel] = arg;

    const currentIdSaga = v4();

    yield take('INSURANCE_REGISTRATION');
    yield call(workerInsuranceRegistration, currentId);

    yield take('INSURANCE_COORDINATION');
    yield call(workerInsuranceCoordination, [currentId, currentIdSaga]);

    yield take('INSURANCE_BOOKING');
    yield call(workerInsuranceBooking, currentId);

    yield take('INSURANCE_CONCLUSION');
    yield call(workerInsuranceConclusion, currentId);

    // yield takeEvery(exchangeChannel, additionalWorker)  ошибка будет выброшена т.к. НЕМЕДЛЕННО ПОТРЕБЛЯЕТСЯ ТЕЙКЕРОМ 
    yield fork(additionalWorker, currentId,  exchangeChannel, currentIdSaga);
}

function *workerInsuranceRegistration(currentId){

    // const currentId = yield select((state) => state.currentId);
    const listInsurences = yield select((state) => state.listInsurences);

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                if(list[i].name !== ''){
                    return true;
                }     
                break;
            }       
        }
    }, currentId, listInsurences);
    if(isResult){
        yield delay(1000);
        yield put({type:  'INSURANCE_REGISTRATION_STAGE'});
    }
}

function *workerInsuranceCoordination(arg){

    const [currentId, currentIdSaga] = arg;

    // const currentId = yield select((state) => state.currentId);
    const listInsurences = yield select((state) => state.listInsurences);
    let currentName = '';

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                currentName = list[i].name;
                if(list[i].nameVendor !== '' && list[i].nameCustomer !== ''){
                    return true;
                }     
                break;
            }       
        }
    }, currentId, listInsurences);
    if(isResult){
        yield delay(1000);
        yield put({type:  'INSURANCE_COORDINATION_STAGE'});


        let resultBookingInsurance =  yield call(()=>{
            return new Promise((resolve) => {setTimeout(()=>{resolve('оформлено')},1000)})
        })
        yield put({type: 'BOOKING', payload: {resultBookingInsurance, currentId, currentName, currentIdSaga, timeMinute: new Date().getMinutes(), idNotification: v4()}}); // отправляется BOOKING также в Компонент - УВЕДОМЛЕНИЯ
    }
}

function *workerInsuranceBooking(currentId){

    // const currentId = yield select((state) => state.currentId);
    const listInsurences = yield select((state) => state.listInsurences);

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                if(list[i].sum !== ''){
                    return true;
                }     
                break;
            }       
        }
    }, currentId, listInsurences);
    if(isResult){
        yield delay(1000);
        yield put({type:  'INSURANCE_BOOKING_STAGE'}); 
    }
}

function *workerInsuranceConclusion(currentId){

    // const currentId = yield select((state) => state.currentId);
    const listInsurences = yield select((state) => state.listInsurences);

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){
                if(list[i].specNumber !== ''){
                    return true;
                }     
                break;
            }       
        }
    }, currentId, listInsurences);
    if(isResult){
        yield delay(1000);
        yield put({type:  'INSURANCE_CONCLUSION_STAGE'});
    }
}

function *additionalWorker(currentId, exchangeChannel, currentIdSaga){

    while(true){

       // теперь слушаем канал
        let message = yield take(exchangeChannel,'*');

        // этот блок был перед take() и не работало было потом не определено  currentName
        // const currentId = yield select((state) => state.currentId); //////////// уже по этому currentId нельзя ориентироваться
        const listInsurences = yield select((state) => state.listInsurences);
        let currentName = '';

        for(let i = 0; i < listInsurences.length; i++){  
            if(listInsurences[i].id === currentId){
                currentName = listInsurences[i].name;
                break;
            }       
        }


        if(message.resultDelivery === 'відправлено'){

            let resultBookingInsurance = yield call(() => {
                return new Promise((resolve) => {setTimeout(() => {resolve('подання')},3000)})
    })

        yield put({type: 'BOOKING', payload: {resultBookingInsurance, currentId, currentName, currentIdSaga, timeMinute: new Date().getMinutes(), idNotification: v4()}})
        resultBookingInsurance =  yield call(()=>{
            return new Promise((resolve) => {setTimeout(()=>{resolve('обробка')},3000)})
    })
        yield put({type: 'BOOKING', payload: {resultBookingInsurance, currentId, currentName, currentIdSaga, timeMinute: new Date().getMinutes(), idNotification: v4()}})
     
        resultBookingInsurance =  yield call(()=>{
            return new Promise((resolve) => {setTimeout(()=>{resolve('схвалено')},3000)})
    })
        yield  put({type: 'BOOKING', payload: {resultBookingInsurance, currentId, currentName, currentIdSaga, timeMinute: new Date().getMinutes(), idNotification: v4()}})  
        // и
        yield put(exchangeChannel, {resultBookingInsurance}); //и отправляем в канал 'схвалено'

       }
}
}