import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {coordinationCustomer, customerCoordinationData} from '../../../actions/customerActions';
import Dropdown from "../../../dropdown";


const CoordinationStepCustomer = ({numberVisibleCoordinationStep, setNumberVisibleCoordinationStep, setIsResultCoordinationStepCustomer, coordinationCustomer, idTransaction, customerCoordinationData, listCustomers, configForDropdownKategoria}) => {

    let classComponent = `${numberVisibleCoordinationStep === 2 ? 'show-all-steps-coordination' : 'notShow' }`;

    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;


    const [category, setCategory] = useState(configForDropdownKategoria[0].title);
    const [total, setTotal] = useState('');

    useEffect(()=>{
        
        for(let i = 0; i < listCustomers.length; i++){

             if(listCustomers[i].id === idTransaction){
                if(listCustomers[i].state === 'agreed'){
                    setIsVisibleSpinner(false);
                    setCategory(configForDropdownKategoria[0].title);
                    setTotal('');
                    setIsResultCoordinationStepCustomer(true); // делаем успех для этого шага
                    setNumberVisibleCoordinationStep(3);
                }
             }
        }
    },[listCustomers])



    return(
        <div className={classComponent}>
            <div className="description-text">
            <div>
                <p className="text-header">Категорія</p>
                <Dropdown list={configForDropdownKategoria} selected={category} setSelected={setCategory} />
            </div>
            <br/>
            <div>
                <p className="text-header">Кількість</p>
                <input type="number" className="input-default-number" onChange={(event) => {setTotal(event.target.value)}} value={total}/>
            </div>
            </div>
            <div className="arrow-coordinationStepCustomer"></div>         
            <button
                className="button-steps"
                onClick={()=>{
                    customerCoordinationData(idTransaction, category, total); 
                    coordinationCustomer();
                    setIsVisibleSpinner(true);
                }}
                disabled = {total ? false : true}
            >
                    <div className={classSpinner}></div>
                    <p className={classTextButton}>Підтвердити</p>
            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    listCustomers: state.listCustomers
})


export default connect(mapStateToProps, {
    coordinationCustomer,
    customerCoordinationData
})(CoordinationStepCustomer);