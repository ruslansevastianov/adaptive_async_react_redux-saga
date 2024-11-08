import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {bookingVendor, vendorBookingData} from '../../../actions/vendorActions';



const BookingStepVendor = ({numberVisibleBookingStep, setNumberVisibleBookingStep, setIsResultBookingStepVendor, bookingVendor, idTransaction, vendorBookingData, listVendors}) => {

    let classComponent = `${numberVisibleBookingStep === 1 ? 'show-all-steps-booking' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;

    const [sum, setSum] = useState('');
    

        useEffect(()=>{
            for(let i = 0; i < listVendors.length; i++){
                     if(listVendors[i].id === idTransaction){
                        if(listVendors[i].state === 'booked'){
                            setIsVisibleSpinner(false);
                            setSum('');
                            setIsResultBookingStepVendor(true); // делаем успех ждя этого шага
                            setNumberVisibleBookingStep(2);           
                        }
                     }
            }
        },[listVendors])


    return(
        <div className={classComponent}>
            <div className="description-text">
                <p className="text-header">Сума</p>
                <input type="number" className="input-default-number" onChange={(event) => {setSum(event.target.value)}} value={sum}/>
            </div>
            <div className="arrow-bookingStepVendor"></div>
            <button
                className="button-steps"
                onClick={()=>{
                    vendorBookingData(idTransaction, sum); 
                    bookingVendor();
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
    listVendors: state.listVendors
})


export default connect(mapStateToProps, {
    bookingVendor,
    vendorBookingData
})(BookingStepVendor);