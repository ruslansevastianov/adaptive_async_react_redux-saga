import React from "react";
import './style.css';
import {v4} from 'uuid';



const StepByStep = ({optionsForSteps,  numberVisibleStep, resultsAllSteps}) => {



       const list = optionsForSteps.map((item, index)=>{

        if(index !== optionsForSteps.length-1){
            return(
                <div className="text-circle" key={v4()}>
                        <div className={`${index !== 0 ? 'add-type-steps' : 'type-steps'}`}>  
                            <div className={`${index !== 0 ? 'add-line-step' : 'not-show-add-line-step'}`}></div>           
                                <div className={`${resultsAllSteps[index] ? `circle-step${ resultsAllSteps[index] ? ' circle-step-success' : '' }` :  `circle-step${ numberVisibleStep === index+1 ? ' circle-step-active' : '' }`}`}>
                                        <div className={`${resultsAllSteps[index] ? 'icon-arrow' : 'icon-arrow-not-show' }`}></div>          
                                </div>
                                <div className="line-step"></div>
                        </div>           
                        <div className="text-step-by-step">
                            <div className="text-header-step-by-step">
                                <p className= {`${numberVisibleStep === index+1 ? 'text-krok' : 'text-krok-not-show' }`}>Крок {index+1} із {optionsForSteps.length}</p>
                                <p>{item.title}</p>
                            </div>
                            <p className={`${numberVisibleStep === index+1 ? 'text-description-step-by-step' : `notSow-text-description-step-by-step`} `} >{item.description}</p>
                        </div>
                </div>
            )
        }else{
            return(               
                <div className="text-circle" key={v4()}>
                    <div className="type2-steps">
                    <div className="add-line-step"></div>
                        <div className={`${resultsAllSteps[index] ? ` circle-step${ resultsAllSteps[index] ? ' circle-step-success' : '' }` :  `circle-step ${ numberVisibleStep === index+1 ? ' circle-step-active' : '' }`}`}>
                            <div className={`${resultsAllSteps[index] ? 'icon-arrow' : 'icon-arrow-not-show' }`}></div>            
                        </div>
                    </div>
                    <div className="text-step-by-step">
                        <div className="text-header-step-by-step">
                            <p className={`${numberVisibleStep === index+1 ? 'text-krok' : 'text-krok-not-show' }`}>Крок {index+1} із {optionsForSteps.length}</p>
                            <p>{item.title}</p> 
                        </div>
                        <p className={`${numberVisibleStep === index+1 ? 'text-description-step-by-step' : 'notSow-text-description-step-by-step' }`}>{item.description}</p>
                    </div>
                </div>
            )
        }
    })


    return(
        <div className="block-step-by-step">
                {list}
        </div>
    )


}

export default StepByStep;