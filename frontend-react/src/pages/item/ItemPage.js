import { connect } from "react-redux";
import ItemAction from "../../actions/ItemAction";
import TextField from "../../components/forms/TextField";
import store from "../../store";
import ButtonStyled from './../../components/ButtonStyled';
import styled from "styled-components";
import TableStyled from "../../components/TableStyled";
import Message from "../../components/Message";
import ChoiceMessage from "../../components/ChoiceMessage";
import ItemActionTypes from "../../constants/ItemActionTypes";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlassCheers, faPen, faSave, faSitemap, faTable, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import LightTableStyled from "../../components/LightTableStyled";

const ItemPageStyled = styled.div`
    width: 100%;

    .space {
        height: 10px;
    }

    table {
        width: 100%;
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

    tr {
        .nomeItemTabela {
            color: #333;
            cursor: pointer;
            font-weight: bold;

            &:hover {
                color: #3399ff;
            }
        }

        .categoriaItemTabela {
            cursor: pointer;
            transition: all 0.25s;

            .cont {
                display: flex;
            }

            .categoria {
                transition: all 0.25s;
                background-color: #39f;
                border-radius: 4px;
                cursor: pointer;
                padding: 7px 10px;
                font-size: 10px;
                font-weight: bold;
                color: #fff;
            }
        }
    }

    #nomeItem, #categoriaItem {
        text-transform: uppercase;
    }

    .contador {
        color: #AAA;
        padding: 0px 14px 14px;
        text-align: right;
        width: 100%;
    }

    .font14 {
        padding: 7px;
        font-size: 12px !important;
        text-transform: lowercase capitalize;
    }
`;

function ItemPage({ status, itens, error, current, size, page, pageInfo }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Itens';
        atualizar();
        store.dispatch(ItemAction.statusOcioso());
        setConstructorHasRun(true);
    };

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

    function atualizar() {
        store.dispatch(ItemAction.buscarTodos({ termo: document.getElementById('termoBusca') ? document.getElementById('termoBusca').value : '' }));
    }

    function buscarPagina(pagina) {
        store.dispatch(ItemAction.buscarPagina({ pagina: pagina - 1 }));
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

    constructor();

    return (
        <ItemPageStyled>
            <div className="cabecalho">
                <h1><FontAwesomeIcon icon={faSitemap} />Itens</h1>
            </div>
            
            <div className="commandButtons">
                <ButtonStyled onClick={atualizar}>Buscar</ButtonStyled>
                <TextField placeholder="Buscar pelo nome ou categoria" fieldID="termoBusca" />
            </div>

            <div className="containerTabela">
                <LightTableStyled>
                    <thead>
                        <tr>
                            <th width="65%">Nome do Item</th>
                            <th width="20%">Categoria</th>
                            <th width="15%" className="alignRight">Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status === ItemActionTypes.STATUS_OCIOSO || status === ItemActionTypes.STATUS_ALTERAR || status === ItemActionTypes.STATUS_EXCLUIR ?
                        <tr className="nohover">
                            <td colSpan={3}><ButtonStyled className="primary" onClick={mostrarFormularioCadastrar}>Novo Item</ButtonStyled></td>
                        </tr>
                        : <></>}
                        {status === ItemActionTypes.STATUS_CADASTRAR ?
                        <tr className="nohover">
                            <td>
                                <TextField placeholder="Nome do Item" fieldID="nomeItem" defaultValue={current.nome} nullable={false} />
                            </td>
                            <td>
                                <TextField placeholder="Categoria" fieldID="categoriaItem" defaultValue={document.getElementById('termoBusca').value} />
                            </td>
                            <td className="buttonCell alignRight">
                                <ButtonStyled className="primary" title="Salvar" onClick={salvar}><FontAwesomeIcon icon={faSave} /></ButtonStyled>
                                <ButtonStyled onClick={fecharJanela} title="Cancelar"><FontAwesomeIcon icon={faTimes} /></ButtonStyled>
                            </td>
                        </tr>
                        : <></>}
                        {itens.map((item, index) => {
                            if ((status === ItemActionTypes.STATUS_ALTERAR || status === ItemActionTypes.STATUS_EXCLUIR) && current.id === item.item.id) {
                                return (
                                    <tr key={index} className="nohover">
                                        <td>
                                            <TextField placeholder="Nome do Item" fieldID="nomeItem" defaultValue={current.nome} nullable={false} />
                                        </td>
                                        <td>
                                            <TextField placeholder="Categoria" fieldID="categoriaItem" defaultValue={current.categoria} />
                                        </td>
                                        <td className="buttonCell alignRight">
                                            <ButtonStyled className="primary" title="Salvar" onClick={salvar}><FontAwesomeIcon icon={faSave} /></ButtonStyled>
                                            <ButtonStyled className="alert" onClick={() => mostrarFormularioExcluir(item.item)} title="Excluir"><FontAwesomeIcon icon={faTrash} /></ButtonStyled>
                                            <ButtonStyled onClick={fecharJanela} title="Cancelar"><FontAwesomeIcon icon={faTimes} /></ButtonStyled>
                                        </td>
                                    </tr>
                                );
                            } else {
                                return (
                                    <tr key={index}>
                                        <td className="nomeItemTabela" onClick={() => mostrarFormularioAlterar(item.item)}>{item.item.nome}</td>
                                        <td className="categoriaItemTabela">
                                            <div className="cont">
                                                <div className="categoria" title="Filtrar por esta categoria" onClick={() => filtrar(item.item)}>
                                                    {item.item.categoria}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="alignRight">{item.quantidade}</td>
                                    </tr>);
                            }
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="4">
                                <ButtonStyled disabled={page <= 0} onClick={() => buscarPagina(page)}>{'<'}</ButtonStyled>
                                {pageInfo.map((value, index) => {
                                    return ( <ButtonStyled className={value.page === (page + 1) ? 'primary' : ''} key={index} onClick={() => buscarPagina(value.page)}>{value.page}</ButtonStyled> )
                                })}
                                <ButtonStyled disabled={((page + 1) === pageInfo.length) || pageInfo.length === 0} onClick={() => buscarPagina(page + 2)}>{'>'}</ButtonStyled>
                            </th>
                        </tr>
                    </tfoot>
                </LightTableStyled>
            </div>

            {status === ItemActionTypes.STATUS_EXCLUIR ? <>
                <ChoiceMessage title="Exclusão de item" text={'Deseja realmente excluir o item "' + current.nome + '"?'} choices={[ { name: 'Sim', command: excluir }, { name: 'Não, cancelar!', command: fecharJanela } ]} />
            </> : <></>}

            {error !== null ? <Message title="Erro no Item" text={error.toString()} closeEvent={fecharMensagemErro} /> : <></>}
        </ItemPageStyled>
    );
};

const ItemPageConnected = connect((state) => { 
    return {
        status: state.item.status,
        itens: state.item.list,
        error: state.item.error,
        current: state.item.currentItem,
        size: state.item.size,
        page: state.item.page,
        pageInfo: state.item.pageInfo
    }
 })(ItemPage);

export default ItemPageConnected;