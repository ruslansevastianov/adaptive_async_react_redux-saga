import React, {useState, useEffect} from "react";
import './style.css';
import { connect } from "react-redux";
import {coordinationVendor, vendorCoordinationData} from '../../../actions/vendorActions';
import Dropdown from '../../../dropdown';



const CoordinationStepVendor = ({numberVisibleCoordinationStep, setNumberVisibleCoordinationStep, setIsResultCoordinationStepVendor, coordinationVendor, idTransaction, vendorCoordinationData, listVendors, configForDropdownKategoria}) => {


    let classComponent = `${numberVisibleCoordinationStep === 1 ? 'show-all-steps-coordination' : 'notShow' }`;
    const [isVisibleSpinner, setIsVisibleSpinner] = useState(false);

    const [category, setCategory] = useState(configForDropdownKategoria[0].title);
    const [total, setTotal] = useState('');

    let classSpinner = ` ${isVisibleSpinner ? 'spinner' : 'notShow' }`;
    let classTextButton = ` ${isVisibleSpinner ? 'notShow' : 'show-text-button' }`;

    


    useEffect(()=>{

        for(let i = 0; i < listVendors.length; i++){

             if(listVendors[i].id === idTransaction){
                if(listVendors[i].state === 'agreed'){
                    setIsVisibleSpinner(false);
                    setCategory(configForDropdownKategoria[0].title);
                    setTotal('');
                    setIsResultCoordinationStepVendor(true); // делаем успех для этого шага 
                    setNumberVisibleCoordinationStep(2);
                }
             }
        }
    },[listVendors])


   


    return(
        <div className={classComponent}>
            <div className="description-text">   
                    <div>
                        <p className="text-header">Категорія</p>
                        <Dropdown list = {configForDropdownKategoria} selected = {category} setSelected = {setCategory} />
                    </div>
                    <br/>
                    <div>
                        <p className="text-header">Кількість</p>
                        <input type="number" className="input-default-number" onChange={(event)=>{setTotal(event.target.value)}} value={total}/>
                    </div>
            </div>
            <div className="arrow-coordinationStepVendor"></div>
            <button
                className="button-steps"
                onClick={()=>{
                    vendorCoordinationData(idTransaction, category, total); 
                    coordinationVendor();
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
    listVendors: state.listVendors
})


export default connect(mapStateToProps, {
    coordinationVendor,
    vendorCoordinationData
})(CoordinationStepVendor);