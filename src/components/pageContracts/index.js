import React from 'react';
import { useState } from 'react';
import './style.css';
import ContentAllSteps from '../contentAllSteps';
import ContentContracts from '../contentContracts';


const optionsForLineSteps = [
  { title: 'Реєстрація', number: 1 },
  { title: 'Узгодження', number: 2 },
  { title: 'Бронювання', number: 3 },
  { title: 'Висновок',  number: 4 }
]


const PageContracts = () => {
 
  const [isVisibleContent, setIsVisibleContent] = useState(true);   // Состояние для управления отображения Компонентами <ContentAllSteps /> или <ContentContracts/>
  
  const [numberVisibleChildComponent, setNumberVisibleChildComponent] = useState(1); // Состояние для управления отображения Компонентами <RegistrationStep /> <CoordinationStep/> <BookingStep/> <ConclusionStep/>

  const [isResultRegistrationStep, setIsResultRegistrationStep] = useState(false); // устанавливаем птичку для шага registration
  const [isResultCoordinationStep, setIsResultCoordinationStep] = useState(false); // устанавливаем птичку для шага coordination
  const [isResultBookingStep, setIsResultBookingStep] = useState(false); // устанавливаем птичку для шага booking
  const [isResultConclusionStep, setIsResultConclusionStep] = useState(false); // устанавливаем птичку для шага conclusion

  const resultsAllSteps = [isResultRegistrationStep, isResultCoordinationStep, isResultBookingStep, isResultConclusionStep]; // соберем в один массив, для удобства передачи данных
  const setResultsAllSteps = [setIsResultRegistrationStep, setIsResultCoordinationStep, setIsResultBookingStep, setIsResultConclusionStep]; // соберем в один массив, для удобства передачи данных

  const [idTransaction, setIdTransaction] = useState();




    return(
        <div className='block-page-contracts'> 
                <ContentAllSteps optionListTitle = {optionsForLineSteps} isVisibleContent = {isVisibleContent} setIsVisibleContent = {setIsVisibleContent} numberVisibleChildComponent = {numberVisibleChildComponent} setNumberVisibleChildComponent = {setNumberVisibleChildComponent} resultsAllSteps = {resultsAllSteps} setResultsAllSteps = {setResultsAllSteps} idTransaction = {idTransaction}/> 
                <ContentContracts isVisibleContent={isVisibleContent} setIsVisibleContent={setIsVisibleContent} setNumberVisibleChildComponent = {setNumberVisibleChildComponent} setResultsAllSteps = {setResultsAllSteps} setIdTransaction = {setIdTransaction} idTransaction = {idTransaction}/>
        </div>
    )
}

export default PageContracts;