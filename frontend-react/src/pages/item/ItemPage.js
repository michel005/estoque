import { connect } from "react-redux";
import ItemAction from "../../actions/ItemAction";
import TextField from "../../components/forms/TextField";
import SelectField from "../../components/forms/SelectField";
import store from "../../store";
import ButtonStyled from './../../components/ButtonStyled';
import styled from "styled-components";
import Message from "../../components/Message";
import ChoiceMessage from "../../components/ChoiceMessage";
import ItemActionTypes from "../../constants/ItemActionTypes";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSitemap, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import LightTableStyled from "../../components/LightTableStyled";

const ItemPageStyled = styled.div`
    width: 100%;

    .commandButtons {
        display: flex;
        flex-direction: row;
        margin: 14px 0px;

        .nomeBusca, .tamanhoPagina, .categoriaBusca {
            margin-right: 14px;
        }

        .tamanhoPagina {
            width: 200px;
        }

        .nomeBusca {
            width: 300px;
        }

        .commands {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        button {
            margin-right: 14px;
        }
    }

    table {
        height: calc(100% - 140px);

        tbody {
            height: calc(100% - 64px);
        }
    }

    #nomeItem, #categoriaItem {
        text-transform: uppercase;
    }
`;

function ItemPage({ status, itens, error, current, page, pageInfo, categorias }) {
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
        store.dispatch(ItemAction.preencherTamanhoPagina(!document.getElementById('tamanhoPagina') ? 10 : parseInt(document.getElementById('tamanhoPagina').value)));
        store.dispatch(ItemAction.buscarTodos(
            { 
                nome: document.getElementById('nomeBusca') ? document.getElementById('nomeBusca').value : '',
                categoria: document.getElementById('categoriaBusca') ? document.getElementById('categoriaBusca').value : ''
            }
        ));
    }

    function buscarPagina(pagina) {
        store.dispatch(ItemAction.buscarPagina({ pagina: pagina - 1 }));
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
                <TextField label="Nome" placeholder="Todos os itens" fieldID="nomeBusca" />
                <SelectField label="Categoria" fieldID="categoriaBusca" list={categorias} nativeSelect={true} onlyValuesList={true} nullableOptionText="Todas as Categorias" nullableOptionValue={''} />
                <div className="commands">
                    <div>
                        <ButtonStyled onClick={atualizar}>Buscar</ButtonStyled>
                    </div>
                </div>
            </div>

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
                    <tr colSpan="3" className="nohover">
                        <td><ButtonStyled className="primary" onClick={mostrarFormularioCadastrar}>Novo Item</ButtonStyled></td>
                    </tr>
                    : <></>}
                    {status === ItemActionTypes.STATUS_CADASTRAR ?
                    <tr className="nohover">
                        <td width="65%">
                            <TextField placeholder="Nome do Item" fieldID="nomeItem" defaultValue={current.nome} nullable={false} enterEvent={salvar} />
                        </td>
                        <td width="20%">
                            <SelectField list={categorias} fieldID="categoriaItem" enterEvent={salvar} />
                        </td>
                        <td width="15%" className="buttonCell alignRight">
                            <ButtonStyled className="primary" title="Salvar" onClick={salvar}><FontAwesomeIcon icon={faSave} /></ButtonStyled>
                            <ButtonStyled onClick={fecharJanela} title="Cancelar"><FontAwesomeIcon icon={faTimes} /></ButtonStyled>
                        </td>
                    </tr>
                    : <></>}
                    {itens.map((item, index) => {
                        if ((status === ItemActionTypes.STATUS_ALTERAR || status === ItemActionTypes.STATUS_EXCLUIR) && current.id === item.item.id) {
                            return (
                                <tr key={index} className="nohover">
                                    <td width="65%">
                                        <TextField placeholder="Nome do Item" fieldID="nomeItem" defaultValue={current.nome} nullable={false} enterEvent={salvar} />
                                    </td>
                                    <td width="20%">
                                        <SelectField list={categorias} fieldID="categoriaItem" defaultValue={current.categoria} enterEvent={salvar} />
                                    </td>
                                    <td width="15%" className="buttonCell alignRight">
                                        <ButtonStyled className="primary" title="Salvar" onClick={salvar}><FontAwesomeIcon icon={faSave} /></ButtonStyled>
                                        <ButtonStyled className="alert" onClick={() => mostrarFormularioExcluir(item.item)} title="Excluir"><FontAwesomeIcon icon={faTrash} /></ButtonStyled>
                                        <ButtonStyled onClick={fecharJanela} title="Cancelar"><FontAwesomeIcon icon={faTimes} /></ButtonStyled>
                                    </td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr key={index}>
                                    <td width="65%" className="nomeItemTabela">
                                        <ButtonStyled className="link" onClick={() => mostrarFormularioAlterar(item.item)}>{item.item.nome}</ButtonStyled>
                                    </td>
                                    <td width="20%">{item.item.categoria}</td>
                                    <td width="15%" className="alignRight">{item.quantidade}</td>
                                </tr>);
                        }
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="3">
                            <ButtonStyled disabled={page <= 0} onClick={() => buscarPagina(page)}>{'<'}</ButtonStyled>
                            {pageInfo.map((value, index) => {
                                return ( <ButtonStyled className={value.page === (page + 1) ? 'primary' : ''} key={index} onClick={() => buscarPagina(value.page)}>{value.page}</ButtonStyled> )
                            })}
                            <ButtonStyled disabled={((page + 1) === pageInfo.length) || pageInfo.length === 0} onClick={() => buscarPagina(page + 2)}>{'>'}</ButtonStyled>
                            <SelectField fieldID="tamanhoPagina" onlyValuesList={true} list={[ 10, 20, 50 ]} nullableOption={false} nativeSelect={true} />
                        </th>
                    </tr>
                </tfoot>
            </LightTableStyled>

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
        page: state.item.page,
        pageInfo: state.item.pageInfo,
        categorias: state.item.categorias
    }
 })(ItemPage);

export default ItemPageConnected;