import React, {useState} from "react";
import './style.css';
import StepByStep from '../stepByStepIcon';
import BookingStepVendor from '../pseudoAPI/pseudoAPI_Vendor/bookingStepVendor';
import BookingStepCustomer from '../pseudoAPI/pseudoAPI_Customer/bookingStepCustomer';
import BookingStepInsurance from '../pseudoAPI/pseudoAPI_Insurance/bookingStepInsurance';
import BookingStepLogistics from '../pseudoAPI/pseudoAPI_Logistics/bookingStepLogistics';


const BookingStep = ({optionsForBookingSteps, numberVisibleChildComponent, setNumberVisibleChildComponent, setIsResultBookingStep, idTransaction}) => {

    let classComponent = `${numberVisibleChildComponent===3 ? 'block-booking' : 'notShow' }`;

    const [numberVisibleBookingStep, setNumberVisibleBookingStep] = useState(1); 


    const [isResultBookingStepVendor, setIsResultBookingStepVendor] = useState(false); // для итогового результата подшага BookingStepVendor
    const [isResultBookingStepCustomer, setIsResultBookingStepCustomer] = useState(false); // для итогового результата подшага BookingStepCustomer
    const [isResultBookingStepInsurance, setIsResultBookingStepInsurance] = useState(false); // для итогового результата подшага BookingStepInsurance
    const [isResultBookingStepLogistics, setIsResultBookingStepLogistics] = useState(false); // для итогового результата подшага BookingStepLogistics
    const resultsAllStepsBooking = [isResultBookingStepVendor,isResultBookingStepCustomer, isResultBookingStepInsurance, isResultBookingStepLogistics]; 
    const setAllStepsBooking = [setIsResultBookingStepVendor, setIsResultBookingStepCustomer, setIsResultBookingStepInsurance, setIsResultBookingStepLogistics];

    const [isShowFinalBlock, setIsShowFinalBlock] = useState(false); 

    let showFinalBlock = `${isShowFinalBlock ? 'final-step-booking' : 'notShow' }`;
    let showOnlyBookingBlock = `${isShowFinalBlock ? 'notShow' : 'showOnlyBookingBlock' }`;
    const blockBookingComponent = `block-booking-component${isShowFinalBlock ? ' final-block-booking-component' : ''}`;
    
    return(
        <div className={classComponent}>
                <div className="block-step-by-step">
                    <StepByStep optionsForSteps = {optionsForBookingSteps} numberVisibleStep = {numberVisibleBookingStep} resultsAllSteps = {resultsAllStepsBooking}  />
                </div>         
                <div className={blockBookingComponent}>
                        <div className={showOnlyBookingBlock}>
                            <BookingStepVendor numberVisibleBookingStep = {numberVisibleBookingStep} setNumberVisibleBookingStep = {setNumberVisibleBookingStep} setIsResultBookingStepVendor = {setIsResultBookingStepVendor} idTransaction = {idTransaction}/>
                            <BookingStepCustomer numberVisibleBookingStep = {numberVisibleBookingStep} setNumberVisibleBookingStep = {setNumberVisibleBookingStep} setIsResultBookingStepCustomer = {setIsResultBookingStepCustomer} idTransaction = {idTransaction}/>
                            <BookingStepInsurance numberVisibleBookingStep = {numberVisibleBookingStep} setNumberVisibleBookingStep = {setNumberVisibleBookingStep} setIsResultBookingStepInsurance = {setIsResultBookingStepInsurance} idTransaction = {idTransaction}/>
                            <BookingStepLogistics setNumberVisibleChildComponent = {setNumberVisibleChildComponent} numberVisibleBookingStep = {numberVisibleBookingStep} setNumberVisibleBookingStep = {setNumberVisibleBookingStep} setIsResultBookingStep = {setIsResultBookingStep} setIsShowFinalBlock = {setIsShowFinalBlock} setAllStepsBooking = {setAllStepsBooking} idTransaction = {idTransaction}/>
                        </div>
                        <div className={showFinalBlock}>
                            <p>УСПІХ! Замовлення оформлене.</p>
                            <p>Ви можете продовжити</p>
                        </div>
                </div>
                

        </div>
    )
}

export default BookingStep;
