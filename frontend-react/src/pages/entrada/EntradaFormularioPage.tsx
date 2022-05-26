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
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import JanelaStyled from "../../components/JanelaStyled";

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

    .campo, .coluna {
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
`;

function Separador({ titulo }: any) {
    return (
        <div className="separador">
            <div className="titulo">{titulo}</div>
            <div className="barra"></div>
        </div>
    );
}

function EntradaFormularioPage({
    entrada, 
    setAtual,
    error, 
    status, 
    listaFornecedores,
    listaItens, 
    eventos 
}) {
    const situacaoType = { PENDENTE: 'Pendente', APROVADO: 'Aprovado', CANCELADO: 'Cancelado' };

    function valueById(id: string) {
        var objeto : any = elementById(id);
        return objeto !== null ? (objeto.value === '' ? null : objeto.value) : null;
    }

    function elementById(id: string) {
        var objeto : any = document.getElementById(id);
        return objeto !== undefined && objeto !== null ? objeto : null;
    }

    function salvar() {
        var curr = entrada;
        curr.eventoEntrada.descricao = valueById('fieldDescricao');
        if (valueById('fieldSituacao') !== '') {
            curr.eventoEntrada.status = valueById('fieldSituacao');
        } else {
            curr.eventoEntrada.status = null;
        }
        if (valueById('fieldFornecedor') !== '' && valueById('fieldFornecedor') !== null) {
            curr.eventoEntrada.fornecedor = {
                id: valueById('fieldFornecedor')
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
        var nome = valueById('fieldNomeItem');
        var quantidade = parseInt(valueById('fieldQuantidade'));
        var valor = parseFloat(valueById('fieldValor').replace('.', '').replace(',', '.'));

        var entradaAux = entrada;

        if (nome !== null && ( quantidade !== 0 || valor !== 0 )) {
            entradaAux.itens = ([...entradaAux.itens, { nomeItem: nome, quantidade: quantidade, valor: valor }]);
            elementById('fieldNomeItem').value = '';
            elementById('fieldQuantidade').value = '0';
            elementById('fieldValor').value = '0,00';

            setAtual({...entradaAux});
        } else {
            eventos.setError({
                "ERRO": "É obrigatório informar o item, quantidade e valor diferente de zero!"
            });
        }
    }

    function removerItem(item: any) {
        var index:number = -1;
        var entradaAux = entrada;
        entradaAux.itens.map((value:any, x:number) => {
            if (value.nomeItem === item.nomeItem) {
                index = x;
            }
            return value;
        });
        if (index !== -1) {
            entradaAux.itens.splice(index, 1);
        }
        setAtual({...entradaAux});
    }

    function cancelarItem() {
        elementById('fieldNomeItem').value = '';
        elementById('fieldQuantidade').value = '0';
        elementById('fieldValor').value = '0,00';
    }

    function excluir() {
        eventos.statusExcluir(entrada);
    }

    function acaoExcluir() {
        eventos.excluir(entrada.eventoEntrada);
    }

    function fecharExcluir() {
        if (status === STATUS.CADASTRAR) {
            eventos.statusCadastrar(entrada);
        } else {
            eventos.statusAlterar(entrada);
        }
    }

    function validaSomenteNumeros() {
        var valor = elementById('fieldValor').value.replace('.', '').replace(',', '.');
        var quantidade = parseInt(elementById('fieldQuantidade').value);
        if (isNaN(valor) || valor.toString().indexOf('.') === -1) {
            elementById('fieldValor').value = '0,00';
            return 'O valor informado não é um número válido!';
        }
        if (parseFloat(valor) === 0 && quantidade === 0) {
            return 'O valor não pode ser zero!';
        }
        return '';
    }

    function validaValorZerado() {
        var valor = elementById('fieldValor').value.replace('.', '').replace(',', '.');
        var quantidade = elementById('fieldQuantidade').value;
        if (parseInt(quantidade) === 0 && parseFloat(valor) === 0) {
            return 'A quantidade não pode ser zero!';
        }
        return '';
    }

    function cancelar() {
        eventos.statusOcioso();
    }

    useEffect(() => {
        console.log(entrada);
        
    })

    return (
        <Estilo>
            <JanelaStyled>
                <div className="content">
                    <div className="title">Formulário de Itens</div>
                    <div className="innerContent">
                        <div className="linha">
                            <TextField label="Descrição" defaultValue={entrada.eventoEntrada.descricao} fieldID="fieldDescricao" />
                            <SelectField label="Situação" defaultValue={entrada.eventoEntrada.status} fieldID="fieldSituacao" list={situacaoType} nativeSelect={true} nullableOption={false} />
                        </div>
                        <div className="linha">
                            <SelectField label="Fornecedor" defaultValue={entrada.eventoEntrada.fornecedor !== null ? entrada.eventoEntrada.fornecedor.id : null} fieldID="fieldFornecedor" list={listaFornecedores} nullable={false} nativeSelect={true} />
                        </div>
                        
                        <Separador titulo="Itens" />
                        
                        <div className="linha">
                            <SelectField label="Item" fieldID="fieldNomeItem" list={listaItens} nullable={false} nativeSelect={true} />
                            <TextField label="Quantidade" type="number" defaultValue={0} nullable={false} fieldID="fieldQuantidade" validation={validaValorZerado} />
                            <TextField label="Valor" defaultValue={"0,00"} fieldID="fieldValor" nullable={false} validation={validaSomenteNumeros} />
                        </div>
                        <div className="linha">
                            <div className="coluna">
                                <div className="comandos right">
                                    <ButtonStyled className="primary" onClick={adicionarItem}>Adicionar</ButtonStyled>
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
                                        {
                                            entrada.itens.map((value: any, index: number) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{value.nomeItem}</td>
                                                        <td className="colunaQuantidade">{value.quantidade}</td>
                                                        <td className="colunaValor">{ConvertUtils.moneyFormat(value.valor === null || value.valor === '' ? 0 : value.valor)}</td>
                                                        <td className="colunaComando">
                                                            <ButtonStyled className="link" title="Excluir item" onClick={() => removerItem(value)}>
                                                                <FontAwesomeIcon icon={solid('trash')} />
                                                            </ButtonStyled>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        {
                                            entrada.itens.length === 0 &&
                                            <tr>
                                                <td colSpan={4}>Sem itens</td>
                                            </tr>
                                        }
                                    </tbody>
                                </TableStyled>
                            </div>
                        </div>
                    </div>
                    <div className="commands">
                        <ButtonStyled className="primary" onClick={salvar}>Salvar</ButtonStyled>
                        {status === STATUS.ALTERAR && <ButtonStyled className="alert" onClick={excluir}>Excluir</ButtonStyled>}
                        <ButtonStyled onClick={cancelar}>Cancelar</ButtonStyled>
                    </div>
                </div>
            </JanelaStyled>

            {status === STATUS.EXCLUIR && <ChoiceMessage title="Exclusão de Evento de Entrada" text={'Deseja realmente excluir o evento de entrada?'} choices={[ { name: 'Sim', command: acaoExcluir }, { name: 'Não, cancelar!', command: fecharExcluir } ]} />}
            {error !== null && <Message title="Erro no Evento de Entrada" text={error.toString()} closeEvent={fecharExcluir} />}
        </Estilo>
    );
}

export default EntradaFormularioPage;