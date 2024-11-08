import React,{useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {registrationLogistics, logisticsRegistrationData} from '../../../actions/logisticsActions';



const RegistrationStepLogistics = ({setNumberVisibleChildComponent, numberVisibleRegistrationStep, setNumberVisibleRegistrationStep, setIsResultRegistrationStep, setAllStepsRegistration, setIsShowFinalBlock, registrationLogistics, listLogisticss, idTransaction, logisticsRegistrationData}) => {

    const [setIsResultRegistrationStepVendor, setIsResultRegistrationStepCustomer, setIsResultRegistrationStepInsurance, setIsResultRegistrationStepLogistics] = setAllStepsRegistration;

    let classComponent = `${numberVisibleRegistrationStep === 4 ? 'show-all-steps-registration' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    const [valueInputName, setValueInputName] = useState('');

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;
    
    
    useEffect(()=>{


        for(let i = 0; i < listLogisticss.length; i++){

             if(listLogisticss[i].id === idTransaction){
                if(listLogisticss[i].state === 'registered'){

                    setIsVisibleSpinner(false);
                    setValueInputName('');  
                    setIsResultRegistrationStepLogistics(true); // делаем успех для этого шага
                    
                    setNumberVisibleRegistrationStep(0); // устанавливаем - 0, чтобы увидеть все успешные шаги
                    setIsResultRegistrationStep(true); // устанавливаем птичку ДЛЯ ШАГА registration          
                    setIsShowFinalBlock(true); // видимый финальный блок 
    
                    setTimeout(()=>{setNumberVisibleChildComponent(2)},3000); // открываем следующий этап         
        
                    setTimeout(()=>{setIsShowFinalBlock(false)}, 4000); // возвращаю окно по умолчанию
        
                    setTimeout(()=>{
                        setNumberVisibleRegistrationStep(1); // исправил с 0 на 1   уточнить этот момент --- устанавливаем начальному -  1step - visible 
                        setIsResultRegistrationStepVendor(false);
                        setIsResultRegistrationStepCustomer(false);
                        setIsResultRegistrationStepInsurance(false);
                        setIsResultRegistrationStepLogistics(false);
                    },5000); 
    
                    // break;
                }
             }
        }

    },[listLogisticss])

    




    return(
        <div className={classComponent}>
            <div className="description-text">
                <p className="text-header">Ім'я логістичної компанії</p>
                <input className="input-default-text" onChange={(event)=>{setValueInputName(event.target.value)}} value={valueInputName}/> 
            </div>
            <div className="arrow-registrationStepLogistics"></div>
            <button
                className="button-steps"
                onClick={()=>{            
                    logisticsRegistrationData(idTransaction, valueInputName); 
                    registrationLogistics();
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
    listLogisticss: state.listLogisticss
})


export default connect(mapStateToProps, {
    registrationLogistics,
    logisticsRegistrationData
})(RegistrationStepLogistics);