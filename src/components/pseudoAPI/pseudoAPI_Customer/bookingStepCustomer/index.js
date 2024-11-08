import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {bookingCustomer, customerBookingData} from '../../../actions/customerActions';



const BookingStepCustomer = ({numberVisibleBookingStep, setNumberVisibleBookingStep, setIsResultBookingStepCustomer, bookingCustomer, idTransaction, customerBookingData, listCustomers}) => {

    let classComponent = `${numberVisibleBookingStep === 2 ? 'show-all-steps-booking' : 'notShow'}`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;

    const [sum, setSum] = useState('');


    useEffect(()=>{
        for(let i = 0; i < listCustomers.length; i++){

                 if(listCustomers[i].id === idTransaction){
                    if(listCustomers[i].state === 'booked'){
                        setIsVisibleSpinner(false);
                        setSum(''); 
                        setIsResultBookingStepCustomer(true); // делаем успех для этого шага
                        setNumberVisibleBookingStep(3);
                    }
                 }
        }

    },[listCustomers])


    return(
        <div className={classComponent}>
            <div className="description-text">
                <p className="text-header">Сума</p>
                <input type="number" className="input-default-number" onChange={(event) => {setSum(event.target.value)}} value={sum}/>
            </div>         
            <div className="arrow-bookingStepCustomer"></div>
            <button
                className="button-steps"
                onClick={()=>{
                    customerBookingData(idTransaction, sum); 
                    bookingCustomer();
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
    listCustomers: state.listCustomers
})


export default connect(mapStateToProps, {
    bookingCustomer,
    customerBookingData
})(BookingStepCustomer);