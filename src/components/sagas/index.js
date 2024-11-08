import { call, fork, take, takeEvery, select, spawn  } from "redux-saga/effects";
import {channel, multicastChannel} from "redux-saga";
import vendorSaga from './vendor';
import customerSaga from './customer';
import insuranceSaga from './insurance';
import logisticsSaga from './logistics';



export default function* rootSaga() {


  // while(true){
  //         const {payload} = yield take('ADD_TRANSACTION');

  //         yield fork(function*(arg){

  //                 const [currentId] = arg;

  //                 const  exchangeChannel  = yield call(multicastChannel);  

  //                 yield fork(vendorSaga, [currentId]);
  //                 yield fork(customerSaga, [currentId, exchangeChannel])
  //                 yield fork(insuranceSaga, [currentId, exchangeChannel]);
  //                 yield fork(logisticsSaga,  [currentId, exchangeChannel]);

  //     },[payload])
  // }



      yield takeEvery('ADD_TRANSACTION', function*(){

                    const currentId = yield select((state) => state.currentId);

                    const exchangeChannel = yield call(multicastChannel);
      
                    yield fork(vendorSaga, [currentId])
                    yield fork(customerSaga, [currentId, exchangeChannel])
                    yield fork(insuranceSaga, [currentId, exchangeChannel])
                    yield fork(logisticsSaga, [currentId, exchangeChannel])



        });



}

