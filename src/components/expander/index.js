import React, {useState} from "react";
import './style.css';



const Expander = ({item, number}) => {

    const [isOpen, setIsOpen] = useState(false);

    let classExpanderBlockContent = `${isOpen ? 'expander-block-content-visible' : 'expander-block-content-not-visible'}`;

    let statusClassDelivery = '';
    let statusClassBooking = '';
    let statusClassPayment = '';

    switch(item.statusDelivery){
        case 'очікування': 
            statusClassDelivery = 'expander-status-delivery-pending';
            break;
        case 'відправлено':
            statusClassDelivery = 'expander-status-delivery-sent';
            break;
        case 'доставка':
            statusClassDelivery = 'expander-status-delivery-delivering';
            break;
        case 'доставлено':
            statusClassDelivery = 'expander-status-delivery-delivered';
            break;
    }

    switch(item.statusBooking){
        case 'оформлено': 
            statusClassBooking = 'expander-status-booking-issued';
            break;
        case 'подання':
            statusClassBooking = 'expander-status-booking-sent';
            break;
        case 'обробка':
            statusClassBooking = 'expander-status-booking-processing';
            break;
        case 'схвалено':
            statusClassBooking = 'expander-status-booking-approved';
            break;
    }

    switch(item.statusPayment){
        case 'очікується': 
            statusClassPayment = 'expander-status-payment-expected';
            break;
        case 'огляд':
            statusClassPayment = 'expander-status-payment-review';
            break;
        case 'оплачено':
            statusClassPayment = 'expander-status-payment-paid';
            break;
    }



    return(
        <div className="block-expander">
            <div
                className="expander-block-header"
                onClick={()=>{setIsOpen(!isOpen)}}
            >
                <p>Угода {number}</p>
                <div className="arrow-expander"></div>
            </div>
            <div className={classExpanderBlockContent}>
                <div className="row-expander"><div className="row-expander-text">Постачальник:</div>{item.nameVendor}</div>
                <div className="row-expander"><div className="row-expander-text">Замовник:</div>{item.nameCustomer}</div>
                <div className="row-expander"><div className="row-expander-text">Страхова:</div>{item.nameInsurance}</div>
                <div className="row-expander"><div className="row-expander-text">Логістична:</div>{item.nameLogistics}</div>
                <div className="row-expander"><div className="row-expander-text">Доставка:</div><div className={statusClassDelivery}>{item.statusDelivery}</div></div>
                <div className="row-expander"><div className="row-expander-text">Бронювання:</div><div className={statusClassBooking}>{item.statusBooking}</div></div>
                <div className="row-expander"><div className="row-expander-text">Оплата:</div><div className={statusClassPayment}>{item.statusPayment}</div></div>
            </div>
        </div>
    )
}

export default Expander;