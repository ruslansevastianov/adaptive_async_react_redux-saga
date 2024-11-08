import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {conclusionVendor, vendorConclusionData} from '../../../actions/vendorActions';
import Dropdown from "../../../dropdown";


const ConclusionStepVendor = ({numberVisibleConclusionStep, setNumberVisibleConclusionStep, setIsResultConclusionStepVendor, conclusionVendor, idTransaction, vendorConclusionData, listVendors, configForDropdownTypePayment}) => {

    let classComponent = `${numberVisibleConclusionStep === 1 ? 'show-all-steps-conclusion' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;

    const [typePayment, setTypePayment] = useState(configForDropdownTypePayment[0].title);


    useEffect(()=>{
        for(let i = 0; i < listVendors.length; i++){
            if(listVendors[i].id === idTransaction){
                if(listVendors[i].state === 'concluded'){
                    setIsVisibleSpinner(false);
                    setTypePayment(configForDropdownTypePayment[0].title);
                    setIsResultConclusionStepVendor(true); // устанавливаю успех для этого шага
                    setNumberVisibleConclusionStep(2);
                }
                break;
            }
        }  
    },[listVendors])

              

    return(
        <div className={classComponent}>
            <div className="description-text">
            <div>
                <p className="text-header">Спосіб оплати</p>
                <Dropdown list={configForDropdownTypePayment} selected={typePayment} setSelected={setTypePayment}/>
            </div>
            </div>
            <div className="arrow-conclusionStepVendor"></div>
            <button
                className="button-steps"
                onClick={()=>{
                    vendorConclusionData(idTransaction, typePayment); 
                    conclusionVendor();
                    setIsVisibleSpinner(true);
                }}>
                    <div className={classSpinner}></div>
                    <p className={classTextButton}>Відправити</p>
            </button>
        </div>
    )
}


const mapStateToProps = (state) => ({
    listVendors: state.listVendors
})

export default connect(mapStateToProps, {
    conclusionVendor,
    vendorConclusionData
})(ConclusionStepVendor);

