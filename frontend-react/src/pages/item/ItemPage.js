import { connect } from "react-redux";
import ItemAction from "../../actions/ItemAction";
import TextField from "../../components/forms/TextField";
import store from "../../store";
import ButtonStyled from './../../components/ButtonStyled';
import styled from "styled-components";
import TableStyled from "../../components/TableStyled";
import Message from "../../components/Message";
import JanelaStyled from "../../components/JanelaStyled";
import ChoiceMessage from "../../components/ChoiceMessage";
import ItemActionTypes from "../../constants/ItemActionTypes";

const ItemIndexStyled = styled.div`
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
        padding: 14px;
        text-align: right;
        width: 100%;
    }
`;

function ItemPage({ status, itens, error, current, size, page }) {

    function mostrarFormularioCadastrar() {
        store.dispatch(ItemAction.statusCadastrar());
    }

    function mostrarFormularioAlterar(item) {
        store.dispatch(ItemAction.statusAlterar(item));
    }

    function mostrarFormularioExcluir(item) {
        store.dispatch(ItemAction.statusExcluir(item));
    }

    function salvar() {
        var curr = current;
        curr.nome = document.getElementById('nomeItem').value;
        curr.categoria = document.getElementById('categoriaItem').value;

        if (status === ItemActionTypes.STATUS_CADASTRAR) {
            store.dispatch(ItemAction.cadastrar(curr));
        } else
        if (status === ItemActionTypes.STATUS_ALTERAR) {
            store.dispatch(ItemAction.alterar(curr));
        }
    }
    
    function excluir() {
        store.dispatch(ItemAction.excluir(current));
    }

    function reset() {
        document.getElementById('termoBusca').value = '';
        atualizar();
    }

    function atualizar() {
        store.dispatch(ItemAction.buscarTodos({ termo: document.getElementById('termoBusca').value }));
    }

    function buscarMais() {
        if (itens.length === 0) {
            store.dispatch(ItemAction.buscarTodos({ termo: document.getElementById('termoBusca').value }));
        } else {
            store.dispatch(ItemAction.buscarMais({ termo: document.getElementById('termoBusca').value }));
        }
    }

    function filtrar(item) {
        document.getElementById('termoBusca').value = item.categoria;
        store.dispatch(ItemAction.buscarTodos({ termo: item.categoria }));
    }

    function fecharMensagemErro() {
        store.dispatch(ItemAction.resetarErro());
    }

    function fecharJanela() {
        store.dispatch(ItemAction.statusOcioso());
    }

    return (
        <ItemIndexStyled>
            <h1>Gestão de Itens</h1>
            <span className="lead">Gerencie os itens que serão manipulados dentro do seu controle de estoque</span>
            
            <div className="commandButtons">
                <ButtonStyled onClick={reset}>Reset</ButtonStyled>
                <ButtonStyled onClick={atualizar}>Buscar</ButtonStyled>
                <TextField placeholder="Buscar pelo nome ou categoria" fieldID="termoBusca" />
                <ButtonStyled className="primary" onClick={mostrarFormularioCadastrar}>Cadastrar</ButtonStyled>
            </div>

            <div className="containerTabela">
                <TableStyled>
                    <thead>
                        <tr>
                            <th width="80%">Nome do Item</th>
                            <th width="20%">Categoria</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itens.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.nome}</td>
                                    <td><a href="#" onClick={() => filtrar(item)}>{item.categoria}</a></td>
                                    <td className="buttonCell">
                                        <ButtonStyled onClick={() => mostrarFormularioAlterar(item)}>Alterar</ButtonStyled>
                                        <ButtonStyled className="alert" onClick={() => mostrarFormularioExcluir(item)}>Excluir</ButtonStyled>
                                    </td>
                                </tr>);
                        })}
                        {(itens.length === 0 || ((page + 1) * size) <= itens.length) ?
                        <tr>
                            <td colSpan={3}><ButtonStyled style={{width: '100%'}} className="transparent" onClick={buscarMais}>Mais {size} registros...</ButtonStyled></td>
                        </tr> : <></>}
                    </tbody>
                </TableStyled>
                <div className="contador">
                    {itens.length === 1 ? '1 item em exibição' : itens.length + ' itens em exibição'}
                </div>
            </div>

            {status === ItemActionTypes.STATUS_CADASTRAR || status === ItemActionTypes.STATUS_ALTERAR ? <>
                <JanelaStyled>
                    <div className="content">
                        <div className="title">Formulário de Item</div>
                        <div className="innerContent">
                            {status === ItemActionTypes.STATUS_ALTERAR ? <TextField label="ID do Item" fieldID="idItem" defaultValue={current.id} disabled={current.id !== null} /> : <></> }
                            <div className="space"></div>
                            <TextField label="Nome do Item" fieldID="nomeItem" defaultValue={current.nome} nullable={false} />
                            <div className="space"></div>
                            <TextField label="Categoria" fieldID="categoriaItem" defaultValue={current.categoria} />
                            <div className="space"></div>
                            <div className="commands">
                                <ButtonStyled className="primary" onClick={salvar}>Salvar</ButtonStyled>
                                <ButtonStyled onClick={fecharJanela}>Fechar</ButtonStyled>
                            </div>
                        </div>
                    </div>
                </JanelaStyled>
            </> : <></>}

            {status === ItemActionTypes.STATUS_EXCLUIR ? <>
                <ChoiceMessage title="Exclusão de item" text={'Deseja realmente excluir o item "' + current.nome + '"?'} choices={[ { name: 'Sim', command: excluir }, { name: 'Não, cancelar!', command: fecharJanela } ]} />
            </> : <></>}

            {error !== null ? <Message text={error.toString()} closeEvent={fecharMensagemErro} /> : <></>}
        </ItemIndexStyled>
    );
};

const ItemPageConnected = connect((state) => { 
    return {
        status: state.item.status,
        itens: state.item.list,
        error: state.item.error,
        current: state.item.currentItem,
        size: state.item.size,
        page: state.item.page
    }
 })(ItemPage);

export default ItemPageConnected;