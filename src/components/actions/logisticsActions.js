export const registrationLogistics  = () => ({
    type: 'LOGISTICS_REGISTRATION'
});
export const coordinationLogistics = () =>({
    type: 'LOGISTICS_COORDINATION'
});
export const bookingLogistics = () =>({
    type: 'LOGISTICS_BOOKING'
})
export const conclusionLogistics = () => ({
    type: 'LOGISTICS_CONCLUSION'
})

//logistics-data
export const logisticsRegistrationData = (id, name) => ({
    type: 'LOGISTICS_REGISTRATION_DATA',
    payload: {
        id,
        name
    }
})
export const logisticsCoordinationData = (id, nameVendor, nameCustomer, typeDelivery) => ({
    type: 'LOGISTICS_COORDINATION_DATA',
    payload: {
        id,
        nameVendor,
        nameCustomer,
        typeDelivery
    }
})
export const logisticsBookingData = (id, sum) => ({
    type: 'LOGISTICS_BOOKING_DATA',
    payload: {
        id,
        sum
    }
})
export const logisticsConclusionData = (id, addressVidpravlennia, addressOtrimannia, sposibDostavki) => ({
    type: 'LOGISTICS_CONCLUSION_DATA',
    payload: {
        id,
        addressVidpravlennia,
        addressOtrimannia,
        sposibDostavki
    }
})