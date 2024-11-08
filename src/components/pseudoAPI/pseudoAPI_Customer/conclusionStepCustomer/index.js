import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {conclusionCustomer, customerConclusionData} from '../../../actions/customerActions';



const ConclusionStepCustomer = ({numberVisibleConclusionStep, setNumberVisibleConclusionStep, setIsResultConclusionStepCustomer, conclusionCustomer, idTransaction, customerConclusionData, listCustomers}) => {

    let classComponent = `${numberVisibleConclusionStep === 2 ? 'show-all-steps-conclusion' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;

    const [rekvizit, setRekvizit] = useState('');


    useEffect(()=>{
        for(let i = 0; i < listCustomers.length; i++){
            if(listCustomers[i].id === idTransaction){
                if(listCustomers[i].state === 'concluded'){
                    setIsVisibleSpinner(false);
                    setRekvizit('');
                    setIsResultConclusionStepCustomer(true); //устанавливаю успех для этого шага
                    setNumberVisibleConclusionStep(3);
                }
            }
        }
    },[listCustomers])



    return(
        <div className={classComponent}>
            <div className="description-text">
                <p className="text-header">Реквізити</p>
                <input type="number" className="input-default-number" onChange={(event) => {setRekvizit(event.target.value)}} value={rekvizit}/>              
            </div>
            <div className="arrow-conclusionStepCustomer"></div>
            <button
                className="button-steps"
                onClick={()=>{
                    customerConclusionData(idTransaction, rekvizit); 
                    conclusionCustomer();
                    setIsVisibleSpinner(true);            
                }}
                disabled = {rekvizit ? false : true}
            >
                    <div className={classSpinner}></div>
                    <p className={classTextButton}>Відправити</p>
            </button>
        </div>
    )
}


const mapStateToProps = (state) => ({
    listCustomers: state.listCustomers
})

export default connect(mapStateToProps, {
    conclusionCustomer,
    customerConclusionData
})(ConclusionStepCustomer);