import { connect } from "react-redux";
import store from "../../store";
import styled from "styled-components";
import TextField from "../../components/forms/TextField";
import ButtonOptions from "../../components/forms/ButtonOptions";
import ButtonStyled from "../../components/ButtonStyled";
import Message from "../../components/Message";
import ChoiceMessage from "../../components/ChoiceMessage";
import FornecedorAction from "../../actions/FornecedorAction";
import FornecedorActionTypes from "../../constants/FornecedorActionTypes";
import {
    NavLink,
    useNavigate
} from "react-router-dom";
import { useState } from "react";
import PaginaAction from "../../actions/PaginaAction";

const StyledFormulario = styled.div`
width: 100%;

h1 {
    color: #000;
    margin-bottom: 48px;
    width: 100%;
}

a {
    color: #39f;
    text-decoration: none;
}

.linha {
    display: flex;
    flex-direction: row;
    margin-bottom: 14px;

    .campo {
        margin-right: 14px;
        flex-grow: 1;
        width: 100%;

        &:last-child {
            margin-right: 0px;
        }
    }
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
        color: #666;
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

.comandos {
    margin-top: 48px;

    button {
        margin-right: 14px;

        &:last-child {
            margin-right: 0px;
        }
    }
}
`;

function Separador({ titulo }) {
    return (
        <div className="separador">
            <div className="titulo">{titulo}</div>
            <div className="barra"></div>
        </div>
    );
}

function FornecedorFormularioPage({ fornecedor, error, status }) {
    const tipoPessoaType = [ {text: 'Física', value: 'F'}, {text: 'Jurídica', value: 'J'} ];
    const navigate = useNavigate();

    function valueById(id) {
        return document.getElementById(id) ? (document.getElementById(id).value === '' ? null : document.getElementById(id).value) : null;
    }

    function salvar() {
        var forn = fornecedor;
        forn.nome = valueById('fieldNome');
        forn.tipoPessoa = valueById('fieldTipoPessoa');
        forn.cpfCnpj = valueById('fieldCpfCnpj');
        forn.email = valueById('fieldEmail');
        forn.telefone = valueById('fieldTelefone');
        forn.cidade = valueById('fieldCidade');
        forn.estado = valueById('fieldEstado');
        forn.pais = valueById('fieldPais');
        forn.cep = valueById('fieldCEP');
        forn.rua = valueById('fieldRua');
        forn.numero = valueById('fieldNumero');
        forn.bairro = valueById('fieldBairro');
        forn.complemento = valueById('fieldComplemento');

        if (fornecedor.id === null) {
            store.dispatch(FornecedorAction.cadastrar(forn));
        } else {
            store.dispatch(FornecedorAction.alterar(forn));
        }
    }

    function excluir() {
        store.dispatch(FornecedorAction.statusExcluir(fornecedor));
    }

    function acaoExcluir() {
        store.dispatch(FornecedorAction.excluir(fornecedor));
    }

    function fecharExcluir() {
        if (fornecedor.id === null) {
            store.dispatch(FornecedorAction.statusCadastrar());
        } else {
            store.dispatch(FornecedorAction.statusAlterar(fornecedor));
        }
    }

    function cancelar() {
        store.dispatch(FornecedorAction.statusOcioso());
        store.dispatch(PaginaAction.mudarPaginaAtual('inicio'));
        navigate('/fornecedores');
    }

    return (
        <>
        {
            fornecedor === null ? 
            <StyledFormulario>
                <h1>Nào é possível recarregar este formulário</h1>
                <NavLink to={'/fornecedores'}>Voltar para <b>Fornecedores</b></NavLink>
            </StyledFormulario>
            :
            <StyledFormulario>
                <h1>Formulário de Fornecedor</h1>
                <Separador titulo="Dados pessoais" />
                <div className="linha">
                    <TextField label="Nome Completo" defaultValue={fornecedor.nome} fieldID="fieldNome" nullable={false} />
                    <ButtonOptions label="Tipo Pessoa" defaultValue={fornecedor.tipoPessoa === null ? 'F' : fornecedor.tipoPessoa} fieldID="fieldTipoPessoa" list={tipoPessoaType} />
                    <TextField label="CPF/CNPJ" defaultValue={fornecedor.cpfCnpj} fieldID="fieldCpfCnpj" nullable={false} />
                </div>
                <div className="linha">
                    <TextField label="Telefone" defaultValue={fornecedor.telefone} fieldID="fieldTelefone" />
                    <TextField label="E-mail" defaultValue={fornecedor.email} fieldID="fieldEmail" />
                    <div className="campo"></div>
                </div>
                <Separador titulo="Endereço" />
                <div className="linha">
                    <TextField label="Cidade" defaultValue={fornecedor.cidade} fieldID="fieldCidade" />
                    <TextField label="Estado" defaultValue={fornecedor.estado} fieldID="fieldEstado" />
                    <TextField label="País" defaultValue={fornecedor.pais} fieldID="fieldPais" />
                    <TextField label="CEP" defaultValue={fornecedor.cep} fieldID="fieldCEP" />
                </div>
                <div className="linha">
                    <TextField label="Rua" defaultValue={fornecedor.rua} fieldID="fieldRua" />
                    <TextField label="Número" defaultValue={fornecedor.numero} fieldID="fieldNumero" />
                    <TextField label="Bairro" defaultValue={fornecedor.bairro} fieldID="fieldBairro" />
                    <TextField label="Complemento" defaultValue={fornecedor.complemento} fieldID="fieldComplemento" />
                </div>
                <div className="comandos">
                    <ButtonStyled className="primary" onClick={salvar}>Salvar</ButtonStyled>
                    {fornecedor.id === null ? <></> : <ButtonStyled className="alert" onClick={excluir}>Excluir</ButtonStyled>}
                    <ButtonStyled onClick={cancelar}>Cancelar</ButtonStyled>
                </div>

                {status === FornecedorActionTypes.STATUS_EXCLUIR ? <>
                    <ChoiceMessage title="Exclusão de Fornecedor" text={'Deseja realmente excluir o fornecedor "' + fornecedor.nome + '"?'} choices={[ { name: 'Sim', command: acaoExcluir }, { name: 'Não, cancelar!', command: fecharExcluir } ]} />
                </> : <></>}

                {error !== null ? <Message title="Erro no Fornecedor" text={error.toString()} closeEvent={fecharExcluir} /> : <></>}
            </StyledFormulario>
        }
        </>
    );
}

const FornecedorFormularioConnect = connect((state) => { 
    return {
        fornecedor: state.fornecedor.currentFornecedor,
        status: state.fornecedor.status,
        error: state.fornecedor.error
    }
 })(FornecedorFormularioPage);

 
export default FornecedorFormularioConnect;