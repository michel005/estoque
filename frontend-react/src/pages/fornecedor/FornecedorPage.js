import { connect } from "react-redux";
import store from "../../store";
import styled from "styled-components";
import { useState } from "react";
import FornecedorAction from "../../actions/FornecedorAction";
import TextField from "../../components/forms/TextField";
import ButtonStyled from "../../components/ButtonStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faFile, faFlag, faIdBadge, faArrowDown, faEraser, faIdCard, faLocationArrow, faSearch, faMailBulk, faMap, faMapSigns, faPhone, faSortNumericDown, faStreetView, faSuitcaseRolling, faUser, faChevronDown, faFastForward, faForward, faFastBackward, faBackward, faPrint, faPencilAlt, faTrash, faHashtag } from "@fortawesome/free-solid-svg-icons";
import ButtonOptions from "../../components/forms/ButtonOptions";
import FornecedorActionTypes from "../../constants/FornecedorActionTypes";
import FornecedorFormularioConnect from "./FornecedorFormularioPage";

const FornecedorPageStyled = styled.div`
    width: 100%;

    .filtros {
        display: flex;
        flex-direction: column;
        margin-bottom: 21px;

        .linha {
            display: flex;
            flex-direction: row;

            &.noFullWidth {
                .campo {
                    margin-right: 14px;
                    width: 100%;
                }
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
        .fornecedor {
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

                    &.nome {
                        font-weight: bold;
                        flex-grow: 1;
                    }

                    &.tipoPessoa {
                        width: 150px;
                    }

                    &.cpfCnpj {
                        width: 200px;
                    }

                    &.email {
                        width: 30%;
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

        .lista .fornecedor {
            display: none;
        }

        .lista .fornecedor.selecionado {
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

function FornecedorPage({ fornecedor }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [selecionado, setSelecionado] = useState(null);
    const [mostrarMenu, setMostrarMenu] = useState(null);
    const [sortType, setSortType] = useState({field: 'nome', direction: 'asc'});
    const tipoPessoaType = [ {text: 'Física', value: 'F'}, {text: 'Jurídica', value: 'J'} ];
    const tipoPessoaWithNullType = [ ...tipoPessoaType, {text: 'Ambas', value: ''} ];

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Fornecedores';
        atualizar();
        setConstructorHasRun(true);
    }
    
    function atualizar(sortInfo = sortType) {
        setSelecionado(null);
        setMostrarMenu(null);
        store.dispatch(FornecedorAction.buscarTodos({
            nome: document.getElementById('filtroNome') ? document.getElementById('filtroNome').value : '',
            tipoPessoa: document.getElementById('filtroTipoPessoa') ? document.getElementById('filtroTipoPessoa').value : '',
            cpfCnpj: document.getElementById('filtroCpfCnpj') ? document.getElementById('filtroCpfCnpj').value : '',
            orderBy: sortInfo.field,
            orderByDirection: sortInfo.direction
        }));
    }

    function selecionar(forn) {
        setSelecionado(selecionado === null || selecionado.id !== forn.id ? forn : null);
        setMostrarMenu(null);
    }

    function eventoMostrarMenu(value) {
        setMostrarMenu(mostrarMenu === null || mostrarMenu.id !== value.id ? value : null);
    }

    function buscarPagina(pagina) {
        setSelecionado(null);
        setMostrarMenu(null);
        store.dispatch(FornecedorAction.buscarPagina({
            pagina: pagina
        }));
    }

    function limpar() {
        document.getElementById('filtroNome').value = '';
        document.getElementById('filtroTipoPessoa').value = '';
        document.getElementById('filtroCpfCnpj').value = '';
    }

    function mostrarFormularioAlterar(forn) {
        eventoMostrarMenu(forn);
        store.dispatch(FornecedorAction.statusAlterar(forn));
    }

    function mostrarFormularioExclusao(forn) {
        eventoMostrarMenu(forn);
        store.dispatch(FornecedorAction.statusExcluir(forn));
    }

    function imprimir(forn) {
        eventoMostrarMenu(forn);
        if (selecionado === null || selecionado.id !== forn.id) {
            selecionar(forn); 
        }
        setTimeout(() => {
            window.print();
        }, 100)
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
        <>
        {
            (fornecedor.status === FornecedorActionTypes.STATUS_CADASTRAR || fornecedor.status === FornecedorActionTypes.STATUS_ALTERAR || fornecedor.status === FornecedorActionTypes.STATUS_EXCLUIR) ?
            <FornecedorFormularioConnect /> :
            <FornecedorPageStyled>
                <div className="filtros">
                    <div className="linha noFullWidth">
                        <TextField fieldID="filtroNome" label="Nome" />
                        <TextField fieldID="filtroCpfCnpj" label="CPF/CNPJ" placeholder="Sem pontuação" />
                        <ButtonOptions fieldID="filtroTipoPessoa" label="Tipo Pessoa" list={tipoPessoaWithNullType} defaultValue="" />
                        <div className="comandos">
                            <div className="botoes">
                                <ButtonStyled title="Buscar" className="primary" onClick={() => atualizar()}><FontAwesomeIcon icon={faSearch} /></ButtonStyled>
                                <ButtonStyled title="Limpar filtros" onClick={() => limpar()}><FontAwesomeIcon icon={faEraser} /></ButtonStyled>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lista">
                    <div className="fornecedor nohover">
                        <div className="linha cabecalho">
                            <div className="coluna id" onClick={() => mudarOrder('id')}># {order('id')}</div>
                            <div className="coluna nome" onClick={() => mudarOrder('nome')}>Nome {order('nome')}</div>
                            <div className="coluna tipoPessoa" onClick={() => mudarOrder('tipoPessoa')}>Tipo Pessoa {order('tipoPessoa')}</div>
                            <div className="coluna cpfCnpj" onClick={() => mudarOrder('cpfCnpj')}>CPF/CNPJ {order('cpfCnpj')}</div>
                            <div className="coluna email" onClick={() => mudarOrder('email')}>E-mail {order('email')}</div>
                            <div className="coluna comandoslinha"></div>
                        </div>
                    </div>
                    {fornecedor.list.map((value, index) => {
                        return (
                            <div className={'fornecedor ' + (selecionado !== null && selecionado.id === value.id ? 'selecionado' : '')} key={index}>
                                <div className="linha">
                                    <div className="coluna id">{value.id}</div>
                                    <div className="coluna nome">{value.nome}</div>
                                    <div className="coluna tipoPessoa">{tipoPessoaType.filter((val) => val.value === value.tipoPessoa)[0].text}</div>
                                    <div className="coluna cpfCnpj">{value.cpfCnpj}</div>
                                    <div className="coluna email">{value.email=== null || value.email === '' ? 'Sem e-mail' : value.email}</div>
                                    <div className="coluna comandoslinha">
                                        <div className="opcoesNotificacao">
                                            <ButtonStyled title="Imprimir" onClick={() => imprimir(value)}><FontAwesomeIcon icon={faPrint} /></ButtonStyled>
                                            <ButtonStyled title="Alterar" onClick={() => mostrarFormularioAlterar(value)}><FontAwesomeIcon icon={faPencilAlt} /></ButtonStyled>
                                            <ButtonStyled title="Excluir" onClick={() => mostrarFormularioExclusao(value)}><FontAwesomeIcon icon={faTrash} /></ButtonStyled>
                                        </div>
                                        <ButtonStyled title="Mostrar detalhes" className={'botaoSelecionar link ' + (selecionado !== null && selecionado.id === value.id ? 'selecionado' : '')} onClick={() => selecionar(value)}>
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        </ButtonStyled>
                                    </div>
                                </div>
                                {selecionado !== null && selecionado.id === value.id ?
                                <div className="detalhes">
                                    <div className="separador">
                                        <div className="tituloSeparador">Administrativo</div>
                                        <div className="barraSeparador"></div>
                                    </div>
                                    <div className="linhaDetalhe">
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faHashtag} />} readonly={true} label="ID" defaultValue={value.id} />
                                    </div>
                                    <div className="separador">
                                        <div className="tituloSeparador">Dados pessoais</div>
                                        <div className="barraSeparador"></div>
                                    </div>
                                    <div className="linhaDetalhe">
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faUser} />} readonly={true} label="Nome" defaultValue={value.nome} />
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faIdBadge} />} readonly={true} label="Tipo Pessoa" defaultValue={value.tipoPessoa} convertValueToText={tipoPessoaType} />
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faIdCard} />} readonly={true} label="CPF/CNPJ" defaultValue={value.cpfCnpj} />
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faPhone} />} readonly={true} label="Telefone" defaultValue={value.telefone === null ? 'Sem telefone' : value.telefone} />
                                    </div>
                                    <div className="linhaDetalhe">
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faMailBulk} />} readonly={true} label="E-mail" defaultValue={value.email === null ? 'Sem e-mail' : value.email} />
                                        <div className="campo"></div>
                                    </div>
                                    <div className="separador">
                                        <div className="tituloSeparador">Endereço</div>
                                        <div className="barraSeparador"></div>
                                    </div>
                                    <div className="linhaDetalhe">
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faLocationArrow} />} readonly={true} label="Cidade" defaultValue={value.cidade === null ? 'Sem cidade' : value.cidade} />
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faSuitcaseRolling} />} readonly={true} label="Estado" defaultValue={value.estado === null ? 'Sem estado' : value.estado} />
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faFlag} />} readonly={true} label="País" defaultValue={value.pais === null ? 'Sem país' : value.pais} />
                                        <TextField readonlyIcon={<FontAwesomeIcon icon={faMapSigns} />} readonly={true} label="CEP" defaultValue={value.cep === null ? 'Sem CEP' : value.cep} />
                                    </div>
                                    <div className="linhaDetalhe">
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
                    <ButtonStyled className="transparent" disabled={fornecedor.page <= 0} onClick={() => buscarPagina(0)}><FontAwesomeIcon icon={faFastBackward} /></ButtonStyled>
                    <ButtonStyled className="transparent" disabled={fornecedor.page <= 0} onClick={() => buscarPagina(fornecedor.page - 1)}><FontAwesomeIcon icon={faBackward} /></ButtonStyled>
                    {fornecedor.pageInfo.length === 0 ? <ButtonStyled className="nohover transparent">0</ButtonStyled> : <ButtonStyled className="nohover transparent">Página {fornecedor.page + 1} de { fornecedor.pageInfo.length }</ButtonStyled> }
                    <ButtonStyled className="transparent" disabled={((fornecedor.page + 1) === fornecedor.pageInfo.length) || fornecedor.pageInfo.length === 0} onClick={() => buscarPagina(fornecedor.page + 1)}><FontAwesomeIcon icon={faForward} /></ButtonStyled>
                    <ButtonStyled className="transparent" disabled={((fornecedor.page + 1) === fornecedor.pageInfo.length) || fornecedor.pageInfo.length === 0} onClick={() => buscarPagina(fornecedor.pageInfo.length - 1)}><FontAwesomeIcon icon={faFastForward} /></ButtonStyled>
                </div>
            </FornecedorPageStyled>
        }
        </>
        );
};

const FornecedorPageConnected = connect((state) => { 
    return {
        fornecedor: state.fornecedor
    }
 })(FornecedorPage);

export default FornecedorPageConnected;