import React,{useState, useEffect} from "react";
import './style.css';
import TableResults from '../tableResults';
import { connect } from "react-redux";
import {addTransaction} from '../actions';
import {v4} from 'uuid';



const ContentContracts = ({isVisibleContent, setIsVisibleContent, setNumberVisibleChildComponent, addTransaction, setIdTransaction, list, idTransaction}) => {

    let classComponent = `${isVisibleContent ? 'show-content-contracts' : 'notShow' }`;

    const [isVisibleBlockTable, setIsVisibleBlockTable] = useState(list.length < 1 ? false : true);

    let classButton = `block-button${isVisibleBlockTable ? ' block-button-table' : ' block-button-description' }`;
    // let classTextButton = `${isVisibleBlockTable ? 'notShow' : 'show'}`;

    let classBlockInfo = `${isVisibleBlockTable ? 'notShow' : 'block-info'}`;
    
    const [isOpenNotificationsBlock, setIsOpenNotificationsBlock] = useState(false);



    useEffect(()=>{
        if(list.length < 1){
            setIsVisibleBlockTable(false);
        } else setIsVisibleBlockTable(true);
    },[list])

    let id;
    
    return(
        <div className={classComponent}>
            <div className={classButton} onClick={()=>{                
                    id = v4();
                    setIdTransaction(id);
                    addTransaction(id); // создаем сделку в reducer
                    setIsVisibleContent(false);              
                    setNumberVisibleChildComponent(1);
            }}>
                <div className="plus">
                    <div className="plus-line-row"></div>
                    <div className="plus-line-column"></div>
                </div>
                <p
                    className='show'
                    onClick={() => {setIsOpenNotificationsBlock(false)}}
                >
                Створити угоду
                </p>
            </div>
            <br/><br/>
            <TableResults isVisibleBlockTable = {isVisibleBlockTable} isOpenNotificationsBlock = {isOpenNotificationsBlock} setIsOpenNotificationsBlock = {setIsOpenNotificationsBlock} idTransaction = {idTransaction}/>
            <div className={classBlockInfo}>
                Щоб створити угоду, Вам необхідно натиснути +
                далі дотримуйтесь інструкцій, які допоможуть Вам
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    list: state.resultListTransactions
})

export default connect(mapStateToProps, {addTransaction})(ContentContracts);