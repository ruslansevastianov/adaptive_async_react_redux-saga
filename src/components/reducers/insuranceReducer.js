export const insurancesReducer = (listInsurances = [], action) => {
    
    if(action.type === 'ADD_TRANSACTION'){
        return [...listInsurances, {id: action.payload, state: ''}]
    }

    
    
    if(action.type === 'INSURANCE_REGISTRATION_DATA'){
        return  listInsurances.map((insurance) => {
            if(insurance.id === action.payload.id){
                return {
                    name: action.payload.name,
                    ...insurance
                }
            }
            return{...insurance};
        })
    }
    if(action.type === 'INSURANCE_COORDINATION_DATA'){
        return  listInsurances.map((insurance) => {
            if(insurance.id === action.payload.id){
                return{
                    category: action.payload.category,
                    kol: action.payload.kol,
                    ...insurance
                }
            }
            return{...insurance};
        })
    }
    if(action.type === 'INSURANCE_BOOKING_DATA'){
        return  listInsurances.map((insurance) => {
            if(insurance.id === action.payload.id){
                return{
                    sum: action.payload.sum,
                    ...insurance
                }
            }
            return {...insurance}
        })
    }
    if(action.type === 'INSURANCE_CONCLUSION_DATA'){
        return  listInsurances.map((insurance)=> {
            if(insurance.id === action.payload.id){
                return{
                    specNumber: action.payload.specNumber,
                    ...insurance
                }
            }
            return {...insurance};
        })
    }

    if(action.type === 'INSURANCE_REGISTRATION_STAGE'){
        return listInsurances.map((insurance) => {
                if(insurance.state === ''){
                    return {
                        ...insurance,
                        state: 'registered'
                    }
                }
                return {...insurance}
        })
    }

    if(action.type === 'INSURANCE_COORDINATION_STAGE'){
        return listInsurances.map((insurance) => {
            if(insurance.state === 'registered'){
                return {
                    ...insurance,
                    state: 'agreed'
                }
            }
            return {...insurance}
        })
    }

    if(action.type === 'INSURANCE_BOOKING_STAGE'){
        return listInsurances.map((insurance) => {
            if(insurance.state === 'agreed'){
                return {
                    ...insurance,
                    state: 'booked'
                }
            }
            return {...insurance}
        })
    }

    if(action.type === 'INSURANCE_CONCLUSION_STAGE'){
        return listInsurances.map((insurance) => {
            if(insurance.state === 'booked'){
                return {
                    ...insurance,
                    state: 'concluded'
                }
            }
            return {...insurance}
        })
    }

    return listInsurances;
};


