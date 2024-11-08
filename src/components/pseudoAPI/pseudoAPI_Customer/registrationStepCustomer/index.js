import React,{useState, useEffect } from "react";
import './style.css';
import { connect } from "react-redux";
import {registrationCustomer, customerRegistrationData} from '../../../actions/customerActions';



const RegistrationStepCustomer = ({numberVisibleRegistrationStep, setNumberVisibleRegistrationStep, setIsResultRegistrationStepCustomer, registrationCustomer, listCustomers, idTransaction, customerRegistrationData}) => {

let classComponent = `${numberVisibleRegistrationStep === 2 ? 'show-all-steps-registration' : 'notShow' }`;

const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

const [valueInputName, setValueInputName] = useState('');

let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;



useEffect(()=>{

    for(let i = 0; i < listCustomers.length; i++){

        if(listCustomers[i].id === idTransaction){
            if(listCustomers[i].state === 'registered'){
                setIsVisibleSpinner(false);
                setValueInputName('');
                setIsResultRegistrationStepCustomer(true); // делаем успех для этого шага
                setNumberVisibleRegistrationStep(3);
                // break;
            }
        }
    }

}, [listCustomers]);




    return(
        <div className={classComponent}>
            <div className="description-text">
                <p className="text-header">Ім'я компанії-імпортера</p>
                <input className="input-default-text" onChange={(event) => {setValueInputName(event.target.value)}} value={valueInputName}/> 
            </div>  
            <div className="arrow-registrationStepCustomer"></div>
            <button
                className="button-steps"
                onClick={()=>{ 
                    customerRegistrationData(idTransaction, valueInputName); 
                    registrationCustomer();
                    setIsVisibleSpinner(true);
                }}
                disabled = {valueInputName ? false :  true}
            >
                    <div className={classSpinner}></div>
                    <p className={classTextButton}>Створити заявку</p>
            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    listCustomers: state.listCustomers
})


export default connect(mapStateToProps,{
    registrationCustomer,
    customerRegistrationData
})(RegistrationStepCustomer);