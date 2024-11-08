import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import iconDelivery from './images/iconDelivery.svg';
import iconPayment from './images/iconPayment.svg';
import iconBooking from './images/iconBooking.svg';
import {clearListNotifications} from '../actions';
import {v4} from 'uuid';



const Notifications = ({ listNotifications, isOpenNotificationsBlock,  setIsOpenNotificationsBlock, clearListNotifications, idTransaction }) => {

    let classNotificationsBlock = `${ isOpenNotificationsBlock ? 'open-notifications-block' : 'closed-notifications-block' }`;

    const [isOpenListNotifications, setIsOpenListNotifications] = useState(false);

    const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes()); 
    
    const [listDataTime, setListDataTime] = useState([]); // здесь инициализировать смысла нет т.к. изначально  listNotifications пустой

    let tmp = false; 

    useEffect(()=>{
        setInterval(()=>{
            setCurrentMinute(new Date().getMinutes());
        },1000);
    // setListDataTime();  // здесь инициализировать смысла нет т.к. изначально  listNotifications пустой
    },[]);


    useEffect(() => {
        if(listNotifications.length < 1){
            setIsOpenListNotifications(false);
        } else {
            setIsOpenListNotifications(true);    
        }

        if(listNotifications.length > 0){   
            for(let i = 0; i < listNotifications.length; i++){  
               
                if(listDataTime.length === 0){  
                    setListDataTime([{ idNotification: listNotifications[i].idNotification, currentIdSaga: listNotifications[i].currentIdSaga, minuteTmp: listNotifications[i].minuteTmp, minuteResult: listNotifications[i].minuteResult, hours: listNotifications[i].hours}]);       
                }else{

                    for(let j = 0; j< listDataTime.length; j++){

                        if(listNotifications[i].idNotification !== listDataTime[j].idNotification){
                            tmp = true;
                            break;
                        }
                        tmp = false;
                    }
                    if(tmp){       
                        setListDataTime([...listDataTime, { idNotification: listNotifications[i].idNotification, currentIdSaga: listNotifications[i].currentIdSaga, minuteTmp: listNotifications[i].minuteTmp, minuteResult: listNotifications[i].minuteResult, hours: listNotifications[i].hours}]);
                        tmp = false;
                    }
                    
                }
               
            }


        }

        // setListDataTime([...listNotifications]); // здесь инициализировать смысла нет т.к. изначально  listNotifications пустой
     
    
    }, [listNotifications]);
   

    useEffect(()=>{
     
            for(let i = 0; i < listDataTime.length; i++){

                if(listDataTime[i].minuteTmp !== currentMinute){

                    if(listDataTime[i].minuteResult < 59){

                            setListDataTime(listDataTime.map((item)=>{
                                                                if(item.idNotification === listDataTime[i].idNotification){
                                                                        return {
                                                                                         ...item,
                                                                                        minuteResult: item.minuteResult + 1, 
                                                                                        minuteTmp: currentMinute
                                                                        }
                                                                }
                                                                return item;
                            }))
                        }else{
    
                            setListDataTime(listDataTime.map((item)=>{
                                                                if(item.idNotification === listDataTime[i].idNotification){
                                                                         return {
                                                                                            ...item,
                                                                                            minuteResult: 0,
                                                                                            minuteTmp: currentMinute,
                                                                                            hours: item.hours + 1
                                                                        }
                                                                }
                                                                return item;
                            }))
                    }
                }     
            }
    })


    let classResultListNotifications = `${isOpenListNotifications ? 'show-result-list-notifications' : 'notShow-result-list-notifications' }`
    let classEmptyResultListNotifications = `${isOpenListNotifications ? 'notShow-result-list-notifications' : 'show-result-list-notifications' }`

    // Запомнить:
    // Функции недопустимы как дочерние элементы React.
    // Это может произойти, если вы возвращаете Component вместо <Component /> из рендера.
    // Или, может быть, вы хотели вызвать эту функцию, а не вернуть ее.


    let resultListNotifications = listNotifications.map((notification) => {
        if(notification.typeIcon === 'delivery'){
            return(   
                <div className="row-notification" key={v4()}>
                    <div className="icon-id-transaction">
                        {notification.name}
                    </div>
                    <div className="block-notification-description">
                            <div className="block-icons-notification">
                                <div className="icon-delivery"><img src={iconDelivery}/></div>
                                <div className="block-time-notification">
                                    <span className={`${(listDataTime.find((item)=>item.idNotification === notification.idNotification))?.hours < 1 ? 'block-hours-not-visible' : 'block-hours-visible' }`}>
                                        {(listDataTime.find((item)=>item.idNotification === notification.idNotification))?.hours}год.
                                    </span>
                                    <span className="block-minutes">
                                        {
                                           (function(){
                                                if((listDataTime.find((item)=>item.idNotification === notification.idNotification))?.hours < 1){
                                                    if((listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult === 0){
                                                        return 'щойно';
                                                    }else{
                                                        return (listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult + 'хв. тому'; 
                                                    }         
                                                }else{
                                                    return (listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult + 'хв. тому';
                                                }
                                            }())
                                        // (listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult
                                        }
                                    </span> 
                                     </div>
                            </div>
                            <div className="text-description">{notification.description}</div>
                    </div> 
                </div>
            )
        } else if(notification.typeIcon === 'payment'){
            return(   
                <div className="row-notification" key={v4()}>
                    <div className="icon-id-transaction">
                        {notification.name}
                    </div>
                    <div className="block-notification-description">
                            <div className="block-icons-notification">
                                    <div className="icon-payment"><img src={iconPayment}/></div>
                                    <div className="block-time-notification">
                                        <span className={`${(listDataTime.find((item)=>item.idNotification === notification.idNotification))?.hours < 1 ? 'block-hours-not-visible' : 'block-hours-visible' }`}>
                                            {(listDataTime.find((item)=>item.idNotification === notification.idNotification))?.hours}год.
                                        </span>
                                        <span className="block-minutes">
                                            {
                                                (function(){
                                                    if((listDataTime.find((item)=>item.idNotification === notification.idNotification))?.hours < 1){
                                                        if((listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult === 0){
                                                            return 'щойно';
                                                        }else{
                                                            return (listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult + 'хв. тому'; 
                                                        }         
                                                    }else{
                                                        return (listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult + 'хв. тому';
                                                    }
                                                }())

                                                // (listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult
                                            }
                                          
                                        </span>
                                         </div>
                            </div>
                            <div className="text-description">{notification.description}</div>
                    </div>         
                </div>
            )
        }else if(notification.typeIcon === 'booking'){
            return(   
                <div className="row-notification" key={v4()}>
                        <div className="icon-id-transaction">
                            {notification.name}
                        </div>
                        <div className="block-notification-description">
                            <div className="block-icons-notification">
                                    <div className="icon-booking"><img src={iconBooking}/></div>
                                    <div className="block-time-notification">
                                        <span className={`${(listDataTime.find((item)=>item.idNotification === notification.idNotification))?.hours < 1 ? 'block-hours-not-visible' : 'block-hours-visible' }`}>
                                            {(listDataTime.find((item)=>item.idNotification === notification.idNotification))?.hours}год.
                                        </span>
                                        <span className="block-minutes">
                                            {
                                                (function(){
                                                    if((listDataTime.find((item)=>item.idNotification === notification.idNotification))?.hours < 1){
                                                        if((listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult === 0){
                                                            return 'щойно';
                                                        }else{
                                                            return (listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult + 'хв. тому'; 
                                                        }         
                                                    }else{
                                                        return (listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult + 'хв. тому';
                                                    }
                                                }())

                                            // (listDataTime.find((item)=>item.idNotification === notification.idNotification))?.minuteResult
                                            }
                                        </span>
                                         </div>
                            </div>
                            <div className="text-description">{notification.description}</div>
                        </div>    
                </div>
            )
        }    
        // return <div  key={v4()}>{notification.description}</div>
    })


    return(
        <div className={classNotificationsBlock}>
            <div className="buttons-block-notifications">
                    <div className="clear-button" onClick={() => {clearListNotifications()}}>Очистити</div>
                    <div className="button-close-notifications-block" onClick={(event)=>{setIsOpenNotificationsBlock(false); event.stopPropagation()}}>X</div>
            </div>

            <div className={classEmptyResultListNotifications}>
                <p>Повідомлень немає</p>
            </div>
            <div className={classResultListNotifications}>
                {resultListNotifications}
            </div>

        </div>
    )
}


const mapStateToProps = (state) => ({
    listNotifications: state.listNotifications
})

export default connect(mapStateToProps, {clearListNotifications})(Notifications);
