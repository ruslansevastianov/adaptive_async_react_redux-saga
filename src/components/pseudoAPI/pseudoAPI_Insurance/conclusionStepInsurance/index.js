import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {conclusionInsurance, insuranceConclusionData} from '../../../actions/insuranceActions';




const ConclusionStepInsurance = ({numberVisibleConclusionStep, setNumberVisibleConclusionStep, setIsResultConclusionStepInsurance, conclusionInsurance, idTransaction, insuranceConclusionData, listInsurences}) => {

    let classComponent = `${numberVisibleConclusionStep === 3 ? 'show-all-steps-conclusion' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;

    const [specNumber, setSpecNumber] = useState('');


    useEffect(()=>{
        for(let i = 0; i < listInsurences.length; i++){
                if(listInsurences[i].id === idTransaction){
                    if(listInsurences[i].state === 'concluded'){
                        setIsVisibleSpinner(false);
                        setSpecNumber('');
                        setIsResultConclusionStepInsurance(true); // устанавливаю успех для этого шага
                        setNumberVisibleConclusionStep(4);
                        // break;
                    }
                }
        }
    },[listInsurences])



    return(
        <div className={classComponent}>
            <div className="description-text">
                <p className="text-header">Спеціальний id</p>  
                <input type="number" className="input-default-number" onChange={(event) => {setSpecNumber(event.target.value)}} value={specNumber}/>        
            </div>
            <div className="arrow-conclusionStepInsurance"></div>
            <button
                className="button-steps"
                onClick={()=>{
                    insuranceConclusionData(idTransaction, specNumber); 
                    conclusionInsurance();
                    setIsVisibleSpinner(true);                       
                }}
                disabled = {specNumber ? false : true}
            >
                    <div className={classSpinner}></div>
                    <p className={classTextButton}>Відправити</p>
            </button>
        </div>
    )
}


const mapStateToProps = (state) => ({
    listInsurences: state.listInsurences
})

export default connect(mapStateToProps, {
    conclusionInsurance,
    insuranceConclusionData
})(ConclusionStepInsurance);