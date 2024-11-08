export const registrationVendor  = () => ({
    type: 'VENDOR_REGISTRATION'
});
export const coordinationVendor = () =>({
    type: 'VENDOR_COORDINATION'
});
export const bookingVendor = () =>({
    type: 'VENDOR_BOOKING'
})
export const conclusionVendor = () => ({
    type: 'VENDOR_CONCLUSION'
})

//vendor-data
export const vendorRegistrationData = (id, name) => ({
    type: 'VENDOR_REGISTRATION_DATA',
    payload: {
        id,
        name
    }
})
export const vendorCoordinationData = (id, category, total) => ({
    type: 'VENDOR_COORDINATION_DATA',
    payload: {
        id,
        category,
        total
    }
})
export const vendorBookingData = (id, sum) => ({
    type: 'VENDOR_BOOKING_DATA',
    payload: {
        id,
        sum
    }
})
export const vendorConclusionData = (id, typePayment) => ({
    type: 'VENDOR_CONCLUSION_DATA',
    payload: {
        id,
        typePayment
    }
})