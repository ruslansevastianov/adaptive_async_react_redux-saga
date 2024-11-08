import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {bookingLogistics, logisticsBookingData} from '../../../actions/logisticsActions';


const BookingStepLogistics = ({setNumberVisibleChildComponent, numberVisibleBookingStep, setNumberVisibleBookingStep, setIsResultBookingStep, setIsShowFinalBlock, setAllStepsBooking,  bookingLogistics, idTransaction, logisticsBookingData, listLogisticss}) => {

    const [setIsResultBookingStepVendor, setIsResultBookingStepCustomer, setIsResultBookingStepInsurance, setIsResultBookingStepLogistics] = setAllStepsBooking;

    let classComponent = `${numberVisibleBookingStep === 4 ? 'show-all-steps-booking' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;

    const [sum, setSum] = useState('');


    useEffect(()=>{

        for(let i = 0; i < listLogisticss.length; i++){
                         if(listLogisticss[i].id === idTransaction){
                            if(listLogisticss[i].state === 'booked'){

                                setIsVisibleSpinner(false);
                                setSum('');
                
                                setNumberVisibleBookingStep(0); // устанавливаем - 0, чтобы увидеть все успешные шаги
                                
                                setIsResultBookingStep(true); // устанавливаю для этого этапа booking
                
                                setIsResultBookingStepLogistics(true); // устанавливаю для этого шага успех
                                setIsShowFinalBlock(true); //показываю фильный блок этого этапа
                
                                setTimeout(()=>{ setNumberVisibleChildComponent(4)},3000);    // переходим на следующий этап
                                setTimeout(()=>{setIsShowFinalBlock(false)},4000); // возвращаю по умолчанию этого шага
                
                               setTimeout(()=>{
                                    setNumberVisibleBookingStep(1); //  возвращаю на 1step -- проверить!!!
                                    setIsResultBookingStepVendor(false);
                                    setIsResultBookingStepCustomer(false);
                                    setIsResultBookingStepInsurance(false);
                                    setIsResultBookingStepLogistics(false);
                            },5000); 
                
                                // break;
                            }
                         }
        }
    },[listLogisticss])

    
    return(
        <div className={classComponent}>
            <div className="description-text">
                <p className="text-header">Сума</p>
                <input type="number" className="input-default-number" onChange={(event) => {setSum(event.target.value)}} value={sum}/>
            </div>
            <div className="arrow-bookingStepLogistics"></div>
            <button
                className="button-steps"
                onClick={()=>{
                    logisticsBookingData(idTransaction, sum); 
                    bookingLogistics();
                    setIsVisibleSpinner(true);             
                }}
                disabled = {sum ? false : true}
            >
                    <div className={classSpinner}></div>
                    <p className={classTextButton}>Відправити</p>
            </button>
        </div>
    )
}


const mapStateToProps = (state) => ({
    listLogisticss: state.listLogisticss
})

export default connect(mapStateToProps,{
    bookingLogistics,
    logisticsBookingData
})(BookingStepLogistics);