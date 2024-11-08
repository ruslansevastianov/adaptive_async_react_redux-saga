export const registrationCustomer  = () => ({
    type: 'CUSTOMER_REGISTRATION'
});
export const coordinationCustomer = () =>({
    type: 'CUSTOMER_COORDINATION'
});
export const bookingCustomer = () =>({
    type: 'CUSTOMER_BOOKING'
})
export const conclusionCustomer = () => ({
    type: 'CUSTOMER_CONCLUSION'
})
//customer-data
export const customerRegistrationData = (id, name) => ({
    type: 'CUSTOMER_REGISTRATION_DATA',
    payload: {
        id,
        name
    }
})
export const customerCoordinationData = (id, category, total) => ({
    type: 'CUSTOMER_COORDINATION_DATA',
    payload: {
        id,
        category,
        total
    }
})
export const customerBookingData = (id, sum) => ({
    type: 'CUSTOMER_BOOKING_DATA',
    payload: {
        id,
        sum
    }
})
export const customerConclusionData = (id, rekvizit) => ({
    type: 'CUSTOMER_CONCLUSION_DATA',
    payload: {
        id,
        rekvizit
    }
})