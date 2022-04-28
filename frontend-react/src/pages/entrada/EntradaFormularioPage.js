import { connect } from "react-redux";
import store from "../../store";
import styled from "styled-components";
import TextField from "../../components/forms/TextField";
import ButtonStyled from "../../components/ButtonStyled";
import Message from "../../components/Message";
import ChoiceMessage from "../../components/ChoiceMessage";
import {
    useNavigate
} from "react-router-dom";
import PaginaAction from "../../actions/PaginaAction";
import SelectField from "../../components/forms/SelectField";
import EntradaActionTypes from "../../constants/EntradaActionTypes";
import EntradaAction from "../../actions/EntradaAction";
import TableStyled from "../../components/TableStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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

function Separador({ titulo }) {
    return (
        <div className="separador">
            <div className="titulo">{titulo}</div>
            <div className="barra"></div>
        </div>
    );
}

function EntradaFormularioPage({current, fornecedoresList, status, error, itemList}) {
    const navigate = useNavigate();
    const situacaoType = { PENDENTE: 'Pendente', APROVADO: 'Aprovado', CANCELADO: 'Cancelado' };
    const moneyFormater = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    function salvar() {
        var curr = current;
        curr.eventoEntrada.descricao = document.getElementById('fieldDescricao').value;
        if (document.getElementById('fieldSituacao').value !== '') {
            curr.eventoEntrada.status = document.getElementById('fieldSituacao').value;
        } else {
            curr.eventoEntrada.status = null;
        }
        if (document.getElementById('fieldFornecedor').value !== '') {
            curr.eventoEntrada.fornecedor = {
                id: document.getElementById('fieldFornecedor').value
            };
        } else {
            curr.eventoEntrada.fornecedor = null;
        }

        if (status === EntradaActionTypes.STATUS_CADASTRAR) {
            store.dispatch(EntradaAction.cadastrar(curr));
        } else
        if (status === EntradaActionTypes.STATUS_ALTERAR) {
            store.dispatch(EntradaAction.alterar(curr));
        }
    }

    function adicionarItem() {
        var nome = document.getElementById('fieldNomeItem').value;
        var quantidade = parseInt(document.getElementById('fieldQuantidade').value);
        var valor = parseFloat(document.getElementById('fieldValor').value.replace('.', '').replace(',', '.'));

        if (nome.trim() !== '' && ( quantidade !== 0 || valor !== 0 )) {
            store.dispatch(EntradaAction.adicionaItemNoCurrentEntrada({ nomeItem: nome, quantidade: quantidade, valor: valor }));
            document.getElementById('fieldNomeItem').value = '';
            document.getElementById('fieldQuantidade').value = '0';
            document.getElementById('fieldValor').value = '0,00';
        } else {
            store.dispatch(EntradaAction.mostrarErro({
                "ERRO": "É obrigatório informar o item, quantidade e valor diferente de zero!"
            }));
        }
    }

    function removerItem(item) {
        store.dispatch(EntradaAction.removeItemNoCurrentEntrada(item.nomeItem));
    }

    function cancelarItem() {
        document.getElementById('fieldNomeItem').value = '';
        document.getElementById('fieldQuantidade').value = '0';
        document.getElementById('fieldValor').value = '0,00';
    }

    function excluir() {
        store.dispatch(EntradaAction.statusExcluir(current));
    }

    function acaoExcluir() {
        store.dispatch(EntradaAction.excluir(current.eventoEntrada.id));
    }

    function fecharExcluir() {
        store.dispatch(EntradaAction.resetarErro());
        if (current.eventoEntrada.id === null) {
            store.dispatch(EntradaAction.statusCadastrar());
        } else {
            store.dispatch(EntradaAction.statusAlterar(current.eventoEntrada.id));
        }
    }

    function validaSomenteNumeros() {
        var valor = document.getElementById('fieldValor').value.replace('.', '').replace(',', '.');
        var quantidade = parseInt(document.getElementById('fieldQuantidade').value);
        if (isNaN(valor) || valor.toString().indexOf('.') === -1) {
            document.getElementById('fieldValor').value = '0,00';
            return 'O valor informado não é um número válido!';
        }
        if (parseFloat(valor) === 0 && quantidade === 0) {
            return 'O valor não pode ser zero!';
        }
        return '';
    }

    function validaValorZerado() {
        var valor = document.getElementById('fieldValor').value.replace('.', '').replace(',', '.');
        var quantidade = document.getElementById('fieldQuantidade').value;
        if (parseInt(quantidade) === 0 && parseFloat(valor) === 0) {
            return 'A quantidade não pode ser zero!';
        }
        return '';
    }

    function cancelar() {
        store.dispatch(EntradaAction.statusOcioso());
        store.dispatch(PaginaAction.mudarPaginaAtual('inicio'));
        navigate('/entradas');
    }

    return (
        <Estilo>
            <h1>Formulário para Evento de Entrada</h1>
            <Separador titulo="Dados gerais" />

            <div className="linha">
                <TextField label="Descrição" defaultValue={current.eventoEntrada.descricao} fieldID="fieldDescricao" />
                <SelectField label="Situação" defaultValue={current.eventoEntrada.status} fieldID="fieldSituacao" list={situacaoType} nativeSelect={true} nullableOption={false} />
            </div>
            <div className="linha">
                <SelectField label="Fornecedor" defaultValue={current.eventoEntrada.fornecedor !== null ? current.eventoEntrada.fornecedor.id : null} fieldID="fieldFornecedor" list={fornecedoresList} nullable={false} nativeSelect={true} />
            </div>
            
            <Separador titulo="Itens" />
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
                                current.itens.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.nomeItem}</td>
                                            <td className="colunaQuantidade">{value.quantidade}</td>
                                            <td className="colunaValor">{moneyFormater.format(value.valor === null || value.valor === '' ? 0 : value.valor)}</td>
                                            <td className="colunaComando">
                                                <ButtonStyled className="link" title="Excluir item" onClick={() => removerItem(value)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </ButtonStyled>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            {
                                current.itens.length === 0 ?
                                <tr>
                                    <td colSpan={4}>Sem itens</td>
                                </tr> : <></>
                            }
                        </tbody>
                    </TableStyled>
                </div>
                <div className="coluna">
                    <div className="linha">
                        <SelectField label="Item" fieldID="fieldNomeItem" list={itemList} nullable={false} nativeSelect={true} />
                        <TextField label="Quantidade" type="number" defaultValue={0} nullable={false} fieldID="fieldQuantidade" validation={validaValorZerado} />
                        <TextField label="Valor" defaultValue={"0,00"} fieldID="fieldValor" nullable={false} validation={validaSomenteNumeros} />
                    </div>
                    <div className="comandos right">
                        <ButtonStyled className="primary" onClick={adicionarItem}>Adicionar</ButtonStyled>
                        <ButtonStyled onClick={cancelarItem}>Cancelar</ButtonStyled>
                    </div>
                </div>
            </div>

            <div className="comandos">
                <ButtonStyled className="primary" onClick={salvar}>Salvar</ButtonStyled>
                {current.id === null ? <></> : <ButtonStyled className="alert" onClick={excluir}>Excluir</ButtonStyled>}
                <ButtonStyled onClick={cancelar}>Cancelar</ButtonStyled>
            </div>

            {status === EntradaActionTypes.STATUS_EXCLUIR ? <>
                <ChoiceMessage title="Exclusão de Evento de Entrada" text={'Deseja realmente excluir o evento de entrada?'} choices={[ { name: 'Sim', command: acaoExcluir }, { name: 'Não, cancelar!', command: fecharExcluir } ]} />
            </> : <></>}

            {error !== null ? <Message title="Erro no Evento de Entrada" text={error.toString()} closeEvent={fecharExcluir} /> : <></>}
        </Estilo>
    );
}

const EntradaFormularioConnect = connect((state) => {
    return {
        current: state.entrada.currentEntrada,
        status: state.entrada.status,
        itemList: state.entrada.itemList,
        fornecedoresList: state.entrada.fornecedoresList,
        error: state.entrada.error
    }
})(EntradaFormularioPage);

export default EntradaFormularioConnect;