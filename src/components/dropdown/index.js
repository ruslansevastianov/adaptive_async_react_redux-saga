import React, {useState, useRef, useEffect} from "react";
import './style.css';
import { v4 } from "uuid";


const Dropdown = ({list, selected, setSelected}) => {

    let myRef = useRef();

    // const [selected, setSelected] = useState(list[0].title);
    const [isOpen, setIsOpen] = useState(false);

    const dropdownContent = `${isOpen ? 'dropdown-content' : 'notShowDropdown-content'}`;
    const arrow = `arrow${isOpen ? ' arrowUp' : ''}`;

    useEffect(()=>{
        document.addEventListener('click', (event) =>{
            if(myRef.current?.contains(event.target)){
              return;
            } else{
                setIsOpen(false);
            }
        }, {capture: true})
    },[])



    const resultList = list.map((item) => {
        if(item.title === selected){
            return null;
        } else {
            return(
                <div
                    className="dropdown-row"
                    key={v4()}
                    onClick={()=>{
                        setSelected(item.title);
                        setIsOpen(false);
                    }}
                >
                    {item.title}
                </div>
            )
        }
    })


    return(
        <div className="dropdown-block" ref={myRef}>
            <div
                className="dropdown-header"
                onClick={()=>{
                    setIsOpen(!isOpen);
                }}
            >
                {selected}
                <div className={arrow}></div>
            </div>
            <div className={dropdownContent}>{resultList}</div>
        </div>
    )
}
export default Dropdown;
