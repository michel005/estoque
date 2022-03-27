import { connect } from "react-redux";
import TextField from "../../components/forms/TextField";
import SelectField from "../../components/forms/SelectField";
import store from "../../store";
import ButtonStyled from './../../components/ButtonStyled';
import styled from "styled-components";
import TableStyled from "../../components/TableStyled";
import Message from "../../components/Message";
import JanelaStyled from "../../components/JanelaStyled";
import ChoiceMessage from "../../components/ChoiceMessage";
import { useState } from "react";
import FornecedorAction from "../../actions/FornecedorAction";
import FornecedorActionTypes from "../../constants/FornecedorActionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const FornecedorPageStyled = styled.div`
    width: 100%;

    .space {
        height: 10px;
    }

    .lead {
        color: #999;
    }

    .commandButtons {
        display: flex;
        flex-direction: row-reverse;
        margin: 14px 0px;

        .termoBusca {
            margin-left: 14px;
            width: 350px;
        }

        button {
            margin-left: 14px;
        }
    }

    table {
        width: 100%;
        flex-grow: 1;
        max-height: 50vh !important;

        tbody {
            tr {
                td{
                    .categoria {
                        background-color: #cc3;
                        border-radius: 7px;
                        color: #fff;
                        font-size: 12px;
                        font-weight: normal;
                        padding: 4px 7px 5px;
                        transition: all 0.5s;

                        &:hover {
                            background-color: #111;
                        }
                    }
                }
            }
        }
    }

    .contador {
        color: #AAA;
        padding: 0px 14px 14px;
        text-align: right;
        width: 100%;
    }
`;

function FornecedorPage({ status, fornecedores, error, current, size, page, pageInfo }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    function constructor() {
        if (constructorHasRun) return;
        document.title = 'Controle de Estoque - Fornecedores';
        atualizar();
        setConstructorHasRun(true);
    }

    function mostrarFormularioCadastrar() {
        store.dispatch(FornecedorAction.statusCadastrar());
    }

    function mostrarFormularioAlterar(fornecedor) {
        store.dispatch(FornecedorAction.statusAlterar(fornecedor));
    }

    function mostrarFormularioExcluir(fornecedor) {
        store.dispatch(FornecedorAction.statusExcluir(fornecedor));
    }

    function salvar() {
        var curr = current;
        curr.nome = document.getElementById('nomeFornecedor').value;
        if (document.getElementById('tipoPessoa').value !== '') {
            curr.tipoPessoa = document.getElementById('tipoPessoa').value;
        } else {
            curr.tipoPessoa = null;
        }
        curr.cpfCnpj = document.getElementById('cpfCnpjFornecedor').value;

        if (status === FornecedorActionTypes.STATUS_CADASTRAR) {
            store.dispatch(FornecedorAction.cadastrar(curr));
        } else
        if (status === FornecedorActionTypes.STATUS_ALTERAR) {
            store.dispatch(FornecedorAction.alterar(curr));
        }
    }
    
    function excluir() {
        store.dispatch(FornecedorAction.excluir(current));
    }

    function atualizar() {
        store.dispatch(FornecedorAction.buscarTodos({ termo: document.getElementById('termoBusca') ? document.getElementById('termoBusca').value : '' }));
    }

    function buscarPagina(pagina) {
        store.dispatch(FornecedorAction.buscarPagina({ pagina: pagina - 1 }));
    }

    function fecharJanela() {
        store.dispatch(FornecedorAction.statusOcioso());
    }

    function fecharMensagemErro() {
        store.dispatch(FornecedorAction.resetarErro());
    }

    constructor();

    return (
        <FornecedorPageStyled>
            <h1>Fornecedores</h1>
            <span className="lead">Cadastro de todos os fornecedores que dão entrada no estoque</span>
            
            <div className="commandButtons">
                <ButtonStyled onClick={atualizar}>Buscar</ButtonStyled>
                <TextField placeholder="Buscar pelo nome ou CPF/CNPJ" fieldID="termoBusca" />
                <ButtonStyled className="primary" onClick={mostrarFormularioCadastrar}>Cadastrar</ButtonStyled>
            </div>

            <div className="containerTabela">
                <TableStyled>
                    <thead>
                        <tr>
                            <th width="80%">Nome do Fornecedor</th>
                            <th width="20%">Tipo Pessoa</th>
                            <th width="20%">CPF/CNPJ</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fornecedores.map((fornecedor, index) => {
                            return (
                                <tr key={index}>
                                    <td>{fornecedor.nome}</td>
                                    <td>{fornecedor.tipoPessoa === 'F' ? 'Física' : 'Juridica'}</td>
                                    <td>{fornecedor.cpfCnpj}</td>
                                    <td className="buttonCell">
                                        <ButtonStyled onClick={() => mostrarFormularioAlterar(fornecedor)} title="Alterar"><FontAwesomeIcon icon={faPen} /></ButtonStyled>
                                        <ButtonStyled className="alert" onClick={() => mostrarFormularioExcluir(fornecedor)} title="Excluir"><FontAwesomeIcon icon={faTrash} /></ButtonStyled>
                                    </td>
                                </tr>);
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="3">
                                <ButtonStyled disabled={page <= 0} onClick={() => buscarPagina(page)}>{'<'}</ButtonStyled>
                                {pageInfo.map((value, index) => {
                                    return ( <ButtonStyled className={value.page === (page + 1) ? 'primary' : ''} key={index} onClick={() => buscarPagina(value.page)}>{value.page}</ButtonStyled> )
                                })}
                                <ButtonStyled disabled={((page + 1) === pageInfo.length) || pageInfo.length === 0} onClick={() => buscarPagina(page + 2)}>{'>'}</ButtonStyled>
                            </th>
                        </tr>
                    </tfoot>
                </TableStyled>
            </div>

            {status === FornecedorActionTypes.STATUS_CADASTRAR || status === FornecedorActionTypes.STATUS_ALTERAR ? <>
                <JanelaStyled>
                    <div className="content">
                        <div className="title">Formulário de Fornecedor</div>
                        <div className="innerContent">
                            {status === FornecedorActionTypes.STATUS_ALTERAR ? <TextField label="ID do Fornecedor" fieldID="idFornecedor" defaultValue={current.id} disabled={current.id !== null} /> : <></> }
                            {status === FornecedorActionTypes.STATUS_ALTERAR ? <div className="space"></div> : <></> }
                            <TextField label="Nome do Fornecedor" fieldID="nomeFornecedor" defaultValue={current.nome} nullable={false} />
                            <div className="space"></div>
                            <SelectField label="Tipo Pessoa" fieldID="tipoPessoa" nullable={false} defaultValue={current.tipoPessoa} nativeSelect={true} list={[ { text: 'Física', value: 'F' }, { text: 'Juridica', value: 'J' } ]} />
                            <div className="space"></div>
                            <TextField label="CPF/CNPJ" fieldID="cpfCnpjFornecedor" defaultValue={current.cpfCnpj} nullable={false} />
                            <div className="space"></div>
                            <div className="commands">
                                <ButtonStyled className="primary" onClick={salvar}>Salvar</ButtonStyled>
                                <ButtonStyled onClick={fecharJanela}>Fechar</ButtonStyled>
                            </div>
                        </div>
                    </div>
                </JanelaStyled>
            </> : <></>}

            {status === FornecedorActionTypes.STATUS_EXCLUIR ? <>
                <ChoiceMessage title="Exclusão de fornecedor" text={'Deseja realmente excluir o fornecedor "' + current.nome + '"?'} choices={[ { name: 'Sim', command: excluir }, { name: 'Não, cancelar!', command: fecharJanela } ]} />
            </> : <></>}

            {error !== null ? <Message text={error.toString()} closeEvent={fecharMensagemErro} /> : <></>}
        </FornecedorPageStyled>
    );
};

const FornecedorPageConnected = connect((state) => { 
    return {
        status: state.fornecedor.status,
        fornecedores: state.fornecedor.list,
        error: state.fornecedor.error,
        current: state.fornecedor.currentFornecedor,
        size: state.fornecedor.size,
        page: state.fornecedor.page,
        pageInfo: state.fornecedor.pageInfo
    }
 })(FornecedorPage);

export default FornecedorPageConnected;