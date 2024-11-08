export const listNotificationsReducer = (listNotifications = [], action) => {


    if(action.type === 'DELIVERY'){
        if(action.payload.resultDelivery === 'очікування'){     
            return [...listNotifications, {description: 'Доставка у статусі очікування', typeIcon: 'delivery', id: action.payload.currentId, idNotification: action.payload.idNotification, currentIdSaga: action.payload.currentIdSaga, name: action.payload.currentName, minuteTmp: action.payload.timeMinute, minuteResult: 0, hours: 0}]
        }
        if(action.payload.resultDelivery === 'відправлено'){
            return [...listNotifications, {description: 'Товар відправлено', typeIcon: 'delivery', id: action.payload.currentId, idNotification: action.payload.idNotification,  currentIdSaga: action.payload.currentIdSaga,   name: action.payload.currentName, minuteTmp: action.payload.timeMinute, minuteResult: 0, hours: 0}]
        }
        if(action.payload.resultDelivery === 'доставка'){
            return [...listNotifications, {description: 'Доставка', typeIcon: 'delivery', id: action.payload.currentId, idNotification: action.payload.idNotification,  currentIdSaga: action.payload.currentIdSaga,   name: action.payload.currentName, minuteTmp: action.payload.timeMinute, minuteResult: 0, hours: 0}]
        }
        if(action.payload.resultDelivery === 'доставлено'){
            return [...listNotifications, {description: 'Товар доставлено', typeIcon: 'delivery', id: action.payload.currentId, idNotification: action.payload.idNotification,  currentIdSaga: action.payload.currentIdSaga,   name: action.payload.currentName, minuteTmp: action.payload.timeMinute, minuteResult: 0, hours: 0}]
        }
    }

    if(action.type === 'PAYMENT'){
        if(action.payload.resultPayment === 'очікується'){     
            return [...listNotifications, {description: 'Очікування', typeIcon: 'payment', id: action.payload.currentId, idNotification: action.payload.idNotification,  currentIdSaga: action.payload.currentIdSaga, name: action.payload.currentName, minuteTmp: action.payload.timeMinute, minuteResult: 0, hours: 0}]
        }
        if(action.payload.resultPayment === 'огляд'){
            return [...listNotifications, {description: 'Оплата в огляді', typeIcon: 'payment', id: action.payload.currentId, idNotification: action.payload.idNotification,  currentIdSaga: action.payload.currentIdSaga,  name: action.payload.currentName, minuteTmp: action.payload.timeMinute, minuteResult: 0, hours: 0}]
        }
        if(action.payload.resultPayment === 'оплачено'){
            return [...listNotifications, {description: 'Оплачено', typeIcon: 'payment', id: action.payload.currentId, idNotification: action.payload.idNotification,  currentIdSaga: action.payload.currentIdSaga,  name: action.payload.currentName, minuteTmp: action.payload.timeMinute, minuteResult: 0, hours: 0}]
        }
    }

    if(action.type === 'BOOKING'){
        if(action.payload.resultBookingInsurance === 'оформлено'){     
            return [...listNotifications, {description: 'Бронювання оформлено', typeIcon: 'booking', id: action.payload.currentId, idNotification: action.payload.idNotification,  currentIdSaga: action.payload.currentIdSaga, name: action.payload.currentName, minuteTmp: action.payload.timeMinute, minuteResult: 0, hours: 0}]
        }
        if(action.payload.resultBookingInsurance === 'подання'){
            return [...listNotifications, {description: 'Бронювання  відправлено', typeIcon: 'booking', id: action.payload.currentId, idNotification: action.payload.idNotification,  currentIdSaga:action.payload.currentIdSaga, name: action.payload.currentName, minuteTmp: action.payload.timeMinute, minuteResult: 0, hours: 0}]
        }
        if(action.payload.resultBookingInsurance === 'обробка'){
            return [...listNotifications, {description: 'Бронювання перебуває в обробці', typeIcon: 'booking', id: action.payload.currentId, idNotification: action.payload.idNotification,  currentIdSaga: action.payload.currentIdSaga, name: action.payload.currentName, minuteTmp: action.payload.timeMinute, minuteResult: 0, hours: 0}]
        }
        if(action.payload.resultBookingInsurance === 'схвалено'){
            return [...listNotifications, {description: 'Бронювання схвалено', typeIcon: 'booking', id: action.payload.currentId, idNotification: action.payload.idNotification,  currentIdSaga: action.payload.currentIdSaga, name: action.payload.currentName, minuteTmp: action.payload.timeMinute, minuteResult: 0, hours: 0}]
        }
    }

    if(action.type === 'CLEAR_LIST_NOTIFICATIONS'){
        return [];
    }


    return listNotifications;
}