import { faChevronDown, faPencilAlt, faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import ButtonStyled from "./ButtonStyled";
import ConvertUtils from "../utils/ConvertUtils";
import TextField from "./forms/TextField";

const Style = styled.div`
display: flex;
flex-direction: column;

.linha {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: all 0.25s;
    border: 2px solid #fff;
    z-index: 10;

    &:hover {
        border: 2px solid #39f;
        background-color: #f4f4f4;
    }

    &.nohover, &.nohover:hover {
        background-color: transparent;
        border: 2px solid transparent;
    }

    &.empty {
        border: 2px solid transparent;
        background-color: #fff;
    }

    .linhaInterna {
        display: flex;
        flex-direction: row;
        flex-flow: row;
        width: 100%;
        transition: all 0.25s;

        .coluna {
            color: #999;
            display: flex;
            flex-direction: row;
            text-align: left;
            padding: 14px;
            flex-grow: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            word-break: break-all;
            width: 100%;

            &.align.right {
                text-align: right;
                justify-content: flex-end;
            }

            &.comandoslinha {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                width: 70px;

                .opcoesNotificacao {
                    display: none;
                }

                .botaoSelecionar {
                    color: #999;
                    transition: all 0.25s;

                    &.selecionado {
                        transform: rotate(180deg);
                    }
                }
            }
        }

        &.cabecalho {
            background-color: transparent;

            .coluna {
                color: #666;
                font-weight: bold;
                transition: all 0.25s;

                .orderBy {
                    margin-left: 4px;
                    transition: all 0.25s;

                    &.orderByDesc {
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }

    .detalhes {
        background-color: #f4f4f4;
        padding: 0px 14px 14px;

        .separador {
            display: flex;
            flex-direction: row;
            margin-top: 14px;
            margin-bottom: 14px;
            width: 100%;

            .tituloSeparador {
                color: #aaa;
                font-weight: bold;
                font-size: 20px;
                display: flex;
                margin-right: 14px;
                width: auto;
            }

            .barraSeparador {
                display: flex;
                background-color: #ddd;
                height: 2px;
                flex-grow: 1;
                transform: translateY(15px);
            }
        }

        .linhaDetalhe {
            display: flex;
            flex-direction: row;

            .campo {
                flex-grow: 1;
                margin-bottom: 14px;
                width: 25%;
            }
        }
    }

    &.selecionado {
        z-index: 25;
        border: 2px solid #39f;

        .linhaInterna {
            background-color: #f4f4f4;

            .coluna {
                display: none;
            }

            .coluna.titleColumn {
                color: #3339;
                display: flex;
                font-size: 30px;
                flex-grow: 1;
            }

            .comandoslinha {
                display: flex;
                width: auto;
                
                .opcoesNotificacao {
                    background-color: transparent;
                    backdrop-filter: unset;
                    padding: 0px;
                    display: flex;
                    flex-direction: row;
                    margin-right: 14px;
                    transform: none;
                    position: static;
                    transition: none;

                    button {
                        background-color: transparent;
                        width: 100px;
                        padding: 0px;
                        color: #3339;
                        font-size: 18px;
                        width: auto;
                        margin-right: 14px;
                        transition: none;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;

                        &:hover {
                            background-color: transparent;
                            color: #39f;
                        }
                    }
                }

                .botaoSelecionar {
                    color: #999;
                    transition: all 0.25s;
                    margin-right: 4px;

                    &.selecionado {
                        transform: rotate(180deg);
                    }
                }

                .botaoSelecionar {
                    height: 100%;
                }
            }
        }
    }
}

@media print {
    .linha {
        display: none;
    }

    .linha.selecionado {
        box-shadow: none;
        display: flex;

        .coluna {
            display: none;
        }

        .coluna.titleColumn {
            display: flex;
            font-weight: bold;
            font-size: 36px;
        }

        .comandosLinha {
            display: none;
        }
    }
}
`;

export default function ListaComponent({ data = [], columnMapper = null, detailMapper = null, events = null }) {
    const [selecionado, setSelecionado] = useState(null);
    const moneyFormater = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    function selecionar(value) {
        setSelecionado(selecionado === null || selecionado.id !== value.id ? value : null);
    }

    function columnStyles(dadosLinha) {
        var st = (columnMapper[dadosLinha].align !== undefined ? ' align ' + columnMapper[dadosLinha].align : '');
        st += (columnMapper[dadosLinha].style !== undefined ? ' ' + columnMapper[dadosLinha].style + ' ' : '');
        st += (columnMapper[dadosLinha].titleColumn !== undefined && columnMapper[dadosLinha].titleColumn === true ? ' titleColumn ' : '');
        return st;
    }

    function valueModifier(linha, dadosLinha) {
        var value = linha[dadosLinha];
        if (columnMapper[dadosLinha].getValue !== undefined) {
            value = columnMapper[dadosLinha].getValue(linha);
        }
        if (value === undefined || value === null) {
            return 'Não informado';
        }
        if (columnMapper[dadosLinha].money !== undefined) {
            return moneyFormater.format(value);
        }
        if (columnMapper[dadosLinha].convert !== undefined) {
            return ConvertUtils.listOnText(columnMapper[dadosLinha].convert, value);
        }
        return value;
    }

    function imprimir(value) {
        if (events !== null && events.print !== undefined && events.print !== null) {
            events.print(value);
        }
    }

    function mostrarFormularioAlterar(value) {
        if (events !== null && events.update !== undefined && events.update !== null) {
            events.update(value);
        }
    }

    function mostrarFormularioExclusao(value) {
        if (events !== null && events.delete !== undefined && events.delete !== null) {
            events.delete(value);
        }
    }

    return (
        <Style>

            <div className="linha nohover">
                <div className="linhaInterna cabecalho">
                    {
                        Object.keys(columnMapper).map((value, index) => {
                            if (columnMapper[value].visible === undefined || columnMapper[value].visible === true) {
                                return (
                                    <div key={index} className={'coluna ' + columnStyles(value) + ' ' + value}>{columnMapper[value].name}</div>
                                );
                            } else {
                                return ( <></> );
                            }
                        })
                    }
                    <div className="coluna comandoslinha"></div>
                </div>
            </div>
            {
                data.map((linha, idx) => {
                    return (
                        <div key={idx} className={'linha ' + (selecionado !== null && selecionado.id === linha.id ? 'selecionado' : '')}>
                            <div className="linhaInterna">
                                {
                                    Object.keys(columnMapper).filter((dadosLinha) => dadosLinha !== 'requestData').map((dadosLinha, indexLinha) => {
                                        if (columnMapper[dadosLinha].visible === undefined || columnMapper[dadosLinha].visible === true) {
                                            return (
                                                <div key={indexLinha} className={'coluna' + columnStyles(dadosLinha) + ' ' + dadosLinha}>{valueModifier(linha, dadosLinha)}</div>
                                            );
                                        } else {
                                            return ( <></> );
                                        }
                                    })
                                }
                                <div className="coluna comandoslinha">
                                    <div className="opcoesNotificacao">
                                        <ButtonStyled title="Imprimir" onClick={() => imprimir()}><FontAwesomeIcon icon={faPrint} /></ButtonStyled>
                                        <ButtonStyled title="Alterar" onClick={() => mostrarFormularioAlterar(linha.requestData !== undefined ? linha.requestData : linha)}><FontAwesomeIcon icon={faPencilAlt} /></ButtonStyled>
                                        <ButtonStyled title="Excluir" onClick={() => mostrarFormularioExclusao(linha.requestData !== undefined ? linha.requestData : linha)}><FontAwesomeIcon icon={faTrash} /></ButtonStyled>
                                    </div>
                                    {detailMapper !== null ? 
                                    <ButtonStyled title="Mostrar detalhes" className={'botaoSelecionar link ' + (selecionado !== null && selecionado.id === linha.id ? 'selecionado' : '')} onClick={() => selecionar(linha)}>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </ButtonStyled> : <></> }
                                </div>
                            </div>
                            {detailMapper !== null && selecionado !== null && selecionado.id === linha.id ?
                            <div className="detalhes">
                                {
                                    Object.keys(detailMapper).map((detField, idx1) => {
                                        if (detailMapper[detField].title !== undefined) {
                                            return (
                                                <div key={idx1} className="separador">
                                                    <div className="tituloSeparador">{detailMapper[detField].title}</div>
                                                    <div className="barraSeparador"></div>
                                                </div>
                                            );
                                        } else
                                        if (detailMapper[detField].fields !== undefined) {
                                            return (
                                                <div key={idx1} className="linhaDetalhe">
                                                    {
                                                        detailMapper[detField].fields.map((field, idx2) => {
                                                            if (field !== '') {
                                                                return (
                                                                    <TextField key={idx2} readonlyIcon={columnMapper[field].icon !== undefined ? <FontAwesomeIcon icon={columnMapper[field].icon} /> : ''} readonly={true} label={columnMapper[field].nameDesc !== undefined ? columnMapper[field].nameDesc : columnMapper[field].name} defaultValue={valueModifier(linha, field)} />
                                                                );
                                                            } else {
                                                                return (
                                                                    <div className="campo"></div>
                                                                );
                                                            }
                                                        })
                                                    }
                                                </div>
                                            );
                                        } else {
                                            return ( <></> );
                                        }
                                    })
                                }
                            </div>
                            :<></>}
                        </div>
                    );
                })
            }
            {
                data.length === 0 ?
                <div>
                    <div className='linha empty'>
                        <div className="linhaInterna">
                            <div className="coluna">Nenhum registro encontrado</div>
                        </div>
                    </div>
                </div>
                :<></>
            }
        </Style>
    );
}