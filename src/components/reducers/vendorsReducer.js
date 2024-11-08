export const vendorsReducer = (listVendors = [], action) => {
    
    if(action.type === 'ADD_TRANSACTION'){
        return [...listVendors, {id: action.payload, state: ''}]
    }


    
    if(action.type === 'VENDOR_REGISTRATION_DATA'){
       return listVendors.map((vendor) => {
            if(vendor.id === action.payload.id){
                return {
                    name: action.payload.name,
                    ...vendor
                }
            }
            return {...vendor};
        })
    }
    if(action.type === 'VENDOR_COORDINATION_DATA'){
        return listVendors.map((vendor) => {
            if(vendor.id === action.payload.id){
                return{
                    category: action.payload.category,
                    total: action.payload.total,
                    ...vendor
                }
            }
            return{...vendor};
        })
    }
    if(action.type ===  'VENDOR_BOOKING_DATA'){
        return  listVendors.map((vendor) => {
            if(vendor.id === action.payload.id){
                return{
                    sum: action.payload.sum,
                    ...vendor
                }
            }
            return {...vendor}
        })
    }
    if(action.type === 'VENDOR_CONCLUSION_DATA'){
        return  listVendors.map((vendor) => {
            if(vendor.id === action.payload.id){
                return{
                    typePayment: action.payload.typePyment,
                    ...vendor
                }
            }
            return {...vendor};
        })
    }
    if(action.type === 'VENDOR_REGISTRATION_STAGE'){
        return listVendors.map((vendor) => {
            if(vendor.state === ''){
                   return{
                    ...vendor,
                    state: 'registered'
                    } 
            }
                return {...vendor};
            })
    }
        
    if(action.type === 'VENDOR_COORDINATION_STAGE'){
        return listVendors.map((vendor) => {
            if(vendor.state === 'registered'){
                return{
                    ...vendor,
                    state: 'agreed'
                }
            }
            return {...vendor}
        })
    }

    if(action.type === 'VENDOR_BOOKING_STAGE'){
        return listVendors.map((vendor) => {
            if(vendor.state === 'agreed'){
                return {
                    ...vendor,
                    state: 'booked'
                }
            }
            return {...vendor}
        })
    }

    if(action.type === 'VENDOR_CONCLUSION_STAGE'){
        return listVendors.map((vendor) => {
            if(vendor.state === 'booked'){
                return {
                    ...vendor,
                    state: 'concluded'
                }
            }
            return {...vendor}
        })
    }

    return listVendors;
};

