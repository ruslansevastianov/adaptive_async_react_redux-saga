import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {coordinationLogistics, logisticsCoordinationData} from '../../../actions/logisticsActions';
import Dropdown from "../../../dropdown";


const CoordinationStepLogistics = ({setNumberVisibleChildComponent, numberVisibleCoordinationStep, setNumberVisibleCoordinationStep, setIsResultCoordinationStep, setIsShowFinalBlock, setAllStepsCoordination, coordinationLogistics, idTransaction, logisticsCoordinationData, listLogisticss, configForDropdownMethodTransportation}) => {

    const [setIsResultCoordinationStepVendor, setIsResultCoordinationStepCustomer, setIsResultCoordinationStepInsurance, setIsResultCoordinationStepLogistics] = setAllStepsCoordination;

    let classComponent = `${numberVisibleCoordinationStep === 4 ? 'show-all-steps-coordination' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;


    const [nameVendor, setNameVendor] = useState('');
    const [nameCustomer, setNameCustomer] = useState('');
    const [typeDelivery, setTypeDelivery] = useState(configForDropdownMethodTransportation[0].title);



    useEffect(() => {
        
        for(let i = 0; i < listLogisticss.length; i++){

                 if(listLogisticss[i].id === idTransaction){
                    if(listLogisticss[i].state === 'agreed'){

                        setIsVisibleSpinner(false);
                        setNameVendor('');
                        setNameCustomer('');
                        setTypeDelivery(configForDropdownMethodTransportation[0].title);
        
                        setNumberVisibleCoordinationStep(0) //  устанавливаем  - 0, чтобы увидеть все успешные шаги
                        
                        setIsResultCoordinationStep(true) // устанавливаю птичку для этапа coordination
        
                        setIsResultCoordinationStepLogistics(true); // делаю успех для этого шага
                        setIsShowFinalBlock(true); //открываю финальный блок
        
                        setTimeout(()=>{setNumberVisibleChildComponent(3)},3000); // открываю следующий этап
                        setTimeout(()=>{setIsShowFinalBlock(false)},4000); // возвращаю обратно по умолчанию исходный значение шага
        
                        setTimeout(()=>{
                            setNumberVisibleCoordinationStep(1); // возвращаю на 1step -- проверить!!!
                            setIsResultCoordinationStepVendor(false);
                            setIsResultCoordinationStepCustomer(false);
                            setIsResultCoordinationStepInsurance(false);
                            setIsResultCoordinationStepLogistics(false);
                        },5000); 
        
                        // break;
                    }
                 }
        }

    },[listLogisticss])


    return(
        <div className={classComponent}>
            <div className="description-text">
            <div>
                <p className="text-header">Ім'я постачальника</p>
                <input className="input-default-text" onChange={(event) => {setNameVendor(event.target.value)}} value={nameVendor}/>
            </div>
            <br/>
            <div>
                <p className="text-header">Ім'я замовника</p>
                <input className="input-default-text" onChange={(event) => {setNameCustomer(event.target.value)}} value={nameCustomer}/>
            </div>
            <br/>
            <div>
                <p className="text-header">Тип перевезення</p>
                <Dropdown list={configForDropdownMethodTransportation} selected={typeDelivery} setSelected={setTypeDelivery}/>
            </div>
            </div>
            <div className="arrow-coordinationStepLogistics"></div>
            <button
                className="button-steps"
                onClick={()=>{
                    logisticsCoordinationData(idTransaction, nameVendor, nameCustomer, typeDelivery); 
                    coordinationLogistics();
                    setIsVisibleSpinner(true);     
                }}
                disabled = {nameVendor && nameCustomer ? false : true}
            >
                <div className={classSpinner}></div>
                <p className={classTextButton}>Підтвердити</p>
            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    listLogisticss: state.listLogisticss
})

export default connect(mapStateToProps,{
    coordinationLogistics,
    logisticsCoordinationData
})(CoordinationStepLogistics);