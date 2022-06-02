import styled from "styled-components";
import TextField from "../../components/forms/TextField";
import ButtonStyled from "../../components/ButtonStyled";
import Message from "../../components/Message";
import ChoiceMessage from "../../components/ChoiceMessage";
import { STATUS } from "../../hookies/useFormulario";
import JanelaStyled from "../../components/JanelaStyled";
import ButtonOptions from "../../components/forms/ButtonOptions";
import ValueUtils from "../../utils/ValueUtils";
import Separador from "../../components/Separador";

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
`;

function FornecedorFormularioPage({ fornecedor, status, eventos }) {
    const tipoPessoaType = { F: "Física", J: "Jurídica" };

    function salvar() {
        var forn = { ...fornecedor };
        forn.nome = ValueUtils.valueById("fieldNome");
        forn.tipoPessoa = ValueUtils.valueById("fieldTipoPessoa");
        forn.cpfCnpj = ValueUtils.valueById("fieldCpfCnpj");
        forn.email = ValueUtils.valueById("fieldEmail");
        forn.telefone = ValueUtils.valueById("fieldTelefone");
        forn.cidade = ValueUtils.valueById("fieldCidade");
        forn.estado = ValueUtils.valueById("fieldEstado");
        forn.pais = ValueUtils.valueById("fieldPais");
        forn.cep = ValueUtils.valueById("fieldCEP");
        forn.rua = ValueUtils.valueById("fieldRua");
        forn.numero = ValueUtils.valueById("fieldNumero");
        forn.bairro = ValueUtils.valueById("fieldBairro");
        forn.complemento = ValueUtils.valueById("fieldComplemento");

        if (status === STATUS.CADASTRAR) {
            eventos.cadastrar(forn);
        } else {
            eventos.alterar(forn);
        }
    }

    function cancelar() {
        eventos.statusOcioso();
    }

    return (
        <StyledFormulario>
            <JanelaStyled>
                <div className="content">
                    <div className="title">Formulário de Fornecedores</div>
                    <div className="innerContent">
                        <Separador titulo="Dados pessoais" />
                        <div className="linha">
                            <TextField label="Nome Completo" defaultValue={fornecedor.nome} fieldID="fieldNome" nullable={false} />
                        </div>
                        <div className="linha">
                            <ButtonOptions label="Tipo Pessoa" defaultValue={fornecedor.tipoPessoa} fieldID="fieldTipoPessoa" nullableOption={false} list={tipoPessoaType} />
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
                        </div>
                        <div className="linha">
                            <TextField label="Rua" defaultValue={fornecedor.rua} fieldID="fieldRua" />
                            <TextField label="Complemento" defaultValue={fornecedor.complemento} fieldID="fieldComplemento" />
                        </div>
                        <div className="linha">
                            <TextField label="CEP" defaultValue={fornecedor.cep} fieldID="fieldCEP" />
                            <TextField label="Bairro" defaultValue={fornecedor.bairro} fieldID="fieldBairro" />
                            <TextField label="Número" defaultValue={fornecedor.numero} fieldID="fieldNumero" />
                        </div>
                    </div>
                    <div className="commands">
                        <ButtonStyled className="primary" onClick={salvar}>
                            Salvar
                        </ButtonStyled>
                        <ButtonStyled onClick={cancelar}>Cancelar</ButtonStyled>
                    </div>
                </div>
            </JanelaStyled>
        </StyledFormulario>
    );
}

export default FornecedorFormularioPage;
