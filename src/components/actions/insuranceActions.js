export const registrationInsurance  = () => ({
    type: 'INSURANCE_REGISTRATION'
});
export const coordinationInsurance = () => ({
    type: 'INSURANCE_COORDINATION'
});
export const bookingInsurance = () => ({
    type: 'INSURANCE_BOOKING'
})
export const conclusionInsurance = () => ({
    type: 'INSURANCE_CONCLUSION'
})
// insurance-data
export const insuranceRegistrationData = (id, name) => ({
    type: 'INSURANCE_REGISTRATION_DATA',
    payload: {
        id,
        name
    }
})
export const insuranceCoordinationData = (id, nameVendor, nameCustomer) => ({
    type: 'INSURANCE_COORDINATION_DATA',
    payload: {
        id,
        nameVendor,
        nameCustomer
    }
})
export const insuranceBookingData = (id, sum) => ({
    type: 'INSURANCE_BOOKING_DATA',
    payload: {
        id,
        sum
    }
})
export const insuranceConclusionData = (id, specNumber) => ({
    type: 'INSURANCE_CONCLUSION_DATA',
    payload: {
        id,
        specNumber
    }
})