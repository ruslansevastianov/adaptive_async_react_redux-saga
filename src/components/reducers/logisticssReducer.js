export const logisticssReducer = (listLogisticss = [], action) => {
    
    if(action.type === 'ADD_TRANSACTION'){
        return [...listLogisticss, {id: action.payload, state: ''}]
    }


    
    if(action.type === 'LOGISTICS_REGISTRATION_DATA'){
        return listLogisticss.map((logistics) => {
            if(logistics.id === action.payload.id){
                return {
                    name: action.payload.name,
                    ...logistics
                }
            }
            return{...logistics};
        })
    }
    if(action.type === 'LOGISTICS_COORDINATION_DATA'){
        return listLogisticss.map((logistics) => {
            if(logistics.id === action.payload.id){
                return{
                    nameVendor: action.payload.nameVendor,
                    nameCustomer: action.payload.nameCustomer,
                    typeDelivery: action.payload.typeDelivery,
                    ...logistics
                }
            }
            return{...logistics};
        })
    }
    if(action.type ===  'LOGISTICS_BOOKING_DATA'){
        return listLogisticss.map((logistics) => {
            if(logistics.id === action.payload.id){
                return{
                    sum: action.payload.sum,
                    ...logistics
                }
            }
            return {...logistics}
        })
    }
    if(action.type === 'LOGISTICS_CONCLUSION_DATA'){
        return listLogisticss.map((logistics)=> {
            if(logistics.id === action.payload.id){
                return{
                    addressVidpravlennia: action.payload.addressVidpravlennia,
                    addressOtrimannia: action.payload.addressOtrimannia,
                    sposibDostavki: action.payload.sposibDostavki,
                    ...logistics
                }
            }
            return {...logistics};
        })
    }

    if(action.type === 'LOGISTICS_REGISTRATION_STAGE'){
        return listLogisticss.map((logistics) => {
            if(logistics.state === ''){
                return {
                    ...logistics,
                    state: 'registered'
                }
            }
            return {...logistics}
        })
    }

    if(action.type === 'LOGISTICS_COORDINATION_STAGE'){
        return listLogisticss.map((logistics) => {
            if(logistics.state === 'registered'){
                return {
                    ...logistics,
                    state: 'agreed'
                }
            }
            return {...logistics}
        })
    }

    if(action.type === 'LOGISTICS_BOOKING_STAGE'){
        return listLogisticss.map((logistics) => {
            if(logistics.state === 'agreed'){
                return {
                    ...logistics,
                    state: 'booked'
                }
            }
            return {...logistics}
        })
    }

    if(action.type === 'LOGISTICS_CONCLUSION_STAGE'){
        return listLogisticss.map((logistics) => {
            if(logistics.state === 'booked'){
                return {
                    ...logistics,
                    state: 'concluded'
                }
            }
            return {...logistics}
        })
    }


    return listLogisticss;
};