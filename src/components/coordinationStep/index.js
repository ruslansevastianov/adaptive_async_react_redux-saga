import React, {useState} from "react";
import './style.css';
import StepByStep from '../stepByStepIcon';
import CoordinationStepVendor from '../pseudoAPI/pseudoAPI_Vendor/coordinationStepVendor';
import CoordinationStepCustomer from '../pseudoAPI/pseudoAPI_Customer/coordinationStepCustomer';
import CoordinationStepInsurance from '../pseudoAPI/pseudoAPI_Insurance/coordinationStepInsurance';
import CoordinationStepLogistics from '../pseudoAPI/pseudoAPI_Logistics/coordinationStepLogistics';


const CoordinationStep = ({optionsForCoordinationSteps, numberVisibleChildComponent, setNumberVisibleChildComponent, setIsResultCoordinationStep, idTransaction, configForDropdownKategoria, configForDropdownMethodTransportation}) => {

    let classComponent = `${numberVisibleChildComponent === 2 ? 'block-coordination' : 'notShow'}`;

    const [numberVisibleCoordinationStep, setNumberVisibleCoordinationStep] = useState(1); 

    const [isResultCoordinationStepVendor, setIsResultCoordinationStepVendor] = useState(false); // для итогового результата подшага CoordinationStepVendor
    const [isResultCoordinationStepCustomer, setIsResultCoordinationStepCustomer] = useState(false); // для итогового результата подшага CoordinationStepCustomer
    const [isResultCoordinationStepInsurance, setIsResultCoordinationStepInsurance] = useState(false); // для итогового результата подшага CoordinationStepInsurance
    const [isResultCoordinationStepLogistics, setIsResultCoordinationStepLogistics] = useState(false); // для итогового результата подшага CoordinationStepLogistics
    const resultsAllStepsCoordination = [isResultCoordinationStepVendor, isResultCoordinationStepCustomer, isResultCoordinationStepInsurance, isResultCoordinationStepLogistics];
    const setAllStepsCoordination = [setIsResultCoordinationStepVendor, setIsResultCoordinationStepCustomer, setIsResultCoordinationStepInsurance, setIsResultCoordinationStepLogistics]
    
    const [isShowFinalBlock, setIsShowFinalBlock] = useState(false);

    let showFinalBlock = `${isShowFinalBlock ? 'final-step-coordination' : 'notShow' }`;
    let showOnlyCoordinationBlock = `${isShowFinalBlock ? 'notShow' : 'showOnlyCoordinationBlock' }`;
    const blockCoordinationComponent = `block-coordination-component${isShowFinalBlock ? ' final-block-coordination-component' : ''}`;
    


    return(
         <div className={classComponent}>
                <div className="block-step-by-step">
                    <StepByStep optionsForSteps = {optionsForCoordinationSteps} numberVisibleStep = {numberVisibleCoordinationStep} resultsAllSteps = {resultsAllStepsCoordination} /> 
                </div>       
            <div className={blockCoordinationComponent}>
                <div className={showOnlyCoordinationBlock}>            
                    <CoordinationStepVendor numberVisibleCoordinationStep = {numberVisibleCoordinationStep} setNumberVisibleCoordinationStep = {setNumberVisibleCoordinationStep} setIsResultCoordinationStepVendor = {setIsResultCoordinationStepVendor} idTransaction = {idTransaction} configForDropdownKategoria = {configForDropdownKategoria}/>
                    <CoordinationStepCustomer numberVisibleCoordinationStep = {numberVisibleCoordinationStep} setNumberVisibleCoordinationStep = {setNumberVisibleCoordinationStep} setIsResultCoordinationStepCustomer = {setIsResultCoordinationStepCustomer} idTransaction = {idTransaction} configForDropdownKategoria = {configForDropdownKategoria}/>
                    <CoordinationStepInsurance numberVisibleCoordinationStep = {numberVisibleCoordinationStep} setNumberVisibleCoordinationStep = {setNumberVisibleCoordinationStep} setIsResultCoordinationStepInsurance = {setIsResultCoordinationStepInsurance} idTransaction = {idTransaction}/>
                    <CoordinationStepLogistics setNumberVisibleChildComponent = {setNumberVisibleChildComponent} numberVisibleCoordinationStep = {numberVisibleCoordinationStep} setNumberVisibleCoordinationStep = {setNumberVisibleCoordinationStep}  setIsResultCoordinationStep = {setIsResultCoordinationStep} setIsShowFinalBlock = {setIsShowFinalBlock} setAllStepsCoordination = {setAllStepsCoordination} idTransaction = {idTransaction} configForDropdownMethodTransportation = {configForDropdownMethodTransportation}/>
                </div>
                <div className={showFinalBlock}>
                    <p>Успіх! Замовлення узгоджено.</p>
                    <p>Ви можете перейти до бронювання</p>
                </div>
            </div>

        </div>
    )
}

export default CoordinationStep;