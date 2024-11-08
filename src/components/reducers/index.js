import { combineReducers } from "redux";

import {vendorsReducer} from './vendorsReducer';
import {customersReducer} from './customerReducer';
import {insurancesReducer} from './insuranceReducer';
import {logisticssReducer} from './logisticssReducer';
import {listTransactionsReducer} from './listTransactionsReducer';
import {listNotificationsReducer} from './listNotificationsReducer';


const idReducer = (id = null, action) =>{
    if(action.type === 'ADD_TRANSACTION'){
        return id = action.payload;
    }
    return id;
}


export default combineReducers({

    currentId: idReducer,

    listVendors: vendorsReducer,
    listCustomers: customersReducer,
    listInsurences: insurancesReducer,
    listLogisticss: logisticssReducer,

    resultListTransactions: listTransactionsReducer,

    listNotifications: listNotificationsReducer

});

