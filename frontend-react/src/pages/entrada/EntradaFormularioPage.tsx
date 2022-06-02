import styled from "styled-components";
import TextField from "../../components/forms/TextField";
import ButtonStyled from "../../components/ButtonStyled";
import Message from "../../components/Message";
import ChoiceMessage from "../../components/ChoiceMessage";
import SelectField from "../../components/forms/SelectField";
import TableStyled from "../../components/TableStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { STATUS } from "../../hookies/useFormulario";
import ConvertUtils from "../../utils/ConvertUtils";
import { useEffect, useState } from "react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import JanelaStyled from "../../components/JanelaStyled";
import ValueUtils from "../../utils/ValueUtils";
import Separador from "../../components/Separador";

const Estilo = styled.div`
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

    table {
        margin: 0px;
    }

    .linha {
        display: flex;
        flex-direction: row;
        margin-bottom: 14px;

        .campo,
        .coluna {
            margin-right: 14px;
            flex-grow: 1;
            width: 100%;

            &:last-child {
                margin-right: 0px;
            }
        }

        .coluna {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;

            .comandos {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                padding: 0px;
                margin: 0px;
                border: none;
                flex-grow: 1;
            }
        }
    }

    .colunaItem {
        width: 40%;
    }

    .colunaQuantidade {
        width: 20%;
    }

    .colunaValor {
        width: 30%;
        text-align: right;
    }

    .colunaComando {
        text-align: right;
        width: 36px;
    }

    #fieldValor {
        text-align: right;
    }

    .comandos {
        border: 1px solid #ccc;
        border-width: 1px 0px 0px 0px;
        padding-top: 14px;

        button {
            margin-right: 14px;

            &:last-child {
                margin-right: 0px;
            }
        }

        &.right {
            text-align: right;
        }
    }

    .erroItem {
        color: red;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 14px;
    }
`;

function EntradaFormularioPage({ entrada, setAtual, status, listaFornecedores, listaItens, eventos }) {
    const [erroAdicionarItem, setErroAdicionarItem] = useState<any>(null);

    const situacaoType = {
        PENDENTE: "Pendente",
        APROVADO: "Aprovado",
        CANCELADO: "Cancelado",
    };

    function elementById(id: string) {
        var objeto: any = document.getElementById(id);
        return objeto !== undefined && objeto !== null ? objeto : null;
    }

    function salvar() {
        var curr = { ...entrada };
        curr.eventoEntrada.descricao = ValueUtils.valueById("fieldDescricao");
        if (ValueUtils.valueById("fieldSituacao") !== "") {
            curr.eventoEntrada.status = ValueUtils.valueById("fieldSituacao");
        } else {
            curr.eventoEntrada.status = null;
        }
        if (ValueUtils.valueById("fieldFornecedor") !== "" && ValueUtils.valueById("fieldFornecedor") !== null) {
            curr.eventoEntrada.fornecedor = {
                id: ValueUtils.valueById("fieldFornecedor"),
            };
        } else {
            curr.eventoEntrada.fornecedor = null;
        }

        setAtual(curr);
        if (status === STATUS.CADASTRAR) {
            eventos.cadastrar(curr);
        } else {
            eventos.alterar(curr);
        }
    }

    function adicionarItem() {
        var nome = ValueUtils.valueById("fieldNomeItem");
        var quantidade = parseInt(ValueUtils.valueById("fieldQuantidade"));
        var valor = parseFloat(ValueUtils.valueById("fieldValor").replace(".", "").replace(",", "."));

        var entradaAux = { ...entrada };

        if (nome === null || nome === "") {
            setErroAdicionarItem("Nome não foi informado!");
        } else if (quantidade === 0 && valor === 0) {
            setErroAdicionarItem("Quantidade e/ou valor deve ser diferente de zero!");
        } else {
            entradaAux.itens = [...entradaAux.itens, { nomeItem: nome, quantidade: quantidade, valor: valor }];
            elementById("fieldNomeItem").value = "";
            elementById("fieldQuantidade").value = "0";
            elementById("fieldValor").value = "0,00";

            setAtual(entradaAux);
        }
    }

    function removerItem(item: any) {
        var index: number = -1;
        var entradaAux = { ...entrada };
        entradaAux.itens.map((value: any, x: number) => {
            if (value.nomeItem === item.nomeItem) {
                index = x;
            }
            return value;
        });
        if (index !== -1) {
            entradaAux.itens.splice(index, 1);
        }
        setAtual({ ...entradaAux });
    }

    function cancelarItem() {
        elementById("fieldNomeItem").value = "";
        elementById("fieldQuantidade").value = "0";
        elementById("fieldValor").value = "0,00";
    }

    function cancelar() {
        eventos.statusOcioso();
    }

    return (
        <Estilo>
            <JanelaStyled>
                <div className="content">
                    <div className="title">Formulário de Itens</div>
                    <div className="innerContent">
                        <div className="linha">
                            <TextField label="Descrição" defaultValue={entrada.eventoEntrada.descricao} fieldID="fieldDescricao" nullable={false} />
                            <SelectField label="Situação" defaultValue={entrada.eventoEntrada.status} fieldID="fieldSituacao" list={situacaoType} nativeSelect={true} nullableOption={false} />
                        </div>
                        <div className="linha">
                            <SelectField
                                label="Fornecedor"
                                defaultValue={entrada.eventoEntrada.fornecedor !== null ? entrada.eventoEntrada.fornecedor.id : null}
                                fieldID="fieldFornecedor"
                                list={listaFornecedores}
                                nullable={false}
                                nativeSelect={true}
                            />
                        </div>

                        <Separador titulo="Itens" />

                        <div className="linha">
                            <SelectField label="Item" fieldID="fieldNomeItem" list={listaItens} nativeSelect={true} />
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
                            <div className="coluna">
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
                                        {entrada.itens.map((value: any, index: number) => {
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
                                        {entrada.itens.length === 0 && (
                                            <tr>
                                                <td colSpan={4}>Sem itens</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </TableStyled>
                            </div>
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
        </Estilo>
    );
}

export default EntradaFormularioPage;
