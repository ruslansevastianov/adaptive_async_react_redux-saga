import React from "react";
import './style.css';
import Expander from '../expander';




const ExpanderList = ({list}) => {

    let resultList = list.map((item, index)=>{

        return(
            <div className="row-expander-list">
                <Expander item = {item} number = {index+1}/>
            </div>
        )
    }) 



    return(
        <div>
            {resultList}
        </div>
    )
}

export default ExpanderList;
