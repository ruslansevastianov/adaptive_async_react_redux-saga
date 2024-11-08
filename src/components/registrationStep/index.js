import React,{useState} from "react";
import './style.css';
import StepByStep from '../stepByStepIcon';
import RegistrationStepVendor from '../pseudoAPI/pseudoAPI_Vendor/registrationStepVendor';
import RegistrationStepCustomer from '../pseudoAPI/pseudoAPI_Customer/registrationStepCustomer';
import RegistrationStepInsurance from '../pseudoAPI/pseudoAPI_Insurance/registrationStepInsurance';
import RegistrationStepLogistics from '../pseudoAPI/pseudoAPI_Logistics/registrationStepLogistics';



const RegistrationStep = ({optionsForRegistrationSteps, numberVisibleChildComponent, setNumberVisibleChildComponent, setIsResultRegistrationStep, idTransaction}) => {

    let classComponent = `${numberVisibleChildComponent === 1 ? 'block-registration' : 'notShow'}`; // видимость этого этапа registration в целом

    const [numberVisibleRegistrationStep, setNumberVisibleRegistrationStep] = useState(1); // ДЛЯ этого этапа REGISTRATION ДЛЯ ПОДШАГОВ одно состояние

    const [isResultRegistrationStepVendor, setIsResultRegistrationStepVendor] = useState(false); // для итогового результата - успеха подшага RegistrationStepVendor
    const [isResultRegistrationStepCustomer, setIsResultRegistrationStepCustomer] = useState(false); // для итогового результата - успеха подшага RegistrationStepCustomer
    const [isResultRegistrationStepInsurance, setIsResultRegistrationStepInsurance] = useState(false); // для итогового результата - успеха подшага RegistrationStepInsurance
    const [isResultRegistrationStepLogistics, setIsResultRegistrationStepLogistics] = useState(false); // для итогового результата - успеха подшага RegistrationStepLogistics
    const resultsAllStepsRegistration = [isResultRegistrationStepVendor, isResultRegistrationStepCustomer, isResultRegistrationStepInsurance, isResultRegistrationStepLogistics]; // для удобства сохраняем в один массив
    const setAllStepsRegistration = [setIsResultRegistrationStepVendor, setIsResultRegistrationStepCustomer, setIsResultRegistrationStepInsurance, setIsResultRegistrationStepLogistics]


    const [isShowFinalBlock, setIsShowFinalBlock] = useState(false);

    let showFinalBlock = `${isShowFinalBlock ? 'final-step-registration' : 'notShow' }`;
    let showOnlyRegistrationBlock = `${isShowFinalBlock ? 'notShow' : 'showOnlyRegistrationBlock' }`;
    const blockRegistrationComponent = `block-registration-component${isShowFinalBlock ? ' final-block-registration-component' : ''}`;
    
    

    return(
        <div className={classComponent}>
           <div className="block-step-by-step">
                <StepByStep optionsForSteps = {optionsForRegistrationSteps} numberVisibleStep = {numberVisibleRegistrationStep} resultsAllSteps = {resultsAllStepsRegistration} />
           </div>     
            <div className={blockRegistrationComponent}>
                <div className={showOnlyRegistrationBlock}>             
                    <RegistrationStepVendor numberVisibleRegistrationStep = {numberVisibleRegistrationStep} setNumberVisibleRegistrationStep = {setNumberVisibleRegistrationStep} setIsResultRegistrationStepVendor = {setIsResultRegistrationStepVendor} idTransaction = {idTransaction}/>
                    <RegistrationStepCustomer numberVisibleRegistrationStep = {numberVisibleRegistrationStep} setNumberVisibleRegistrationStep = {setNumberVisibleRegistrationStep} setIsResultRegistrationStepCustomer = {setIsResultRegistrationStepCustomer} idTransaction = {idTransaction}/>
                    <RegistrationStepInsurance numberVisibleRegistrationStep = {numberVisibleRegistrationStep} setNumberVisibleRegistrationStep = {setNumberVisibleRegistrationStep} setIsResultRegistrationStepInsurance = {setIsResultRegistrationStepInsurance} idTransaction = {idTransaction}/>
                    <RegistrationStepLogistics setNumberVisibleChildComponent = {setNumberVisibleChildComponent} numberVisibleRegistrationStep = {numberVisibleRegistrationStep} setNumberVisibleRegistrationStep = {setNumberVisibleRegistrationStep} setIsResultRegistrationStep = {setIsResultRegistrationStep} setAllStepsRegistration = {setAllStepsRegistration} setIsShowFinalBlock = {setIsShowFinalBlock} idTransaction = {idTransaction}/>
                </div>
                <div className={showFinalBlock}>
                    <p>УСПІХ! Заявки зареєстровані у вказаних компаніях</p>
                    <p>Ви можете перейти до узгодження.</p>
                </div>
            </div>
        </div>
    )
}

export default RegistrationStep;