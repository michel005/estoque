import { connect } from "react-redux";
import styled from "styled-components";
import EntradaAction from "../../actions/EntradaAction";
import Calendar from "../../components/Calendar";
import SelectField from "../../components/forms/SelectField";
import Message from "../../components/Message";
import store from "../../store";
import ButtonStyled from "../../components/ButtonStyled";
import EntradaActionTypes from "../../constants/EntradaActionTypes";
import TextField from "../../components/forms/TextField";
import JanelaStyled from "../../components/JanelaStyled";
import ChoiceMessage from "../../components/ChoiceMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faBackward, faEraser, faFastBackward, faFastForward, faForward, faPen, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LightTableStyled from "../../components/LightTableStyled";
import DateUtils from "../../utils/DateUtils";

const EntradaPageStyled = styled.div`
width: 100%;

.filtros {
    display: flex;
    flex-direction: column;
    margin-bottom: 21px;

    .linha {
        display: flex;
        flex-direction: row;

        .campo, .calendario {
            margin-right: 14px;
            width: 100%;
        }

        .comandos {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            margin-right: 0px;
            width: auto;

            .botoes {
                display: flex;
                flex-direction: row;

                button {
                    min-width: 40px;
                    border-radius: 0px;

                    &:first-child {
                        border-top-left-radius: 4px;
                        border-bottom-left-radius: 4px;
                    }

                    &:last-child {
                        border-top-right-radius: 4px;
                        border-bottom-right-radius: 4px;
                    }
                }
            }
        }
    }
}

.lista {
    .entrada {
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

        .linha {
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
                width: calc((100% - 80px) / 4);
                overflow: hidden;
                text-overflow: ellipsis;
                word-wrap: break-word;
                word-break: break-all;

                &.id {
                    width: 80px;
                }

                &.descricao {
                    flex-grow: 1;
                }

                &.fornecedor {
                    width: 280px;
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
                    cursor: pointer;
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
            transform: scale(102.5%);
            z-index: 25;
            border: 2px solid #39f;

            .linha {
                background-color: #f4f4f4;

                .coluna {
                    display: none;
                }

                .coluna.nome {
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
}

.paginacao {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    padding: 14px;
    background-color: #fff;

    button {
        margin-right: 7px;

        &:last-child {
            margin-right: 0px;
        }

        &:disabled {
            opacity: 0.2;
        }
    }
}

@media print {
    .filtros, .comandoslinha {
        display: none;
    }

    .lista .entrada {
        display: none;
    }

    .lista .entrada.selecionado {
        box-shadow: none;
        display: flex;

        .coluna {
            display: none;
        }

        .coluna.nome {
            display: flex;
            font-weight: bold;
            font-size: 36px;
        }
    }

    .paginacao {
        display: none;
    }
}
`;

function EntradaPage({ entrada }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [sortType, setSortType] = useState({field: 'descricao', direction: 'asc'});

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Entradas';
        atualizar();
        setConstructorHasRun(true);
    };

    function atualizar() {
        if (document.getElementById('filtroDataBase') !== null && document.getElementById('filtroDataBase').value !== '') {
            store.dispatch(EntradaAction.atualizarData(DateUtils.stringToDate(document.getElementById('filtroDataBase').value)));
            store.dispatch(EntradaAction.buscarTodos(DateUtils.stringToDate(document.getElementById('filtroDataBase').value)));
        } else {
            store.dispatch(EntradaAction.statusOcioso());
        }
    }

    function limpar() {
        document.getElementById('filtroDataBase').value = '';
        document.getElementById('filtroDescricao').value = '';
    }

    function buscarPagina(pagina) {
        store.dispatch(EntradaAction.buscarPagina({
            pagina: pagina
        }));
    }

    function order(field) {
        if (sortType.field === field) {
            return (<div className={'orderBy ' + (sortType.direction === 'desc' ? 'orderByDesc' : '')}><FontAwesomeIcon icon={faArrowDown} /></div>);
        }
        return <></>;
    }

    function mudarOrder(fd) {
        var dir = ( sortType.field === fd ) ? ( sortType.direction === 'asc' ? 'desc' : 'asc' ) : 'asc';
        setSortType({field: fd, direction: dir });
        atualizar({field: fd, direction: dir });
    }

    constructor();

    return (
        <EntradaPageStyled>
            <div className="filtros">
                <div className="linha">
                    <TextField label="Data Base" fieldID="filtroDataBase" />
                    <TextField label="Descrição" fieldID="filtroDescricao" />
                    <div className="comandos">
                        <div className="botoes">
                            <ButtonStyled title="Buscar" className="primary" onClick={() => atualizar()}><FontAwesomeIcon icon={faSearch} /></ButtonStyled>
                            <ButtonStyled title="Limpar filtros" onClick={() => limpar()}><FontAwesomeIcon icon={faEraser} /></ButtonStyled>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lista">
                <div className="entrada nohover">
                    <div className="linha cabecalho">
                        <div className="coluna id" onClick={() => mudarOrder('id')}># {order('id')}</div>
                        <div className="coluna descricao" onClick={() => mudarOrder('descricao')}>Descrição {order('descricao')}</div>
                        <div className="coluna fornecedor" onClick={() => mudarOrder('fornecedor')}>Fornecedor {order('fornecedor')}</div>
                        <div className="coluna comandoslinha"></div>
                    </div>
                </div>
                {
                    entrada.list.map((value, index) => {
                        return (
                            <div className="entrada" key={index}>
                                <div className="linha">
                                    <div className="coluna id">{value.id}</div>
                                    <div className="coluna descricao">{value.descricao}</div>
                                    <div className="coluna fornecedor">{value.fornecedor !== null ? value.fornecedor.nome : ''}</div>
                                    <div className="coluna comandoslinha"></div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className="paginacao">
                <ButtonStyled className="transparent" disabled={entrada.page <= 0} onClick={() => buscarPagina(0)}><FontAwesomeIcon icon={faFastBackward} /></ButtonStyled>
                <ButtonStyled className="transparent" disabled={entrada.page <= 0} onClick={() => buscarPagina(entrada.page - 1)}><FontAwesomeIcon icon={faBackward} /></ButtonStyled>
                {entrada.pageInfo.length === 0 ? <ButtonStyled className="nohover transparent">0</ButtonStyled> : <ButtonStyled className="nohover transparent">Página {entrada.page + 1} de { entrada.pageInfo.length }</ButtonStyled> }
                <ButtonStyled className="transparent" disabled={((entrada.page + 1) === entrada.pageInfo.length) || entrada.pageInfo.length === 0} onClick={() => buscarPagina(entrada.page + 1)}><FontAwesomeIcon icon={faForward} /></ButtonStyled>
                <ButtonStyled className="transparent" disabled={((entrada.page + 1) === entrada.pageInfo.length) || entrada.pageInfo.length === 0} onClick={() => buscarPagina(entrada.pageInfo.length - 1)}><FontAwesomeIcon icon={faFastForward} /></ButtonStyled>
            </div>
        </EntradaPageStyled>
    );
};

const EntradaPageConnected = connect((state) => { 
    return {
        entrada: state.entrada
    }
 })(EntradaPage);

 export default EntradaPageConnected;