import { useContext } from "react";
import ButtonStyled from "../components/ButtonStyled";
import ButtonOptions from "../components/forms/ButtonOptions";
import TextField from "../components/forms/TextField";
import JanelaStyled from "../components/JanelaStyled";
import Separador from "../components/Separador";
import { CRUDContext } from "../hookies/context/CRUDContext";
import { STATUS } from "../hookies/useFormulario";
import ValueUtils from "../utils/ValueUtils";
import FormularioStyled from "./Formulario.style";

export default function FornecedorFormularioPage() {
    const form = useContext(CRUDContext).fornecedor.form;
    const tipoPessoaType = { F: "Física", J: "Jurídica" };

    function salvar() {
        var atual = { ...form.atual };

        atual.nome = ValueUtils.valueById("formulario_fornecedor_nome");
        atual.tipoPessoa = ValueUtils.valueById("formulario_fornecedor_tipo_pessoa");
        atual.cpfCnpj = ValueUtils.valueById("formulario_fornecedor_cpf_cnpj");
        atual.email = ValueUtils.valueById("formulario_fornecedor_email");
        atual.telefone = ValueUtils.valueById("formulario_fornecedor_telefone");
        atual.cidade = ValueUtils.valueById("formulario_fornecedor_cidade");
        atual.estado = ValueUtils.valueById("formulario_fornecedor_estado");
        atual.pais = ValueUtils.valueById("formulario_fornecedor_pais");
        atual.cep = ValueUtils.valueById("formulario_fornecedor_CEP");
        atual.rua = ValueUtils.valueById("formulario_fornecedor_rua");
        atual.numero = ValueUtils.valueById("formulario_fornecedor_numero");
        atual.bairro = ValueUtils.valueById("formulario_fornecedor_bairro");
        atual.complemento = ValueUtils.valueById("formulario_fornecedor_complemento");

        form.salvar(atual);
    }

    return (
        <JanelaStyled>
            <div className="content">
                <div className="title">{form.status === STATUS.CADASTRAR ? "Cadastro" : "Alteração"} de Fornecedor</div>
                <div className="innerContent">
                    <FormularioStyled>
                        <Separador titulo="Dados pessoais" />

                        <div className="linha">
                            <TextField label="Nome Completo" fieldID="formulario_fornecedor_nome" nullable={false} defaultValue={form.atual.nome} />
                        </div>
                        <div className="linha">
                            <ButtonOptions label="Tipo Pessoa" fieldID="formulario_fornecedor_tipo_pessoa" nullableOption={false} defaultValue={form.atual.tipoPessoa} list={tipoPessoaType} />
                            <TextField label="CPF/CNPJ" fieldID="formulario_fornecedor_cpf_cnpj" nullable={false} defaultValue={form.atual.cpfCnpj} />
                        </div>
                        <div className="linha">
                            <TextField label="Telefone" defaultValue={form.atual.telefone} fieldID="formulario_fornecedor_telefone" />
                            <TextField label="E-mail" defaultValue={form.atual.email} fieldID="formulario_fornecedor_email" className="grow2" />
                        </div>
                        <Separador titulo="Endereço" />
                        <div className="linha">
                            <TextField label="Cidade" defaultValue={form.atual.cidade} fieldID="formulario_fornecedor_cidade" />
                            <TextField label="Estado" defaultValue={form.atual.estado} fieldID="formulario_fornecedor_estado" />
                            <TextField label="País" defaultValue={form.atual.pais} fieldID="formulario_fornecedor_pais" />
                        </div>
                        <div className="linha">
                            <TextField label="Rua" defaultValue={form.atual.rua} fieldID="formulario_fornecedor_rua" />
                            <TextField label="Complemento" defaultValue={form.atual.complemento} fieldID="formulario_fornecedor_complemento" />
                        </div>
                        <div className="linha">
                            <TextField label="CEP" defaultValue={form.atual.cep} fieldID="formulario_fornecedor_CEP" />
                            <TextField label="Bairro" defaultValue={form.atual.bairro} fieldID="formulario_fornecedor_bairro" />
                            <TextField label="Número" defaultValue={form.atual.numero} fieldID="formulario_fornecedor_numero" />
                        </div>
                    </FormularioStyled>
                </div>
                <div className="commands">
                    <ButtonStyled onClick={salvar} className="primary">
                        Salvar
                    </ButtonStyled>
                    <ButtonStyled onClick={form.statusOcioso}>Cancelar</ButtonStyled>
                </div>
            </div>
        </JanelaStyled>
    );
}
