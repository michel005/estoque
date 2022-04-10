import { connect } from "react-redux";
import TextField from "../../components/forms/TextField";
import SelectField from "../../components/forms/SelectField";
import store from "../../store";
import ButtonStyled from './../../components/ButtonStyled';
import styled from "styled-components";
import Message from "../../components/Message";
import JanelaStyled from "../../components/JanelaStyled";
import ChoiceMessage from "../../components/ChoiceMessage";
import { useState } from "react";
import FornecedorAction from "../../actions/FornecedorAction";
import FornecedorActionTypes from "../../constants/FornecedorActionTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import LightTableStyled from "../../components/LightTableStyled";

const FornecedorPageStyled = styled.div`
    width: 100%;

    .commandButtons {
        display: flex;
        flex-direction: row;
        margin: 14px 0px;

        .nomeBusca, .tipoPessoaBusca, .cpfCnpjBusca {
            margin-right: 14px;
        }

        .nomeBusca {
            width: 350px;
        }

        .commands {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        button {
            margin-right: 14px;
        }
    }

    table {
        height: calc(100% - 140px);

        tbody {
            height: calc(100% - 64px);
        }
    }
`;

function FornecedorPage({ status, fornecedores, error, current, page, pageInfo }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Fornecedores';
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

    function getTermos() {
        return {
            termo: {
                nome: document.getElementById('nomeBusca') === null ? '' : document.getElementById('nomeBusca').value,
                cpfCnpj: document.getElementById('cpfCnpjBusca') === null ? '' : document.getElementById('cpfCnpjBusca').value,
                tipoPessoa: document.getElementById('tipoPessoaBusca') === null ? '' : document.getElementById('tipoPessoaBusca').value
            }
        };
    }
    
    function excluir() {
        store.dispatch(FornecedorAction.excluir(current));
    }

    function atualizar() {
        store.dispatch(FornecedorAction.buscarTodos(getTermos()));
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
            <div className="cabecalho">
                <h1><FontAwesomeIcon icon={faAddressBook} />Fornecedores</h1>
            </div>
            
            <div className="commandButtons">
                <TextField label="Nome" placeholder="Todos os nomes" fieldID="nomeBusca" />
                <TextField label="CPF/CNPJ" placeholder="Todos os CPF/CNPJ" fieldID="cpfCnpjBusca" />
                <SelectField label="Tipo Pessoa" placeholder="Tipo de Pessoa" list={[ {text: 'Física', value: 'F'}, {text: 'Juridica', value: 'J'} ]} nativeSelect={true} nullableOptionValue="" nullableOptionText="Fisica e Jurídica" fieldID="tipoPessoaBusca" />
                <div className="commands">
                    <div>
                        <ButtonStyled onClick={atualizar}>Buscar</ButtonStyled>
                        <ButtonStyled className="primary" onClick={mostrarFormularioCadastrar}>Cadastrar</ButtonStyled>
                    </div>
                </div>
            </div>

            <LightTableStyled>
                <thead>
                    <tr>
                        <th width="60%">Nome do Fornecedor</th>
                        <th width="20%">Tipo Pessoa</th>
                        <th width="20%">CPF/CNPJ</th>
                    </tr>
                </thead>
                <tbody>
                    {fornecedores.map((fornecedor, index) => {
                        return (
                            <tr key={index}>
                                <td width="60%">
                                    <ButtonStyled onClick={() => mostrarFormularioAlterar(fornecedor)} className="link">{fornecedor.nome}</ButtonStyled>
                                </td>
                                <td width="20%">{fornecedor.tipoPessoa === 'F' ? 'Física' : 'Juridica'}</td>
                                <td width="20%">{fornecedor.cpfCnpj}</td>
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
            </LightTableStyled>

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
                                {current.id !== null ? <ButtonStyled className="alert" onClick={() => mostrarFormularioExcluir(current)}>Excluir</ButtonStyled> : <></> }
                                <ButtonStyled onClick={fecharJanela}>Fechar</ButtonStyled>
                            </div>
                        </div>
                    </div>
                </JanelaStyled>
            </> : <></>}

            {status === FornecedorActionTypes.STATUS_EXCLUIR ? <>
                <ChoiceMessage title="Exclusão de fornecedor" text={'Deseja realmente excluir o fornecedor "' + current.nome + '"?'} choices={[ { name: 'Sim', command: excluir }, { name: 'Não, cancelar!', command: fecharJanela } ]} />
            </> : <></>}

            {error !== null ? <Message title="Erro no Fornecedor" text={error.toString()} closeEvent={fecharMensagemErro} /> : <></>}
        </FornecedorPageStyled>
    );
};

const FornecedorPageConnected = connect((state) => { 
    return {
        status: state.fornecedor.status,
        fornecedores: state.fornecedor.list,
        error: state.fornecedor.error,
        current: state.fornecedor.currentFornecedor,
        page: state.fornecedor.page,
        pageInfo: state.fornecedor.pageInfo
    }
 })(FornecedorPage);

export default FornecedorPageConnected;