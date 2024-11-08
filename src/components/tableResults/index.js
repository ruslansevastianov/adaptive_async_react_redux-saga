import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {v4} from 'uuid';
import BellNotEmpty from './images/bellNotEmpty.svg'
import BellEmpty from './images/bellEmpty.svg';
import Notifications from '../notifications';
import ExpanderList from "../expanderList";


const TableResults = ({isVisibleBlockTable, listTransactions, listNotifications, isOpenNotificationsBlock, setIsOpenNotificationsBlock, idTransaction}) => {

let classTable = `${isVisibleBlockTable ? 'block-table-results' : 'notShow'}`;

let statusClassDelivery = '';
let statusClassBooking = '';
let statusClassPayment = '';

const [countNotifications, setCountNotifications] = useState(listNotifications.length);



const [isShowBellTable, setIsShowBellTable] = useState(false);


useEffect(()=>{
    setCountNotifications(listNotifications.length);

    if(listNotifications.length < 1){
        setIsShowBellTable(false);
    }else {
        setIsShowBellTable(true);
    }

},[listNotifications])


const classBellNotEmpty = `bell-table-not-empty${isShowBellTable ? '' : ' notShowBell' }`;
const classBellEmpty = `bell-table-empty${isShowBellTable ? ' notShowBell' : '' }`


let resultList = listTransactions.map((item, index) => {

        switch(item.statusDelivery){
            case 'очікування': 
                statusClassDelivery = 'status status-delivery-pending';
                break;
            case 'відправлено':
                statusClassDelivery = 'status status-delivery-sent';
                break;
            case 'доставка':
                statusClassDelivery = 'status status-delivery-delivering';
                break;
            case 'доставлено':
                statusClassDelivery = 'status status-delivery-delivered';
                break;
        }

        switch(item.statusBooking){
            case 'оформлено': 
                statusClassBooking = 'status status-booking-issued';
                break;
            case 'подання':
                statusClassBooking = 'status status-booking-sent';
                break;
            case 'обробка':
                statusClassBooking = 'status status-booking-processing';
                break;
            case 'схвалено':
                statusClassBooking = 'status status-booking-approved';
                break;
        }

        switch(item.statusPayment){
            case 'очікується': 
                statusClassPayment = 'status status-payment-expected';
                break;
            case 'огляд':
                statusClassPayment = 'status status-payment-review';
                break;
            case 'оплачено':
                statusClassPayment = 'status status-payment-paid';
                break;
        }

        return (
            <div className="row" key={v4()}>
                <div className="column-first">{`#${index+1}`}</div>
                <div className="column">{item.nameVendor}</div>
                <div className="column">{item.nameCustomer}</div>
                <div className="column">{item.nameInsurance}</div>
                <div className="column">{item.nameLogistics}</div>
                <div className="column"><div className={statusClassDelivery}>{item.statusDelivery}</div></div>
                <div className="column"><div className={statusClassBooking}>{item.statusBooking}</div></div>
                <div className="column"><div className={statusClassPayment}>{item.statusPayment}</div></div>
            </div>
        )

})


    return(
        <div className={classTable}>
            <div className="header-block-table">
                <div
                    className="bell-header-block"
                    onClick={()=>{setIsOpenNotificationsBlock(true)}}
                    >
                    <div className={classBellEmpty}>
                        <img src={BellEmpty}/>
                    </div>
                    <div className={classBellNotEmpty}>
                        <img src={BellNotEmpty}/>
                        <div className="bell-circle">
                            {countNotifications}
                        </div>
                    </div>
                    <p className="bell-text">Центр повідомлень</p>
                    <Notifications isOpenNotificationsBlock = {isOpenNotificationsBlock} setIsOpenNotificationsBlock = {setIsOpenNotificationsBlock} idTransaction = {idTransaction}/>
                </div>
            </div>

            <div className="block-for-table">
                <div className="block-header-table">
                        <div className=" header-name-list">Угода</div>
                        <div className="header-name-list">Постачальник</div>
                        <div className="header-name-list">Замовник</div>
                        <div className="header-name-list">Страхова</div>
                        <div className="header-name-list">Логістична</div>
                        <div className="header-name-list">Доставка</div>
                        <div className="header-name-list">Бронювання</div>
                        <div className="header-name-list">Оплата</div>
                </div> 
                {resultList}
            </div>
            <div className="block-for-expander-list">
                <ExpanderList list = {listTransactions}/>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    listTransactions: state.resultListTransactions,
    listNotifications: state.listNotifications
})

export default connect(mapStateToProps)(TableResults);