import React, {useState} from "react";
import './style.css';
import StepByStep from '../stepByStepIcon';
import ConclusionStepVendor from '../pseudoAPI/pseudoAPI_Vendor/conclusionStepVendor';
import ConclusionStepCustomer from '../pseudoAPI/pseudoAPI_Customer/conclusionStepCustomer';
import ConclusionStepInsurance from '../pseudoAPI/pseudoAPI_Insurance/conclusionStepInsurance';
import ConclusionStepLogistics from '../pseudoAPI/pseudoAPI_Logistics/conclusionStepLogistics';


const ConclusionStep = ({optionsForConclusionSteps, setIsVisibleContent, numberVisibleChildComponent, setIsResultConclusionStep, idTransaction, setResultsAllSteps, configForDropdownTypePayment, configForDropdownTypeDelivery}) => {

    let classComponent = `${numberVisibleChildComponent === 4 ? 'block-conclusion' : 'notShow' }`;

    const [numberVisibleConclusionStep, setNumberVisibleConclusionStep] = useState(1);


    const [isResultConclusionStepVendor, setIsResultConclusionStepVendor] = useState(false); // для итогового результата подшага ConclusionStepVendor
    const [isResultConclusionStepCustomer, setIsResultConclusionStepCustomer] = useState(false); // для итогового результата подшага ConclusionStepCustomer
    const [isResultConclusionStepInsurance, setIsResultConclusionStepInsurance] = useState(false); // для итогового результата подшага ConclusionStepInsurance
    const [isResultConclusionStepLogistics, setIsResultConclusionStepLogistics] = useState(false); // для итогового результата подшага ConclusionStepLogistics
    const resultsAllStepsConclusion = [isResultConclusionStepVendor, isResultConclusionStepCustomer, isResultConclusionStepInsurance, isResultConclusionStepLogistics];
    const setAllStepsConclusion = [setIsResultConclusionStepVendor, setIsResultConclusionStepCustomer, setIsResultConclusionStepInsurance, setIsResultConclusionStepLogistics];

    const [isShowFinalBlock, setIsShowFinalBlock] = useState(false);

    let showFinalBlock = `${isShowFinalBlock ? 'final-step-conclusion' : 'notShow' }`;
    let showOnlyConclusionBlock = `${isShowFinalBlock ? 'notShow' : 'showOnlyConclusionBlock' }`;
    const blockConclusionComponent = `block-conclusion-component${isShowFinalBlock ? ' final-block-conclusion-component' : ''}`;
    

    return(
        <div className={classComponent}>
            <div className="block-step-by-step">
                <StepByStep optionsForSteps = {optionsForConclusionSteps} numberVisibleStep = {numberVisibleConclusionStep} resultsAllSteps = {resultsAllStepsConclusion} />
            </div>         
            <div className={blockConclusionComponent}>
                <div className={showOnlyConclusionBlock}>
                    <ConclusionStepVendor numberVisibleConclusionStep = {numberVisibleConclusionStep} setNumberVisibleConclusionStep = {setNumberVisibleConclusionStep} setIsResultConclusionStepVendor = {setIsResultConclusionStepVendor} idTransaction = {idTransaction} configForDropdownTypePayment = {configForDropdownTypePayment}/>
                    <ConclusionStepCustomer numberVisibleConclusionStep = {numberVisibleConclusionStep} setNumberVisibleConclusionStep = {setNumberVisibleConclusionStep} setIsResultConclusionStepCustomer = {setIsResultConclusionStepCustomer} idTransaction = {idTransaction}/>
                    <ConclusionStepInsurance numberVisibleConclusionStep = {numberVisibleConclusionStep} setNumberVisibleConclusionStep = {setNumberVisibleConclusionStep} setIsResultConclusionStepInsurance = {setIsResultConclusionStepInsurance} idTransaction = {idTransaction}/>
                    <ConclusionStepLogistics setIsVisibleContent = {setIsVisibleContent} numberVisibleConclusionStep = {numberVisibleConclusionStep} setNumberVisibleConclusionStep = {setNumberVisibleConclusionStep} setIsShowFinalBlock = {setIsShowFinalBlock} setAllStepsConclusion = {setAllStepsConclusion} idTransaction = {idTransaction} setResultsAllSteps = {setResultsAllSteps} configForDropdownTypeDelivery = {configForDropdownTypeDelivery}/>
                </div>
                <div className={showFinalBlock}>
                    <p>УСПІХ! Угода оформлена.</p>
                </div>
            </div>
        </div>
    )
}

export default ConclusionStep;


