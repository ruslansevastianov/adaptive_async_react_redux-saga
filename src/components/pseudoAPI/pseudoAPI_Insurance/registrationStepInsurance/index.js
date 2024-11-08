import React,{ useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {registrationInsurance, insuranceRegistrationData} from '../../../actions/insuranceActions';



const RegistrationStepInsurance = ({numberVisibleRegistrationStep, setNumberVisibleRegistrationStep, setIsResultRegistrationStepInsurance, registrationInsurance, listInsurences, idTransaction, insuranceRegistrationData}) => {


let classComponent = `${numberVisibleRegistrationStep === 3 ? 'show-all-steps-registration' : 'notShow' }`;

const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

const [valueInputName, setValueInputName] = useState('');

let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;


useEffect(()=>{

    for(let i = 0; i < listInsurences.length; i++){

         if(listInsurences[i].id === idTransaction){
            if(listInsurences[i].state === 'registered'){
                setIsVisibleSpinner(false);
                setValueInputName('');
                setIsResultRegistrationStepInsurance(true); // делаем успех для этого шага
                setNumberVisibleRegistrationStep(4);
                // break;
            }
         }
    }

},[listInsurences])


    return(
        <div className={classComponent}>
            <div className="description-text">
                <p className="text-header">Ім'я страхової компанії</p>
                <input className="input-default-text" onChange={(event) => {setValueInputName(event.target.value)}} value={valueInputName}/> 
            </div>
            <div className="arrow-registrationStepInsurance"></div>
            <button
                className="button-steps"
                onClick={()=>{           
                    insuranceRegistrationData(idTransaction, valueInputName); 
                    registrationInsurance();
                    setIsVisibleSpinner(true);
                }}
                disabled = {valueInputName ? false : true}
            >
                    <div className={classSpinner}></div>
                    <p className={classTextButton}>Створити заявку</p>
            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    listInsurences: state.listInsurences
})

export default connect(mapStateToProps, {
    registrationInsurance,
    insuranceRegistrationData
})(RegistrationStepInsurance);