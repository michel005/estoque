import styled from "styled-components";
import TextField from "../../components/forms/TextField";
import ButtonStyled from "../../components/ButtonStyled";
import Message from "../../components/Message";
import ChoiceMessage from "../../components/ChoiceMessage";
import SelectField from "../../components/forms/SelectField";
import { STATUS } from "../../hookies/useFormulario";
import JanelaStyled from "../../components/JanelaStyled";
import ButtonOptions from "../../components/forms/ButtonOptions";

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
`;

function Separador({ titulo }: any) {
    return (
        <div className="separador">
            <div className="titulo">{titulo}</div>
            <div className="barra"></div>
        </div>
    );
}

function FornecedorFormularioPage({ 
    fornecedor, 
    error, 
    status,
    eventos 
}) {
    const tipoPessoaType = { F: 'Física', J: 'Jurídica' };

    function valueById(id: string) {
        var objeto : any = document.getElementById(id);
        return objeto !== undefined && objeto !== null ? (objeto.value === '' ? null : objeto.value) : null;
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

        if (status === STATUS.CADASTRAR) {
            eventos.cadastrar(forn);
        } else {
            eventos.alterar(forn);
        }
    }

    function excluir() {
        eventos.statusExcluir(fornecedor);
    }

    function acaoExcluir() {
        eventos.excluir(fornecedor);
    }

    function fecharExcluir() {
        if (status === STATUS.CADASTRAR) {
            eventos.statusCadastrar(fornecedor);
        } else {
            eventos.statusAlterar(fornecedor);
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
                        <ButtonStyled className="primary" onClick={salvar}>Salvar</ButtonStyled>
                        {status === STATUS.ALTERAR && <ButtonStyled className="alert" onClick={excluir}>Excluir</ButtonStyled>}
                        <ButtonStyled onClick={cancelar}>Cancelar</ButtonStyled>
                    </div>
                </div>
            </JanelaStyled>

            {status === STATUS.EXCLUIR &&
            <ChoiceMessage title="Exclusão de Fornecedor" text={'Deseja realmente excluir o fornecedor "' + fornecedor.nome + '"?'} choices={[ { name: 'Sim', command: acaoExcluir }, { name: 'Não, cancelar!', command: fecharExcluir } ]} />}

            {error !== null && <Message title="Erro no Fornecedor" text={error.toString()} closeEvent={fecharExcluir} />}
        </StyledFormulario>
    );
}

 
export default FornecedorFormularioPage;