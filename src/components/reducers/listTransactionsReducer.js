export const listTransactionsReducer = (transactions = [], action) => {

    if(action.type === 'ADD_TRANSACTION'){
        return [...transactions, { id: action.payload }]
    }
    
    if(action.type === 'VENDOR_REGISTRATION_DATA'){
       return transactions.map((transaction) => {
            if(transaction.id === action.payload.id){
                return {
                    nameVendor: action.payload.name,
                    ...transaction
                }
            }
            return{...transaction};
        })
    }
    if(action.type === 'CUSTOMER_REGISTRATION_DATA'){
        return  transactions.map((transaction) => {
            if(transaction.id === action.payload.id){
                return {
                    nameCustomer: action.payload.name,
                    ...transaction
                }
            }
            return{...transaction};
        })
    }
    if(action.type === 'INSURANCE_REGISTRATION_DATA'){
        return transactions.map((transaction) => {
            if(transaction.id === action.payload.id){
                return {
                    nameInsurance: action.payload.name,
                    ...transaction
                }
            }
            return{...transaction};
        })
    }
    if(action.type === 'LOGISTICS_REGISTRATION_DATA'){
        return  transactions.map((transaction) => {
            if(transaction.id === action.payload.id){
                return {
                    nameLogistics: action.payload.name,
                    ...transaction
                }
            }
            return{...transaction};
        })
    }

    if(action.type === 'DELIVERY'){
        return transactions.map((transaction) => {
            if(transaction.id === action.payload.currentId){     
                return{
                    ...transaction,
                    statusDelivery: action.payload.resultDelivery
                }
            }
            return {...transaction}
        })
    }

    if(action.type === 'BOOKING'){
        return transactions.map((transaction) => {
            if(transaction.id === action.payload.currentId){
                return {
                    ...transaction,
                    statusBooking: action.payload.resultBookingInsurance
                }
            }
            return {...transaction}
        })
    }

    if(action.type === 'PAYMENT'){
        return transactions.map((transaction) => {
            if(transaction.id === action.payload.currentId){
                return {
                    ...transaction,
                    statusPayment: action.payload.resultPayment
                }
            }
            return {...transaction}
        })
    }


    return transactions;
}