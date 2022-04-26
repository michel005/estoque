import { connect } from "react-redux";
import styled from "styled-components";
import EntradaAction from "../../actions/EntradaAction";
import Calendar from "../../components/Calendar";
import store from "../../store";
import ButtonStyled from "../../components/ButtonStyled";
import TextField from "../../components/forms/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faCalendar, faChevronDown, faDollarSign, faFastBackward, faFastForward, faFile, faForward, faList, faMagic, faMoneyBill, faMoneyBillWave, faMoneyCheck, faPencilAlt, faPrint, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import TableStyled from "../../components/TableStyled";
import ConvertUtils from "../../utils/ConvertUtils";

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

        .calendario {
            width: 220px;
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

                &.grow2 {
                    flex-grow: 2;
                }

                &.id {
                    width: 80px;
                }

                &.descricao {
                    flex-grow: 1;
                    font-weight: bold;
                }

                &.fornecedor {
                    width: 280px;
                }

                &.quantidade {
                    width: 130px;
                }

                &.status {
                    width: 130px;
                }

                &.somaValor {
                    justify-content: flex-end;
                    width: 180px;
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

                .campo, table {
                    flex-grow: 1;
                    margin-right: 14px;
                    margin-bottom: 14px;
                    width: 25%;

                    &:last-child {
                        margin-right: 0px;
                    }
                }

                table {
                    box-shadow: #3333 0px 0px 7px;
                }
            }
        }

        &.selecionado {
            border: 2px solid #39f;

            .detalhes {
                padding-bottom: 0px;
            }

            .linha {
                background-color: #f4f4f4;

                .coluna {
                    display: none;
                }

                .coluna.descricao {
                    color: #3339;
                    display: flex;
                    font-size: 24px;
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

.colunaItem {
    width: 60%;
}

.colunaQuantidade {
    text-align: center;
    width: 20%;
}

.colunaComando {
    text-align: right;
    width: 20%;
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
    const moneyFormater = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const tipoPessoaType = { F: 'Física', J: 'Jurídica' };
    const statusType = { PENDENTE: 'Pendente', APROVADO: 'Aprovado', CANCELADO: 'Cancelado' };
    const [selecionado, setSelecionado] = useState(null);
    const [mostrarMenu, setMostrarMenu] = useState(null);

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Entradas';
        atualizar();
        setConstructorHasRun(true);
    };

    function atualizar() {
        setSelecionado(null);
        setMostrarMenu(null);
        store.dispatch(EntradaAction.buscarTodos());
    }

    function afterUpdateCurrentDate(date) {
        store.dispatch(EntradaAction.preencherDataAtual(date));
        atualizar();
    }

    function selecionar(ent) {
        setSelecionado(selecionado === null || selecionado.eventoEntrada.id !== ent.eventoEntrada.id ? ent : null);
        setMostrarMenu(null);
    }

    function eventoMostrarMenu(ent) {
        setMostrarMenu(mostrarMenu === null || mostrarMenu.eventoEntrada.id !== ent.eventoEntrada.id ? ent : null);
    }

    function mostrarFormularioAlterar(ent) {
        store.dispatch(EntradaAction.statusAlterar(ent.eventoEntrada.id));
    }

    function mostrarFormularioExclusao(ent) {
        store.dispatch(EntradaAction.statusExcluir(ent));
    }

    function imprimir(ent) {
        eventoMostrarMenu(ent);
        if (selecionado === null || selecionado.eventoEntrada.id !== ent.eventoEntrada.id) {
            selecionar(ent); 
        }
        setTimeout(() => {
            window.print();
        }, 100)
    }

    function buscarPagina(pagina) {
        store.dispatch(EntradaAction.buscarPagina({
            pagina: pagina
        }));
    }

    constructor();

    return (
        <EntradaPageStyled>
            <div className="filtros">
                <div className="linha">
                    <Calendar title="Data Base" fieldID="filtroDataBase" value={entrada.dataAtual} afterUpdateCurrentDate={afterUpdateCurrentDate} />
                    <div className="comandos">
                        <div className="botoes">
                            <ButtonStyled title="Buscar" className="primary" onClick={() => atualizar()}>Atualizar</ButtonStyled>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lista">
                <div className="entrada nohover">
                    <div className="linha cabecalho">
                        <div className="coluna id">#</div>
                        <div className="coluna descricao">Descrição</div>
                        <div className="coluna fornecedor">Fornecedor</div>
                        <div className="coluna status">Situação</div>
                        <div className="coluna quantidade">Quantidade</div>
                        <div className="coluna somaValor">Valor Total</div>
                        <div className="coluna comandoslinha"></div>
                    </div>
                </div>
                {
                    entrada.list.map((value, index) => {
                        return (
                            <div className={'entrada ' + (selecionado !== null && selecionado.eventoEntrada.id === value.eventoEntrada.id ? 'selecionado' : '')} key={index}>
                                <div className="linha">
                                    <div className="coluna id">{value.eventoEntrada.id}</div>
                                    <div className="coluna descricao">{value.eventoEntrada.descricao}</div>
                                    <div className="coluna fornecedor">{value.eventoEntrada.fornecedor !== null ? value.eventoEntrada.fornecedor.nome : 'Fornecedor não informado'}</div>
                                    <div className="coluna status">{ConvertUtils.listOnText(statusType, value.eventoEntrada.status)}</div>
                                    <div className="coluna quantidade">{value.itens.map(e => e.quantidade).reduce((prev, curr) => prev + curr, 0)}</div>
                                    <div className="coluna somaValor">{moneyFormater.format(value.itens.map(e => e.valor).reduce((prev, curr) => prev + curr, 0))}</div>
                                    <div className="coluna comandoslinha">
                                        <div className="opcoesNotificacao">
                                            <ButtonStyled title="Imprimir" onClick={() => imprimir(value)}><FontAwesomeIcon icon={faPrint} /></ButtonStyled>
                                            <ButtonStyled title="Alterar" onClick={() => mostrarFormularioAlterar(value)}><FontAwesomeIcon icon={faPencilAlt} /></ButtonStyled>
                                            <ButtonStyled title="Excluir" onClick={() => mostrarFormularioExclusao(value)}><FontAwesomeIcon icon={faTrash} /></ButtonStyled>
                                        </div>
                                        <ButtonStyled title="Mostrar detalhes" className={'botaoSelecionar link ' + (selecionado !== null && selecionado.eventoEntrada.id === value.eventoEntrada.id ? 'selecionado' : '')} onClick={() => selecionar(value)}>
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        </ButtonStyled>
                                    </div>
                                </div>
                                {selecionado !== null && selecionado.eventoEntrada.id === value.eventoEntrada.id ?
                                <div className="detalhes">
                                    <div className="separador">
                                        <div className="tituloSeparador">Dados gerais</div>
                                        <div className="barraSeparador"></div>
                                    </div>
                                    <div className="linhaDetalhe">
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faFile} />} readonly={true} label="Descrição" defaultValue={value.eventoEntrada.descricao} />
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faCalendar} />} readonly={true} label="Data de Entrada" defaultValue={value.eventoEntrada.dataEntrada} />
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faFile} />} readonly={true} label="Situação" defaultValue={ConvertUtils.listOnText(statusType, value.eventoEntrada.status)} />
                                    </div>
                                    {value.eventoEntrada.fornecedor !== null ?
                                    <>
                                        <div className="separador">
                                            <div className="tituloSeparador">Fornecedor</div>
                                            <div className="barraSeparador"></div>
                                        </div>
                                        <div className="linhaDetalhe">
                                            <TextField readonlyIcon={<FontAwesomeIcon icon={faFile} />} readonly={true} label="Nome Completo" defaultValue={value.eventoEntrada.fornecedor.nome} />
                                            <TextField readonlyIcon={<FontAwesomeIcon icon={faCalendar} />} readonly={true} label="Tipo Pessoa" defaultValue={ConvertUtils.listOnText(tipoPessoaType, value.eventoEntrada.fornecedor.tipoPessoa)} />
                                            <TextField readonlyIcon={<FontAwesomeIcon icon={faCalendar} />} readonly={true} label="CPF/CNPJ" defaultValue={value.eventoEntrada.fornecedor.cpfCnpj} />
                                        </div>
                                    </>:
                                    <div className="linhaDetalhe">
                                        {value.eventoEntrada.fornecedor !== null ? <div className="campo"></div> : 
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faUser} />} readonly={true} label="Fornecedor" defaultValue='Não informado' />}
                                    </div>}
                                    <div className="separador">
                                        <div className="tituloSeparador">Itens</div>
                                        <div className="barraSeparador"></div>
                                    </div>
                                    <div className="linhaDetalhe">
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faList} />} readonly={true} label="Total de Itens" defaultValue={value.itens.length} />
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faMagic} />} readonly={true} label="Quantidade Total" defaultValue={value.itens.map(e => e.quantidade).reduce((prev, curr) => prev + curr, 0)} />
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faMoneyBillWave} />} readonly={true} label="Valor Total" defaultValue={moneyFormater.format(value.itens.map(e => e.valor).reduce((prev, curr) => prev + curr, 0))} />
                                    </div>
                                </div>:<></>}
                            </div>
                        );
                    })
                }
                {
                    entrada.dataAtual === null ?
                    <div className='entrada'>
                        <div className="linha">
                            <div className="coluna grow2">
                                Informe uma Data Base para prosseguir
                            </div>
                        </div>
                    </div>
                    :
                    entrada.list.length === 0 ?
                    <div className='entrada'>
                        <div className="linha">
                            <div className="coluna">
                                Nenhum registro encontrado
                            </div>
                        </div>
                    </div>
                    : <></>
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