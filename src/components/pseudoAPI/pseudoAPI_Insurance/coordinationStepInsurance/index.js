import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {coordinationInsurance, insuranceCoordinationData} from '../../../actions/insuranceActions';



const CoordinationStepInsurance = ({numberVisibleCoordinationStep, setNumberVisibleCoordinationStep, setIsResultCoordinationStepInsurance, coordinationInsurance, idTransaction, insuranceCoordinationData, listInsurences}) => {

    let classComponent = `${numberVisibleCoordinationStep === 3 ? 'show-all-steps-coordination' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;


    const [nameVendor, setNameVendor] = useState('');
    const [nameCustomer, setNameCustomer] = useState('');

    useEffect(()=>{

        for(let i = 0; i < listInsurences.length; i++){

             if(listInsurences[i].id === idTransaction){
                if(listInsurences[i].state === 'agreed'){
                    setIsVisibleSpinner(false);
                    setNameVendor('');
                    setNameCustomer('');
                    setIsResultCoordinationStepInsurance(true); // делаем успех для этого шага
                    setNumberVisibleCoordinationStep(4);
                    // break;
                }
             }
        }
    
    },[listInsurences])



    
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
            </div>
            <div className="arrow-coordinationStepInsurance"></div>
            <button
                className="button-steps"
                onClick={()=>{
                    insuranceCoordinationData(idTransaction, nameVendor, nameCustomer); 
                    coordinationInsurance();
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
    listInsurences: state.listInsurences
})

export default connect(mapStateToProps, {
    coordinationInsurance,
    insuranceCoordinationData
})(CoordinationStepInsurance);