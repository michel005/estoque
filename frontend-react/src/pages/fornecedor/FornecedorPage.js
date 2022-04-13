import { connect } from "react-redux";
import store from "../../store";
import styled from "styled-components";
import FornecedorActionTypes from '../../constants/FornecedorActionTypes';
import { useState } from "react";
import FornecedorAction from "../../actions/FornecedorAction";
import TextField from "../../components/forms/TextField";
import SelectField from "../../components/forms/SelectField";
import ButtonStyled from "../../components/ButtonStyled";
import ChoiceMessage from "../../components/ChoiceMessage";
import Message from "../../components/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faAudioDescription, faCarSide, faCommentDots, faEllipsisH, faEllipsisV, faFile, faFlag, faIdBadge, faIdCard, faLocationArrow, faMailBulk, faMap, faMapSigns, faPhone, faSortNumericDown, faStreetView, faSuitcaseRolling, faTransgender, faUser } from "@fortawesome/free-solid-svg-icons";
import ButtonOptions from "../../components/forms/ButtonOptions";

const FornecedorPageStyled = styled.div`
    width: 100%;

    .filtros {
        display: flex;
        flex-direction: column;
        margin-bottom: 14px;

        .linha {
            display: flex;
            flex-direction: row;

            & > * {
                margin-right: 14px;
                width: 100%;
            }

            &.noFullWidth {
                & > * {
                    width: auto;
                }
            }

            .filtroNome {
                width: 60%;
            }

            .filtroCpfCnpj {
                width: 250px;
            }

            .comandos {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                margin-right: 0px;
                width: auto;

                div {
                    display: flex;
                    flex-direction: row;

                    button {
                        margin-right: 7px;

                        &:last-child {
                            margin-right: 0px;
                        }
                    }
                }
            }
        }

        & > * {
            margin-bottom: 7px;
        }
    }

    .lista {
        margin-bottom: 14px;

        .fornecedor {
            background-color: #fff;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            margin-bottom: 7px;
            transition: all 0.25s;
            overflow: hidden;

            &:hover, &.nohover {
                box-shadow: #3333 0px 0px 7px;

                .nome button {
                    color: #000;
                }
            }

            .linha {
                padding: 14px 21px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
            }

            .separador {
                display: flex;
                flex-direction: row;
                margin-top: 14px;
                margin-bottom: 21px;

                &:first-child {
                    margin-top: 7px;
                }

                .titulo {
                    color: #aaa;
                    font-weight: bold;
                    font-size: 20px;
                    white-space: nowrap;
                }

                .barra {
                    background-color: #ddd;
                    flex-grow: 1;
                    height: 2px;
                    width: 100%;
                    margin-top: 15px;
                    margin-left: 14px;
                }
            }

            .nome button {
                color: #999;
                cursor: pointer;
                transition: all 0.25s;
            }

            .email {
                color: #ccc;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                margin-left: 7px;
                margin-bottom: 2px;
                flex-grow: 1;
            }

            .botaoDetalhes {
                margin-left: 14px;

                .opcoesNotificacao {
                    background-color: #3339;
                    border-radius: 4px;
                    box-shadow: #3333 0px 0px 7px;
                    display: flex;
                    opacity: 0;
                    flex-direction: column;
                    position: fixed;
                    width: 100px;
                    transition: all 0.25s;
                    transform: translate(-40%, -30%) scale(0);
                    overflow: hidden;
                    z-index: 1;

                    button {
                        background-color: transparent;
                        color: #fff;
                        border-radius: 0px;

                        &:hover {
                            color: #fff;
                            background-color: #3339;
                        }
                    }
                }

                &:hover {
                    .opcoesNotificacao {
                        transform: translate(-50px, 0px) scale(1);
                        display: flex;
                        z-index: 100;
                        opacity: 1;
                    }
                }

                button {
                    color: #aaa;

                    &:hover {
                        color: #666;
                    }
                }
            }

            .detalhes {
                border: 1px solid #ccc;
                border-width: 1px 0px 0px 0px;
                background-color: #f3f3f3;
                padding: 14px 21px;
                width: 100%;

                .campo {
                    margin-bottom: 14px;
                }

                .linha {
                    padding: 0px;
                    display: flex;
                    flex-direction: row;
                    
                    .campo {
                        width: 100%;
                        margin-right: 14px;

                        &:last-child {
                            margin-right: 0px;
                        }
                    }
                }
            }
        }
    }

    .paginacao {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;

        button {
            margin-right: 7px;
        }
    }

    @media print {
        .filtros {
            display: none;
        }

        .lista .fornecedor {
            display: none;
        }

        .lista .fornecedor.nohover {
            display: flex;
        }

        .paginacao {
            display: none;
        }
    }
`;

function FornecedorPage({ fornecedor }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [selecionado, setSelecionado] = useState(null);
    const tipoPessoaType = [ {text: 'Física', value: 'F'}, {text: 'Jurídica', value: 'J'} ];
    const tipoPessoaWithNullType = [ ...tipoPessoaType, {text: 'Ambas', value: ''} ];

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Fornecedores';
        atualizar();
        setConstructorHasRun(true);
    }
    
    function atualizar() {
        setSelecionado(null);
        store.dispatch(FornecedorAction.buscarTodos({
            nome: document.getElementById('filtroNome') ? document.getElementById('filtroNome').value : '',
            tipoPessoa: document.getElementById('filtroTipoPessoa') ? document.getElementById('filtroTipoPessoa').value : '',
            cpfCnpj: document.getElementById('filtroCpfCnpj') ? document.getElementById('filtroCpfCnpj').value : ''
        }));
    }

    function selecionar(forn) {
        setSelecionado(selecionado === null || selecionado.id !== forn.id ? forn : null);
    }

    function buscarPagina(pagina) {
        store.dispatch(FornecedorAction.buscarPagina({
            pagina: pagina
        }));
    }

    function limpar() {
        document.getElementById('filtroNome').value = '';
        document.getElementById('filtroTipoPessoa').value = '';
        document.getElementById('filtroCpfCnpj').value = '';
    }

    constructor();

    return (
        <FornecedorPageStyled>
            <div className="filtros">
                <div className="linha noFullWidth">
                    <TextField fieldID="filtroNome" label="Nome" placeholder="Ex: %da Silva%" />
                    <TextField fieldID="filtroCpfCnpj" label="CPF/CNPJ" placeholder="Sem pontuação" />
                    <ButtonOptions fieldID="filtroTipoPessoa" label="Tipo Pessoa" list={tipoPessoaWithNullType} />
                    <div className="comandos">
                        <div>
                            <ButtonStyled onClick={atualizar} className="primary">Buscar</ButtonStyled>
                            <ButtonStyled onClick={limpar}>Limpar</ButtonStyled>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lista">
                {fornecedor.list.map((value, index) => {
                    return (
                        <div className={'fornecedor ' + (selecionado !== null && selecionado.id === value.id ? 'nohover' : '')} key={index}>
                            <div className="linha">
                                <div className="nome" onClick={() => selecionar(value)}>
                                    <ButtonStyled className="link">{value.nome}</ButtonStyled>
                                </div>
                                <div className="email">{value.email === '' ? 'Sem e-mail' : value.email}</div>
                                <div className="botaoDetalhes">
                                    <ButtonStyled title="Detalhes" className="link"><FontAwesomeIcon icon={faEllipsisV} /></ButtonStyled>
                                    <div className="opcoesNotificacao">
                                        <ButtonStyled>Imprimir</ButtonStyled>
                                        <ButtonStyled>Alterar</ButtonStyled>
                                        <ButtonStyled>Excluir</ButtonStyled>
                                    </div>
                                </div>
                            </div>
                            {selecionado !== null && selecionado.id === value.id ?
                            <div className="detalhes">
                                <div className="separador">
                                    <div className="titulo">Dados pessoais</div>
                                    <div className="barra"></div>
                                </div>
                                <div className="linha">
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faUser} />} readonly={true} label="Nome" defaultValue={value.nome} />
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faIdBadge} />} readonly={true} label="Tipo Pessoa" defaultValue={value.tipoPessoa} convertValueToText={tipoPessoaType} />
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faIdCard} />} readonly={true} label="CPF/CNPJ" defaultValue={value.cpfCnpj} />
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faPhone} />} readonly={true} label="Telefone" defaultValue={value.telefone === null ? 'Sem telefone' : value.telefone} />
                                </div>
                                <div className="linha">
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faMailBulk} />} readonly={true} label="E-mail" defaultValue={value.email === '' ? 'Sem e-mail' : value.email} />
                                    <div className="campo"></div>
                                </div>
                                <div className="separador">
                                    <div className="titulo">Endereço</div>
                                    <div className="barra"></div>
                                </div>
                                <div className="linha">
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faLocationArrow} />} readonly={true} label="Cidade" defaultValue={value.cidade === null ? 'Sem cidade' : value.cidade} />
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faSuitcaseRolling} />} readonly={true} label="Estado" defaultValue={value.estado === null ? 'Sem estado' : value.estado} />
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faFlag} />} readonly={true} label="País" defaultValue={value.pais === null ? 'Sem país' : value.pais} />
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faMapSigns} />} readonly={true} label="CEP" defaultValue={value.cep === null ? 'Sem CEP' : value.cep} />
                                </div>
                                <div className="linha">
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faStreetView} />} readonly={true} label="Rua" defaultValue={value.rua === null ? 'Sem rua' : value.rua} />
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faSortNumericDown} />} readonly={true} label="Número" defaultValue={value.numero === null ? 'Sem número' : value.numero} />
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faMap} />} readonly={true} label="Bairro" defaultValue={value.bairro === null ? 'Sem bairro' : value.bairro} />
                                    <TextField readonlyIcon={<FontAwesomeIcon icon={faFile} />} readonly={true} label="Complemento" defaultValue={value.complemento === null ? 'Sem complemento' : value.complemento} />
                                </div>
                            </div>:<></>}
                        </div>
                    );
                })}
            </div>
            <div className="paginacao">
                <ButtonStyled className="transparent" disabled={fornecedor.page <= 0} onClick={() => buscarPagina(fornecedor.page - 1)}><FontAwesomeIcon icon={faArrowLeft} /></ButtonStyled>
                {fornecedor.pageInfo.map((value, index) => {
                    return ( <ButtonStyled className={value.page === (fornecedor.page + 1) ? 'primary' : ''} key={index} onClick={() => buscarPagina(value.page - 1)}>{value.page}</ButtonStyled> )
                })}
                <ButtonStyled className="transparent" disabled={((fornecedor.page + 1) === fornecedor.pageInfo.length) || fornecedor.pageInfo.length === 0} onClick={() => buscarPagina(fornecedor.page + 1)}><FontAwesomeIcon icon={faArrowRight} /></ButtonStyled>
            </div>
        </FornecedorPageStyled>
    );
};

const FornecedorPageConnected = connect((state) => { 
    return {
        fornecedor: state.fornecedor
    }
 })(FornecedorPage);

export default FornecedorPageConnected;