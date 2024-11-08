import {fork, call, put, delay, takeEvery, take, select } from "redux-saga/effects";



export default function *vendorSaga(arg){

    const [currentId] = arg;

    yield take('VENDOR_REGISTRATION');
    yield call(workerVendorRegistration, currentId);

    yield take('VENDOR_COORDINATION');
    yield call(workerVendorCoordination, currentId)

    yield take('VENDOR_BOOKING');
    yield call(workerVendorBooking, currentId);

    yield take('VENDOR_CONCLUSION');
    yield call(workerVendorConclusion, currentId);

}


function* workerVendorRegistration(currentId){

    // const currentId = yield select((state) => state.currentId);
    const listVendors = yield select((state) => state.listVendors);

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){          
                if(list[i].name !== ''){      
                    return true;                   
                }     
                 break;       
            }           
        }
    }, currentId, listVendors);
    if(isResult){
        yield delay(1000);
        yield put({type: 'VENDOR_REGISTRATION_STAGE'});
    }
}

function* workerVendorCoordination(currentId){

    
    // const currentId = yield select((state) => state.currentId);
    const listVendors = yield select((state) => state.listVendors);

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){          
                if(list[i].category !== '' && list[i].total !== ''){      
                    return true;                   
                }     
                 break;       
            }           
        }
    }, currentId, listVendors);
    if(isResult){
        yield delay(1000);
        yield put({type: 'VENDOR_COORDINATION_STAGE'});
    }
}

function* workerVendorBooking(currentId){


    // const currentId = yield select((state) => state.currentId);
    const listVendors = yield select((state) => state.listVendors);

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){          
                if(list[i].sum !== ''){      
                    return true;                   
                }     
                 break;       
            }           
        }
    }, currentId, listVendors);
    if(isResult){
        yield delay(1000);
        yield put({type: 'VENDOR_BOOKING_STAGE'});
    }
}

function* workerVendorConclusion(currentId){


    // const currentId = yield select((state) => state.currentId);
    const listVendors = yield select((state) => state.listVendors);

    const isResult = yield call((curId, list) => {
        for(let i = 0; i < list.length; i++){
            if(list[i].id === curId){          
                if(list[i].typePayment !== ''){      
                    return true;                   
                }       
                break;   
            }                       
        }
    }, currentId, listVendors);

    if(isResult){
        yield delay(1000);
        yield put({type: 'VENDOR_CONCLUSION_STAGE'});
    }
}

