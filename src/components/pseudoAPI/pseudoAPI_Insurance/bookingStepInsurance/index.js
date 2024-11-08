import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {bookingInsurance, insuranceBookingData} from '../../../actions/insuranceActions';



const BookingStepInsurance = ({numberVisibleBookingStep, setNumberVisibleBookingStep, setIsResultBookingStepInsurance, bookingInsurance, idTransaction, insuranceBookingData, listInsurences}) => {

    let classComponent = `${numberVisibleBookingStep === 3 ? 'show-all-steps-booking' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;


    const [sum, setSum] = useState('');



    useEffect(() => {

        for(let i = 0; i < listInsurences.length; i++){
                     if(listInsurences[i].id === idTransaction){
                        if(listInsurences[i].state === 'booked'){
                            setIsVisibleSpinner(false);
                            setSum('');   
                            setIsResultBookingStepInsurance(true); // делаем успех для этого шага
                            setNumberVisibleBookingStep(4);
                            // break;
                        }
                     }
        }
    },[listInsurences])



    return(
        <div className={classComponent}>
            <div className="description-text">
                <p className="text-header">Сума</p>
                <input type="number" className="input-default-number" onChange={(event) => {setSum(event.target.value)}} value={sum}/>
            </div>
            <div className="arrow-bookingStepInsurance"></div>
            <button
                className="button-steps"
                onClick={()=>{
                    insuranceBookingData(idTransaction, sum); 
                    bookingInsurance();
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
    listInsurences: state.listInsurences
})

export default connect(mapStateToProps,{
    bookingInsurance,
    insuranceBookingData
})(BookingStepInsurance);