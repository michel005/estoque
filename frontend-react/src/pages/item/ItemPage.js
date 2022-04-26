import { connect } from "react-redux";
import ItemAction from "../../actions/ItemAction";
import store from "../../store";
import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "../../components/forms/TextField";
import SelectField from "../../components/forms/SelectField";
import ButtonStyled from "../../components/ButtonStyled";
import { faArrowDown, faBackward, faEllipsisV, faEraser, faFastBackward, faFastForward, faForward, faSearch } from "@fortawesome/free-solid-svg-icons";

const ItemPageStyled = styled.div`
    width: 100%;

    .filtros {
        display: flex;
        flex-direction: column;
        margin-bottom: 21px;

        .linha {
            display: flex;
            flex-direction: row;

            .campo {
                margin-right: 14px;
                width: 100%;
            }

            .comandos {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                margin-right: 0px;
                width: auto;

                .botoes {
                    display: flex;
                    flex-direction: row;

                    button {
                        min-width: 40px;
                        border-radius: 0px;

                        &:first-child {
                            border-top-left-radius: 4px;
                            border-bottom-left-radius: 4px;
                        }

                        &:last-child {
                            border-top-right-radius: 4px;
                            border-bottom-right-radius: 4px;
                        }
                    }
                }
            }
        }
    }

    .lista {
        .item {
            background-color: #fff;
            display: flex;
            flex-direction: column;
            width: 100%;
            transition: all 0.25s;
            border: 2px solid #fff;

            &:hover {
                border: 2px solid #39f;
            }

            &.nohover {
                background-color: transparent;
                border: 2px solid transparent;
            }

            &.nohover:hover {
                background-color: transparent;
                border: 2px solid transparent;
            }

            .linha {
                display: flex;
                flex-direction: row;
                flex-flow: row;
                width: 100%;
                transition: all 0.25s;

                &:hover {
                    background-color: #f4f4f4;
                }

                .coluna {
                    color: #999;
                    display: flex;
                    flex-direction: row;
                    text-align: left;
                    padding: 14px;
                    width: calc((100% - 80px) / 3);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-wrap: break-word;
                    word-break: break-all;

                    &.id {
                        width: 80px;
                    }

                    &.nome {
                        font-weight: bold;
                        flex-grow: 1;
                    }

                    &.quantidade {
                        cursor: auto !important;
                        justify-content: flex-end;
                        width: 150px;
                    }

                    &.valor {
                        cursor: auto !important;
                        justify-content: flex-end;
                        width: 200px;
                    }

                    &.comandoslinha {
                        justify-content: flex-end;
                        width: 80px;

                        .botaoDetalhes {
                            margin-right: 21px;

                            & > button {
                                color: #999;
                            }

                            .opcoesItem {
                                background-color: #3339;
                                backdrop-filter: blur(5px);
                                border-radius: 4px;
                                padding: 7px;
                                display: flex;
                                flex-direction: column;
                                position: absolute;
                                transform: scale(0);
                                transition: all 0.25s;
                                z-index: 100;

                                button {
                                    width: 100px;
                                    background-color: transparent;

                                    .text {
                                        display: block;
                                    }

                                    &:hover {
                                        background-color: #3339;
                                    }
                                }
                            }

                            &.mostrar {
                                .opcoesItem {
                                    transform: scale(1);
                                }
                            }
                        }
                    }
                }

                &.cabecalho {
                    background-color: transparent;

                    .coluna {
                        color: #666;
                        cursor: pointer;
                        font-weight: bold;
                        transition: all 0.25s;

                        .orderBy {
                            margin-left: 4px;
                            transition: all 0.25s;

                            &.orderByDesc {
                                transform: rotate(180deg);
                            }
                        }
                    }
                }
            }
        }
    }

    .paginacao {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 100%;
        padding: 14px;
        background-color: #fff;

        button {
            margin-right: 7px;

            &:last-child {
                margin-right: 0px;
            }

            &:disabled {
                opacity: 0.2;
            }
        }
    }
`;

function ItemPage({ item }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [mostrarMenu, setMostrarMenu] = useState(null);
    const [sortType, setSortType] = useState({field: 'item.nome', direction: 'asc'});
    const moneyFormater = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Itens';
        atualizar();
        store.dispatch(ItemAction.statusOcioso());
        setConstructorHasRun(true);
    };

    function atualizar(sortInfo = sortType) {
        setMostrarMenu(null);
        store.dispatch(ItemAction.buscarTodos(
            { 
                nome: document.getElementById('filtroNome') ? document.getElementById('filtroNome').value : '', 
                categoria: document.getElementById('filtroCategoria') ? document.getElementById('filtroCategoria').value : '',
                orderBy: sortInfo.field,
                orderByDirection: sortInfo.direction
            }
        ));
    }

    function buscarPagina(pagina) {
        store.dispatch(ItemAction.buscarPagina({ pagina: pagina }));
    }

    function limpar() {
        
    }

    function order(field) {
        if (sortType.field === field) {
            return (<div className={'orderBy ' + (sortType.direction === 'desc' ? 'orderByDesc' : '')}><FontAwesomeIcon icon={faArrowDown} /></div>);
        }
        return <></>;
    }

    function mudarOrder(fd) {
        var dir = ( sortType.field === fd ) ? ( sortType.direction === 'asc' ? 'desc' : 'asc' ) : 'asc';
        setSortType({field: fd, direction: dir });
        atualizar({field: fd, direction: dir });
    }

    function eventoMostrarMenu(it) {
        setMostrarMenu(mostrarMenu === null || mostrarMenu.id !== it.id ? it : null);
    }

    function mostrarFormularioAlterar(item) {
        eventoMostrarMenu(item);
        store.dispatch(ItemAction.statusAlterar(item));
    }

    function mostrarFormularioExclusao(item) {
        eventoMostrarMenu(item);
        store.dispatch(ItemAction.statusExcluir(item));
    }

    constructor();

    return (
        <ItemPageStyled>
            <div className="filtros">
                    <div className="linha noFullWidth">
                        <TextField fieldID="filtroNome" label="Nome" />
                        <SelectField fieldID="filtroCategoria" label="Categoria" list={item.categorias} nativeSelect={true} nullableOptionValue="" nullableOptionText="Todas as Categorias" onlyValuesList={true} />
                        <div className="comandos">
                            <div className="botoes">
                                <ButtonStyled title="Buscar" className="primary" onClick={() => atualizar()}><FontAwesomeIcon icon={faSearch} /></ButtonStyled>
                                <ButtonStyled title="Limpar filtros" onClick={() => limpar()}><FontAwesomeIcon icon={faEraser} /></ButtonStyled>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lista">
                    <div className="item nohover">
                        <div className="linha cabecalho">
                            <div className="coluna id">#</div>
                            <div className="coluna nome" onClick={() => mudarOrder('item.nome')}>Nome {order('item.nome')}</div>
                            <div className="coluna categoria" onClick={() => mudarOrder('item.categoria')}>Categoria {order('item.categoria')}</div>
                            <div className="coluna quantidade">Quantidade</div>
                            <div className="coluna valor">Valor Mínimo</div>
                            <div className="coluna valor">Valor Máximo</div>
                            <div className="coluna comandoslinha"></div>
                        </div>
                    </div>
                    {item.list.map((value, index) => {
                        return (
                            <div className="item" key={index}>
                                <div className="linha">
                                    <div className="coluna id">{value.item.id}</div>
                                    <div className="coluna nome">{value.item.nome}</div>
                                    <div className="coluna categoria">{value.item.categoria}</div>
                                    <div className="coluna quantidade">{value.quantidade}</div>
                                    <div className="coluna valor">{moneyFormater.format(value.minValor)}</div>
                                    <div className="coluna valor">{moneyFormater.format(value.maxValor)}</div>
                                    <div className="coluna comandoslinha">
                                        <div className={'botaoDetalhes ' + (mostrarMenu !== null && mostrarMenu.id === value.item.id ? 'mostrar' : '')}>
                                            <ButtonStyled title="Opções" className="link" onClick={() => eventoMostrarMenu(value.item)}><FontAwesomeIcon icon={faEllipsisV} /></ButtonStyled>
                                            <div className="opcoesItem">
                                                <ButtonStyled title="Alterar" onClick={() => mostrarFormularioAlterar(value.item)}>Alterar</ButtonStyled>
                                                <ButtonStyled title="Excluir" onClick={() => mostrarFormularioExclusao(value.item)}>Excluir</ButtonStyled>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="paginacao">
                    <ButtonStyled className="transparent" disabled={item.page <= 0} onClick={() => buscarPagina(0)}><FontAwesomeIcon icon={faFastBackward} /></ButtonStyled>
                    <ButtonStyled className="transparent" disabled={item.page <= 0} onClick={() => buscarPagina(item.page - 1)}><FontAwesomeIcon icon={faBackward} /></ButtonStyled>
                    {item.pageInfo.length === 0 ? <ButtonStyled className="nohover transparent">0</ButtonStyled> : <ButtonStyled className="nohover transparent">Página {item.page + 1} de { item.pageInfo.length }</ButtonStyled> }
                    <ButtonStyled className="transparent" disabled={((item.page + 1) === item.pageInfo.length) || item.pageInfo.length === 0} onClick={() => buscarPagina(item.page + 1)}><FontAwesomeIcon icon={faForward} /></ButtonStyled>
                    <ButtonStyled className="transparent" disabled={((item.page + 1) === item.pageInfo.length) || item.pageInfo.length === 0} onClick={() => buscarPagina(item.pageInfo.length - 1)}><FontAwesomeIcon icon={faFastForward} /></ButtonStyled>
                </div>
        </ItemPageStyled>
    );
};

const ItemPageConnected = connect((state) => { 
    return {
        item: state.item
    }
 })(ItemPage);

export default ItemPageConnected;