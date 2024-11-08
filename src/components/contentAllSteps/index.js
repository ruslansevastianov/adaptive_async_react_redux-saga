import React from "react";
import './style.css';
import LineSteps from '../lineSteps';
import RegistrationStep from '../registrationStep';
import CoordinationStep from '../coordinationStep';
import BookingStep from '../bookingStep';
import ConclusionStep from '../conclusionStep';



const configForRegistrationSteps = [
    {title: 'Реєстрація у  експортера', description: 'Створення замовлення в режимі реального часу'},
    {title: 'Реєстрація у  імпортера', description: 'Створення замовлення в режимі реального часу'},
    {title: 'Реєстрація у  страхуванні', description: 'Створення замовлення в режимі реального часу'},
    {title: 'Реєстрація у  логістиці', description: 'Створення замовлення в режимі реального часу'},
];
const configForCoordinationSteps = [
    {title: 'Узгодження з експортером', description: 'Узгодження в режимі реального часу'},
    {title: 'Узгодження з імпортером', description: 'Узгодження в режимі реального часу'},
    {title: 'Узгодження зі страхувою', description: 'Узгодження в режимі реального часу.'},
    {title: 'Узгодження з логістикою', description: 'Узгодження в режимі реального часу'}
];
const configForBookingSteps = [
    {title: 'Бронювання у експортера', description: 'Бронювання в режимі реального часу'},
    {title: 'Бронювання у імпортера', description: 'Бронювання в режимі реального часу'},
    {title: 'Бронювання у страховій', description: 'Бронювання в режимі реального часу'},
    {title: 'Бронювання у логістиці', description: 'Бронювання в режимі реального часу'}
];
const configForConclusionSteps = [
    {title: 'Висновок з експортером', description: 'Висновок в режимі реального часу'},
    {title: 'Висновок з імпортером', description: 'Висновок в режимі реального часу'},
    {title: 'Висновок зі страховою', description: 'Висновок в режимі реального часу'},
    {title: 'Висновок з логістикою', description: 'Висновок в режимі реального часу'}
];
const configForDropdownKategoria = [
    {title: 'Будівництво'},
    {title: 'Харчування'},
    {title: 'Одяг'},
    {title: 'Обладнання'},
    {title: 'Електроніка'},
    {title: 'Меблі'}
];
const configForDropdownMethodTransportation = [
    {title: 'Авіаційним'},
    {title: 'Залізничним'},
    {title: 'Автомобільним'},
    {title: 'Морем'}
];
const configForDropdownTypePayment = [
    {title: 'Картка'},
    {title: 'ASN'},
];
const configForDropdownTypeDelivery = [
    {title: "Кур'єрська"},
    {title: 'Самовивіз'},
    {title: 'Постамат'},
]

const ContentAllSteps = ({optionListTitle, isVisibleContent, setIsVisibleContent, numberVisibleChildComponent, setNumberVisibleChildComponent, resultsAllSteps, setResultsAllSteps, idTransaction}) => {

        let classComponent = `${isVisibleContent ? 'notShow' : 'content-all-steps' }`; // отображение самого Родительского Компонента <ContentAllSteps/>

        const [setIsResultRegistrationStep, setIsResultCoordinationStep, setIsResultBookingStep, setIsResultConclusionStep] = setResultsAllSteps;


    return(
        <div className={classComponent}>
            <div className="block-line-steps">
                <LineSteps optionListTitle = {optionListTitle} numberVisibleChildComponent = {numberVisibleChildComponent} resultsAllSteps = {resultsAllSteps}/>
            </div>
            <RegistrationStep optionsForRegistrationSteps = {configForRegistrationSteps}  numberVisibleChildComponent = {numberVisibleChildComponent} setNumberVisibleChildComponent = {setNumberVisibleChildComponent} setIsResultRegistrationStep = {setIsResultRegistrationStep} idTransaction = {idTransaction}/>
            <CoordinationStep optionsForCoordinationSteps = {configForCoordinationSteps} numberVisibleChildComponent = {numberVisibleChildComponent} setNumberVisibleChildComponent = {setNumberVisibleChildComponent} setIsResultCoordinationStep = {setIsResultCoordinationStep} idTransaction = {idTransaction} configForDropdownKategoria = {configForDropdownKategoria} configForDropdownMethodTransportation = {configForDropdownMethodTransportation}/>
            <BookingStep optionsForBookingSteps = {configForBookingSteps} numberVisibleChildComponent = {numberVisibleChildComponent} setNumberVisibleChildComponent = {setNumberVisibleChildComponent} setIsResultBookingStep = {setIsResultBookingStep} idTransaction = {idTransaction}/>
            <ConclusionStep optionsForConclusionSteps = {configForConclusionSteps} setIsVisibleContent = {setIsVisibleContent} numberVisibleChildComponent = {numberVisibleChildComponent} setIsResultConclusionStep = {setIsResultConclusionStep} idTransaction = {idTransaction} setResultsAllSteps = {setResultsAllSteps} configForDropdownTypePayment = {configForDropdownTypePayment} configForDropdownTypeDelivery = {configForDropdownTypeDelivery}/>
        </div>
    )
}

export default ContentAllSteps;