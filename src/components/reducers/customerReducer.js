export const customersReducer = (listCustomers = [], action) => {
    
    if(action.type === 'ADD_TRANSACTION'){
        return [...listCustomers, {id: action.payload, state: ''}]
    }
    

    
    if(action.type === 'CUSTOMER_REGISTRATION_DATA'){
        return  listCustomers.map((customer) => {
            if(customer.id === action.payload.id){
                return {
                    name: action.payload.name,
                    ...customer
                }
            }
            return{...customer};
        })
    }
    if(action.type === 'CUSTOMER_COORDINATION_DATA'){
        return  listCustomers.map((customer) => {
            if(customer.id === action.payload.id){
                return{
                    category: action.payload.category,
                    total: action.payload.total,
                    ...customer
                }
            }
            return{...customer};
        })
    }
    if(action.type === 'CUSTOMER_BOOKING_DATA'){
        return  listCustomers.map((customer) => {
            if(customer.id === action.payload.id){
                return{
                    sum: action.payload.sum,
                    ...customer
                }
            }
            return {...customer}
        })
    }
    if(action.type === 'CUSTOMER_CONCLUSION_DATA'){
        return  listCustomers.map((customer)=> {
            if(customer.id === action.payload.id){
                return{
                    rekvizit: action.payload.rekvizit,
                    ...customer
                }
            }
            return {...customer};
        })
    }

    if(action.type === 'CUSTOMER_REGISTRATION_STAGE'){
        return listCustomers.map((customer) => {
            if(customer.state === ''){
                return {
                    ...customer,
                    state: 'registered'
                }
            }
            return {...customer}
        })
    }

    if(action.type === 'CUSTOMER_COORDINATION_STAGE'){
        return listCustomers.map((customer) => {
            if(customer.state === 'registered'){
                return {
                    ...customer,
                    state: 'agreed'
                }
            }
            return {...customer}
        })
    }
    
    if(action.type === 'CUSTOMER_BOOKING_STAGE'){
        return listCustomers.map((customer) => {
            if(customer.state === 'agreed'){
                return {
                    ...customer,
                    state: 'booked'
                }
            }
            return {...customer}
        })
    }

    if(action.type === 'CUSTOMER_CONCLUSION_STAGE'){
        return listCustomers.map((customer) => {
            if(customer.state === 'booked'){
                return {
                    ...customer,
                    state: 'concluded'
                }
            }
            return {...customer};
        })
    }

    return listCustomers;
};