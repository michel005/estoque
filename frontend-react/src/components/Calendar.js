import { faArrowCircleLeft, faArrowCircleRight, faArrowLeft, faArrowRight, faCalendar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ButtonStyled from './ButtonStyled';
import styled from "styled-components";

const AlternativeCalendarStyled = styled.div`
background-color: #fff;
box-shadow: #ddd 0px 0px 7px;
overflow: hidden;
padding: 4px;
width: 290px;

.title {
    color: #000;
    padding: 10px 10px 4px;
    font-weight: bold;
}

.commands {
    display: flex;
    flex-direction: row;
    padding: 10px 4px;
    width: 100%;

    button {
        background-color: transparent;
        color: #111;
        font-weight: bold;
        cursor: pointer;
        border: none;
        padding: 7px;
    }

    .currentMonth {
        color: #111;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        font-size: 16px;
        justify-content: center;
        text-align: center;
        height: 29px;
    }
}

.selectedDate {
    color: #111;
    display: flex;
    flex-direction: row;
    font-weight: bold;
    justify-content: center;
    padding: 14px 7px 7px;
    text-align: center;

    .date {
        text-align: left;
        padding: 4px;
        width: 100%;

        svg {
            margin-right: 10px;
        }
    }

    .espacador {
    }

    button {
        color: red;
        margin-right: -3px;
    }
}

.calendarViewer {
    background-color: #fff;
    width: 100%;

    .week {
        display: flex;
        flex-direction: row;

        .day {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            border-radius: 7px;
            justify-content: center;
            height: 40px;
            margin: 2px;
            text-align: center;
            width: 100%;
            transition: all 0.5s;

            &:hover {
                background-color: #39fc !important;
                cursor: pointer;
                color: #fff;
            }

            &.today {
                background-color: #ccc !important;
                color: #fff;
            }

            &.disabled {
                opacity: 0.3;
                pointer-events: none;
            }

            &.current {
                background-color: #39f !important;
                color: #fff;
            }
        }
    }

    .weekLegend {
        color: #111;
        display: flex;
        flex-direction: row;

        .day {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            justify-content: center;
            font-weight: bold;
            height: 40px;
            text-align: center;
            width: 100%;
            transition: all 0.5s;
        }
    }
}
`;

export default function Calendar({ whenModifyCurrentDate = () => {}, setCurrentVariable = () => {}, title = null }) {
    const [current, setCurrent] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [dayList, setDayList] = useState([]);
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    var weekCount = [ 1, 2, 3, 4, 5, 6, 7 ];
    var weekMonthCount = [ 1, 2, 3, 4, 5, 6 ];
    var compensacao = 0;

    function constructor () {
        if (constructorHasRun) return;
        montarDias();
        setCurrentVariable(mudarDiaAtual);
        setConstructorHasRun(true);
    };

    function proximo(qtd = 1) {
        var curr = current;
        curr.setMonth(curr.getMonth() + qtd)
        setCurrent(curr);
        montarDias();
    }

    function anterior(qtd = 1) {
        var curr = current;
        curr.setMonth(curr.getMonth() - qtd)
        setCurrent(curr);
        montarDias();
    }

    function montarDias() {
        compensacao = 0;
        var lastDay = lastDayOfMonth(current);
        var day = 1;
        var dl = [];
        var primeiroDia = new Date(current.getFullYear(), current.getMonth(), day);
        while (primeiroDia.getDay() !== 0) {
            primeiroDia.setDate(primeiroDia.getDate() - 1);
        }
        while (primeiroDia.getDate() !== 1) {
            dl.push(new Date(primeiroDia.getFullYear(), primeiroDia.getMonth(), primeiroDia.getDate()));
            primeiroDia.setDate(primeiroDia.getDate() + 1)
        }
        while(day <= lastDay) {
            dl.push(new Date(current.getFullYear(), current.getMonth(), day));
            day++;
        }
        var lastDayDate = new Date(current.getFullYear(), current.getMonth(), lastDay);
        lastDayDate.setDate(lastDayDate.getDate() + 1);
        while(lastDayDate.getDay() !== 0) {
            dl.push(new Date(lastDayDate.getFullYear(), lastDayDate.getMonth(), lastDayDate.getDate()));
            lastDayDate.setDate(lastDayDate.getDate() + 1);
        }
        if (dl.length <= 45) {
            dl.push(new Date(lastDayDate.getFullYear(), lastDayDate.getMonth(), lastDayDate.getDate()));
            lastDayDate.setDate(lastDayDate.getDate() + 1);
            while(lastDayDate.getDay() !== 0) {
                dl.push(new Date(lastDayDate.getFullYear(), lastDayDate.getMonth(), lastDayDate.getDate()));
                lastDayDate.setDate(lastDayDate.getDate() + 1);
            }
        }
        setDayList(dl);
    }

    function lastDayOfMonth(date = new Date()) {
        var auxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var currentMonth = auxDate.getMonth();
        var lastDay = auxDate.getDate();

        while(currentMonth === auxDate.getMonth()) {
            auxDate.setDate(auxDate.getDate() + 1);
            if (currentMonth === auxDate.getMonth()) {
                lastDay = auxDate.getDate();
            }
        }
        return lastDay;
    }

    function mudarDiaAtual(data) {
        setSelectedDate(data);
        whenModifyCurrentDate(data);
    }

    function removerDataAtual() {
        setSelectedDate(null);
        whenModifyCurrentDate(null);
    }

    constructor();

    return (
        <AlternativeCalendarStyled className="calendario">
            {title !== null ? 
            <div className="title">
                {title}
            </div> : <></>}
            {selectedDate !== null ? 
            <div className="selectedDate">
                <div className="date" title="Data selecionada">
                    <FontAwesomeIcon icon={faCalendar} />
                    {selectedDate.toLocaleDateString()}
                </div>
                <div className="espacador"></div>
                <ButtonStyled className="transparent noHover" title="Desmarcar data atual" onClick={removerDataAtual}><FontAwesomeIcon icon={faTrash} /></ButtonStyled>
            </div>
            : <></>}
            <div className="commands">
                <button title="Voltar 6 meses" onClick={() => anterior(6)}><FontAwesomeIcon icon={faArrowCircleLeft} /></button>
                <button title="Voltar 1 mês" onClick={() => anterior(1)}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <div className="currentMonth">{(current.getMonth() + 1).toString().padStart(2, '0') + '/' + current.getFullYear()}</div>
                <button title="Avançar 1 mês" onClick={() => proximo(1)}><FontAwesomeIcon icon={faArrowRight} /></button>
                <button title="Avançar 6 meses" onClick={() => proximo(6)}><FontAwesomeIcon icon={faArrowCircleRight} /></button>
            </div>
            <div className="calendarViewer">
                <div className="weekLegend">
                    <div className="day">D</div>
                    <div className="day">S</div>
                    <div className="day">T</div>
                    <div className="day">Q</div>
                    <div className="day">Q</div>
                    <div className="day">S</div>
                    <div className="day">S</div>
                </div>
                {weekMonthCount.map((linha, i) => {
                    return (
                        <div key={i} className="week">
                        {weekCount.map((coluna) => {
                            var index = (((linha - 1) * 7) + coluna) - 1 - (compensacao);
                            if (linha === 1 && dayList[index] !== undefined) {
                                if (coluna === (dayList[index].getDay() + 1)) {
                                    if (dayList[index].getMonth() !== current.getMonth()) {
                                        return (<div key={linha + '-' + coluna} className="day disabled">{dayList[index].getDate()}</div>)
                                    } else {
                                        return (<div key={linha + '-' + coluna} onClick={() => mudarDiaAtual(dayList[index])} className={'day ' + (selectedDate !== null && dayList[index].toLocaleDateString() === selectedDate.toLocaleDateString()?'current':'') + ' ' + (dayList[index].toLocaleDateString() === new Date().toLocaleDateString()?'today':'')}>{dayList[index].getDate()}</div>)
                                    }
                                } else {
                                    compensacao++;
                                    return (<div key={linha + '-' + coluna} className="day disabled"></div>)
                                }
                            } else
                            if (dayList[index] !== undefined) {
                                if (coluna === (dayList[index].getDay() + 1)) {
                                    if (dayList[index].getMonth() !== current.getMonth()) {
                                        return (<div key={linha + '-' + coluna} className="day disabled">{dayList[index].getDate()}</div>)
                                    } else {
                                        return (<div key={linha + '-' + coluna} onClick={() => mudarDiaAtual(dayList[index])} className={'day ' + (selectedDate !== null && dayList[index].toLocaleDateString() === selectedDate.toLocaleDateString()?'current':'') + ' ' + (dayList[index].toLocaleDateString() === new Date().toLocaleDateString()?'today':'')}>{dayList[index].getDate()}</div>)
                                    }
                                }
                            } else {
                                return (dayList[index] !== undefined ? <div key={linha + '-' + coluna} onClick={() => mudarDiaAtual(dayList[index])} className={'day ' + (selectedDate !== null && dayList[index].toLocaleDateString() === selectedDate.toLocaleDateString()?'current':'') + ' ' + (dayList[index].toLocaleDateString() === new Date().toLocaleDateString()?'today':'')}>{dayList[index].getDate()}</div> : <div key={linha + '-' + coluna} className="day disabled"></div>)
                            }
                            return coluna;
                        })}
                        </div>
                )})}
            </div>
        </AlternativeCalendarStyled>
    );
}