import React,{ useState, useEffect }   from "react";
import './style.css';
import { connect } from "react-redux";
import {registrationVendor, vendorRegistrationData} from '../../../actions/vendorActions';


const RegistrationStepVendor = ({numberVisibleRegistrationStep, setNumberVisibleRegistrationStep, setIsResultRegistrationStepVendor, registrationVendor, listVendors, idTransaction, vendorRegistrationData}) => {

    let classComponent = `${numberVisibleRegistrationStep === 1 ? 'show-all-steps-registration' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    const [valueInputName, setValueInputName] = useState('');

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;
    


    useEffect(()=>{

        for(let i = 0; i < listVendors.length; i++){
            if(listVendors[i].id === idTransaction){
                if(listVendors[i].state === 'registered'){
                    setIsVisibleSpinner(false);
                    setValueInputName('');
                    setIsResultRegistrationStepVendor(true); // создаем успех на этом шаге
                    setNumberVisibleRegistrationStep(2); 
                    // break;
                }
            }
        }

    },[listVendors])
    


    return(
        <div className={classComponent}>
            <div className="description-text"> 
                <p className="text-header">Ім'я компанії-експортера</p>
                <input className="input-default-text" onChange={(event) => {setValueInputName(event.target.value)}} value={valueInputName}/>
            </div>
            <div className="arrow-registrationStepVendor"></div>   
            <button
                className="button-steps"
                onClick={()=>{
                    vendorRegistrationData(idTransaction, valueInputName); 
                    registrationVendor();
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
    listVendors: state.listVendors,
})



export default connect(mapStateToProps, {
    registrationVendor,
    vendorRegistrationData
})(RegistrationStepVendor);