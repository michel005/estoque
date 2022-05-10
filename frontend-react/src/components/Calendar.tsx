import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import DateUtils from "../utils/DateUtils";
import ButtonStyled from "./ButtonStyled";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const AlternativeCalendarStyled = styled.div`
overflow: hidden;
width: 200px;

&:hover .inputIcon:hover {
    border: 1px solid #39f;

    button {
        background-color: #39f;
    }
}

.campoLabel {
    display: flex;
    flex-direction: column;

    label {
        font-weight: bold;
        margin-bottom: 4px;
        color: #999;

        .notNullable {
            color: #CCC;
            font-size: 14px;
        }
    }

    input {
        border-radius: 4px 0px 0px 4px;
        border: 0px solid #aaa;
        margin: 0px;
        max-height: 33px;
        outline: none;
        padding: 10px 7px;
        transition: all 0.5s;
        width: 100%;

        &:disabled, &:read-only {
            background-color: #fff;
            cursor: not-allowed;
        }

        &:hover {
            border-color: #666;
        }

        &:focus {
            border-color: #39f;
        }
    }

    .inputIcon {
        display: flex;
        flex-direction: row;
        border-radius: 4px;
        border: 1px solid #aaa;
        overflow: hidden;
        max-height: 35px;
        
        button {
            color: #fff;
            margin-left: -1px;
            border-radius: 0px;

            &:hover {
                background-color: #39f;
            }
        }
    }
}

.commandsAndCalendarViewer {
    display: flex;
    flex-direction: column;
    background-color: #fff3;
    backdrop-filter: blur(15px);
    box-shadow: #3333 0px 0px 7px;
    border-radius: 4px;
    margin-top: 7px;
    position: absolute;
    width: 220px;
    z-index: 100;
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
        font-size: 14px;
        justify-content: center;
        text-align: center;
        height: 29px;
    }
}

.calendarViewer {
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
            height: 30px;
            margin: 2px;
            text-align: center;
            font-size: 12px;
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
            height: 30px;
            text-align: center;
            width: 100%;
            transition: all 0.5s;
        }
    }
}

&.reduzido {
    .calendarViewer {
        display: none;
    }
    .commands {
        display: none;
    }
}
`;

export default function Calendar({title = null, fieldID = null, value = new Date() }: any) {
    const [current, setCurrent] = useState(new Date(value));
    const [selectedDate, setSelectedDate] = useState(new Date(value));
    const [dayList, setDayList] = useState([new Date()]);
    const [focusInput, setFocusInput] = useState(false);

    var weekCount = [ 1, 2, 3, 4, 5, 6, 7 ];
    var weekMonthCount = [ 1, 2, 3, 4, 5, 6 ];
    var compensacao = 0;

    function proximo(qtd = 1) {
        var curr = current;
        if (curr !== null) {
            curr.setMonth(curr.getMonth() + qtd)
            setCurrent(curr);
            montarDias();
        }
    }

    function anterior(qtd = 1) {
        var curr = current;
        if (curr !== null) {
            curr.setMonth(curr.getMonth() - qtd)
            setCurrent(curr);
            montarDias();
        }
    }

    function montarDias() {
        compensacao = 0;
        var lastDay = DateUtils.lastDayOfMonth(current);
        var day = 1;
        var dl: any = [];
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

    function mudarDiaAtual(data: Date) {
        setSelectedDate(data);
        setFocusInput(false);
    }

    function eventoMostrarCalendario() {
        setFocusInput(!focusInput);
        if (focusInput === false) {
            montarDias();
        }
    }

    function mesmoDia(data1: Date, data2: Date) {
        return DateUtils.stringJustDate(data1) === DateUtils.stringJustDate(data2);
    }

    return (
        <AlternativeCalendarStyled className={'calendario ' + (focusInput === true ? '' : 'reduzido' ) }>
            <div className="campoLabel">
                <label>{title}</label>
                <div className="inputIcon">
                    <input type="text" id={fieldID} autoComplete="false" readOnly={true} value={selectedDate === null ? '' : DateUtils.stringJustDate(selectedDate)} />
                    <ButtonStyled onClick={eventoMostrarCalendario}><FontAwesomeIcon icon={solid('calendar-alt')} /></ButtonStyled>
                </div>
            </div>
            <div className="commandsAndCalendarViewer">
                <div className="commands">
                    <button title="Voltar 6 meses" onClick={() => anterior(6)}><FontAwesomeIcon icon={solid('arrow-circle-left')} /></button>
                    <button title="Voltar 1 mês" onClick={() => anterior(1)}><FontAwesomeIcon icon={solid('arrow-left')} /></button>
                    <div className="currentMonth">{(current.getMonth() + 1).toString().padStart(2, '0') + '/' + current.getFullYear()}</div>
                    <button title="Avançar 1 mês" onClick={() => proximo(1)}><FontAwesomeIcon icon={solid('arrow-right')} /></button>
                    <button title="Avançar 6 meses" onClick={() => proximo(6)}><FontAwesomeIcon icon={solid('arrow-circle-right')} /></button>
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
                                            return (<div key={linha + '-' + coluna} onClick={() => mudarDiaAtual(dayList[index])} className={'day ' + (selectedDate !== null && mesmoDia(dayList[index], selectedDate)?'current':'') + ' ' + (dayList[index].toLocaleDateString() === new Date().toLocaleDateString()?'today':'')}>{dayList[index].getDate()}</div>)
                                        }
                                    } else {
                                        compensacao++;
                                        return (<div key={linha + '-' + coluna} className="day disabled"></div>)
                                    }
                                } else
                                if (dayList[index] !== undefined) {
                                    if (coluna === (dayList[index].getDay() + 1)) {
                                        if (dayList[index].getMonth() !== current.getMonth() || dayList[index].getFullYear() !== current.getFullYear()) {
                                            return (<div key={linha + '-' + coluna} className="day disabled">{dayList[index].getDate()}</div>)
                                        } else {
                                            return (<div key={linha + '-' + coluna} onClick={() => mudarDiaAtual(dayList[index])} className={'day ' + (selectedDate !== null && mesmoDia(dayList[index], selectedDate)?'current':'') + ' ' + (dayList[index].toLocaleDateString() === new Date().toLocaleDateString()?'today':'')}>{dayList[index].getDate()}</div>)
                                        }
                                    }
                                } else {
                                    return (dayList[index] !== undefined ? <div key={linha + '-' + coluna} onClick={() => mudarDiaAtual(dayList[index])} className={'day ' + (selectedDate !== null && mesmoDia(dayList[index], selectedDate)?'current':'') + ' ' + (dayList[index].toLocaleDateString() === new Date().toLocaleDateString()?'today':'')}>{dayList[index].getDate()}</div> : <div key={linha + '-' + coluna} className="day disabled"></div>)
                                }
                                return coluna;
                            })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </AlternativeCalendarStyled>
    );
}