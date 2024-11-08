import React from "react";
import './style.css';
import {v4} from 'uuid';



const LineSteps = ({optionListTitle, numberVisibleChildComponent, resultsAllSteps}) => {

    let classesList = ['text-registration', 'text-coordination', 'text-booking', 'text-conclusion'];


    let list = optionListTitle.map((item, index) => {

        if(index !== optionListTitle.length-1){
            return(
                <div className="type" key={v4()}>
                        <div className={   `${   resultsAllSteps[index] ? `circle${resultsAllSteps[index] ? ' circle-success' : '' }` : `circle${numberVisibleChildComponent ===  item.number ? ' circle-active' : '' }`   }`    }>
                                <div className={resultsAllSteps[index] ? 'icon-line-arrow' : 'icon-line-arrow-not-show'}></div>
                                <p className={resultsAllSteps[index] ? 'not-visible-icon-text' : 'visible-icon-text' }>{item.number}</p>
                                <p className={`${classesList[index]} ${ numberVisibleChildComponent === index+1  || resultsAllSteps[index] ? ' text-active' : '' }`}>{item.title}</p>
                        </div>
                        <div className={`line ${resultsAllSteps[index+1] ? ' line-active' : '' }`}></div>
                </div>
            )
        }else{
            return(
                <div  key={v4()}>
                    <div className={ `${resultsAllSteps[index] ? `circle${resultsAllSteps[index] ? ' circle-success' : '' } ` : `circle${numberVisibleChildComponent === item.number ? ' circle-active' : '' }` }`}>
                            <div className={resultsAllSteps[index] ? 'icon-line-arrow' : 'icon-line-arrow-not-show'}></div>
                            <p className={resultsAllSteps[index] ? 'not-visible-icon-text' : 'visible-icon-text' }>{item.number}</p>
                            <p className={`${classesList[index]}${numberVisibleChildComponent === index+1 || resultsAllSteps[index] ? ' text-active' : '' }`}>{item.title}</p>
                    </div>
                </div>
            )
        }
    })

    return(
        <div className="line-block">
            <div className="counter-step"><p>{numberVisibleChildComponent}/4</p></div>
                
                <div className="add-block">
                    <div className="line-block-steps">
                        {list}  
                    </div>
                </div>

                
        </div>
    )

}

export default LineSteps;