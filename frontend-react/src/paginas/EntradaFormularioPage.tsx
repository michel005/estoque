import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import ButtonStyled from "../components/ButtonStyled";
import ButtonOptions from "../components/forms/ButtonOptions";
import SelectField from "../components/forms/SelectField";
import TextField from "../components/forms/TextField";
import JanelaStyled from "../components/JanelaStyled";
import Separador from "../components/Separador";
import TableStyled from "../components/TableStyled";
import { CRUDContext } from "../hookies/context/CRUDContext";
import { STATUS } from "../hookies/useFormulario";
import ConvertUtils from "../utils/ConvertUtils";
import ValueUtils from "../utils/ValueUtils";
import FormularioStyled from "./Formulario.style";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function EntradaFormularioPage() {
    const [erroAdicionarItem, setErroAdicionarItem] = useState<any>(null);
    const form = useContext(CRUDContext).entrada.form;
    const fornecedores = useContext(CRUDContext).entrada.fornecedores;
    const itens = useContext(CRUDContext).entrada.itens;
    const situacaoType = {
        PENDENTE: "Pendente",
        APROVADO: "Aprovado",
        CANCELADO: "Cancelado",
    };

    function adicionarItem() {
        var nome = ValueUtils.valueById("fieldNomeItem");
        var quantidade = parseInt(ValueUtils.valueById("fieldQuantidade"));
        var valor = parseFloat(ValueUtils.valueById("fieldValor").replace(".", "").replace(",", "."));

        var entradaAux = { ...form.atual };

        if (nome === null || nome === "") {
            setErroAdicionarItem("Nome não foi informado!");
        } else if (quantidade === 0 && valor === 0) {
            setErroAdicionarItem("Quantidade e/ou valor deve ser diferente de zero!");
        } else {
            entradaAux.itens = [...entradaAux.itens, { nomeItem: nome, quantidade: quantidade, valor: valor }];
            ValueUtils.elementById("fieldNomeItem").value = "";
            ValueUtils.elementById("fieldQuantidade").value = "0";
            ValueUtils.elementById("fieldValor").value = "0,00";

            form.setAtual(entradaAux);
        }
    }

    function removerItem(item) {
        var index: number = -1;
        var entradaAux = { ...form.atual };
        entradaAux.itens.map((value: any, x: number) => {
            if (value.nomeItem === item.nomeItem) {
                index = x;
            }
            return value;
        });
        if (index !== -1) {
            entradaAux.itens.splice(index, 1);
        }
        form.setAtual({ ...entradaAux });
    }

    function cancelarItem() {
        ValueUtils.elementById("fieldNomeItem").value = "";
        ValueUtils.elementById("fieldQuantidade").value = "0";
        ValueUtils.elementById("fieldValor").value = "0,00";
    }

    function salvar() {
        var atual = { ...form.atual };
        atual.eventoEntrada.descricao = ValueUtils.valueById("fieldDescricao");
        if (ValueUtils.valueById("fieldSituacao") !== "") {
            atual.eventoEntrada.status = ValueUtils.valueById("fieldSituacao");
        } else {
            atual.eventoEntrada.status = null;
        }
        if (ValueUtils.valueById("fieldFornecedor") !== "" && ValueUtils.valueById("fieldFornecedor") !== null) {
            atual.eventoEntrada.fornecedor = {
                id: ValueUtils.valueById("fieldFornecedor"),
            };
        } else {
            atual.eventoEntrada.fornecedor = null;
        }

        form.salvar(atual);
    }

    return (
        <JanelaStyled>
            <div className="content">
                <div className="title">{form.status === STATUS.CADASTRAR ? "Cadastro" : "Alteração"} de Fornecedor</div>
                <div className="innerContent">
                    <FormularioStyled>
                        <div className="linha">
                            <TextField label="Descrição" defaultValue={form.atual.eventoEntrada.descricao} fieldID="fieldDescricao" nullable={false} />
                            <SelectField label="Situação" defaultValue={form.atual.eventoEntrada.status} fieldID="fieldSituacao" list={situacaoType} nativeSelect={true} nullableOption={false} />
                        </div>
                        <div className="linha">
                            <SelectField
                                label="Fornecedor"
                                defaultValue={form.atual.eventoEntrada.fornecedor !== null ? form.atual.eventoEntrada.fornecedor.id : null}
                                fieldID="fieldFornecedor"
                                list={fornecedores}
                                nullable={false}
                                nativeSelect={true}
                            />
                        </div>

                        <Separador titulo="Itens" />

                        <div className="linha">
                            <SelectField label="Item" fieldID="fieldNomeItem" list={itens} nativeSelect={true} />
                            <TextField label="Quantidade" type="number" defaultValue={0} fieldID="fieldQuantidade" />
                            <TextField label="Valor" defaultValue={"0,00"} fieldID="fieldValor" />
                        </div>
                        <div className="linha">
                            <div className="coluna">
                                <div className="comandos right">
                                    <div className="erroItem">{erroAdicionarItem}</div>
                                    <ButtonStyled className="primary" onClick={adicionarItem}>
                                        Adicionar
                                    </ButtonStyled>
                                    <ButtonStyled onClick={cancelarItem}>Cancelar</ButtonStyled>
                                </div>
                            </div>
                        </div>
                        <div className="linha">
                            <TableStyled>
                                <thead>
                                    <tr>
                                        <th className="colunaItem">Item</th>
                                        <th className="colunaQuantidade">Quantidade</th>
                                        <th className="colunaValor">Valor</th>
                                        <th className="colunaComandos"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {form.atual.itens.map((value: any, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>{value.nomeItem}</td>
                                                <td className="colunaQuantidade">{value.quantidade}</td>
                                                <td className="colunaValor">{ConvertUtils.moneyFormat(value.valor === null || value.valor === "" ? 0 : value.valor)}</td>
                                                <td className="colunaComando">
                                                    <ButtonStyled className="link" title="Excluir item" onClick={() => removerItem(value)}>
                                                        <FontAwesomeIcon icon={solid("trash")} />
                                                    </ButtonStyled>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {form.atual.itens.length === 0 && (
                                        <tr>
                                            <td colSpan={4}>Sem itens</td>
                                        </tr>
                                    )}
                                </tbody>
                            </TableStyled>
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
