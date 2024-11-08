import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {conclusionLogistics, logisticsConclusionData} from '../../../actions/logisticsActions';
import Dropdown from "../../../dropdown";



const ConclusionStepLogistics = ({setIsVisibleContent, numberVisibleConclusionStep, setNumberVisibleConclusionStep, setIsShowFinalBlock, setAllStepsConclusion,  conclusionLogistics, idTransaction, logisticsConclusionData, listLogisticss, setResultsAllSteps, configForDropdownTypeDelivery}) => {

    const [setIsResultConclusionStepVendor, setIsResultConclusionStepCustomer, setIsResultConclusionStepInsurance, setIsResultConclusionStepLogistics] = setAllStepsConclusion;
    const [setIsResultRegistrationStep, setIsResultCoordinationStep, setIsResultBookingStep, setIsResultConclusionStep] = setResultsAllSteps


    let classComponent = `${numberVisibleConclusionStep === 4 ? 'show-all-steps-conclusion' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;

    const [addressVidpravlennia, setAddressVidpravlennia] = useState('');
    const [addressOtrimannia, setAddressOtrimannia] = useState('');
    const [sposibDostavki, setSposibDostavki] = useState(configForDropdownTypeDelivery[0].title);


    useEffect(()=>{

        for(let i = 0; i < listLogisticss.length; i++){

                    if(listLogisticss[i].id === idTransaction){
                        if(listLogisticss[i].state === 'concluded'){ 

                            setIsVisibleSpinner(false);
                            setAddressVidpravlennia('');
                            setAddressOtrimannia('');
                            setSposibDostavki(configForDropdownTypeDelivery[0].title);
                            setNumberVisibleConclusionStep(0); // устанавливаем - 0, чтобы увидеть все успешные шаги
                            
                            setIsResultConclusionStep(true); // устанавливаю птичку ДЛЯ ЭТОГО ЭТАПА conclusion
                            setIsResultConclusionStepLogistics(true); // устанавливаю успех для этого шага
            
                            setIsShowFinalBlock(true);
            
                            setTimeout(()=>{setIsVisibleContent(true)},3000); // открываю ДРУГОЕ ОКНО
            
                            setTimeout(()=>{setIsShowFinalBlock(false)},4000); // возращаю по умолчанию это блок
            
                           setTimeout(()=>{
                                setNumberVisibleConclusionStep(1); // возвращаю на 1step -- проверить!!!
                                setIsResultConclusionStepVendor(false);
                                setIsResultConclusionStepCustomer(false);
                                setIsResultConclusionStepInsurance(false);
                                setIsResultConclusionStepLogistics(false);
            
                                setIsResultRegistrationStep(false);
                                setIsResultCoordinationStep(false);
                                setIsResultBookingStep(false);
                                setIsResultConclusionStep(false);
                                // setIsResultConclusionStep(false); // убираю птичку для этого этапа conclusion
                        },5000); 
                            // break;
                        }
                    }
        }
    },[listLogisticss])


    return(
        <div className={classComponent}>
            <div  className="description-text">
            <div>
                <p className="text-header">Адреса відправлення</p>
                <input className="input-default-text" onChange={(event) => {setAddressVidpravlennia(event.target.value)}} value={addressVidpravlennia}/>
            </div>
            <br/>
            <div>
                <p className="text-header">Адреса отримання</p>
                <input className="input-default-text" onChange={(event) => {setAddressOtrimannia(event.target.value)}} value={addressOtrimannia}/>
            </div>
            <br/>
            <div>
                <p className="text-header">Спосіб доставки</p>
                <Dropdown list={configForDropdownTypeDelivery} selected={sposibDostavki} setSelected={setSposibDostavki}/> 
            </div>
            </div>
            <div className="arrow-conclusionStepLogistics"></div>
            <button
                className="button-steps"
                onClick={()=> {
                    logisticsConclusionData(idTransaction, addressVidpravlennia, addressOtrimannia, sposibDostavki); 
                    conclusionLogistics();
                    setIsVisibleSpinner(true);
                }}
                disabled = {addressVidpravlennia && addressOtrimannia ? false : true}
            >
                    <div className={classSpinner}></div>
                    <p className={classTextButton}>Відправити</p>
            </button>
        </div>
    )
}


const mapStateToProps = (state) => ({
    listLogisticss: state.listLogisticss
})

export default connect(mapStateToProps, {
    conclusionLogistics,
    logisticsConclusionData
})(ConclusionStepLogistics);