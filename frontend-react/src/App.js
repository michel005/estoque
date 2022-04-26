import { faBell, faBox, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { connect } from "react-redux";
import {
    Route,
    Routes,
    useNavigate
} from "react-router-dom";
import styled from 'styled-components';
import FornecedorAction from "./actions/FornecedorAction";
import PaginaAction from "./actions/PaginaAction";
import SearchComponent from "./components/SearchComponent";
import EntradaPageConnected from "./pages/entrada/EntradaPage";
import FornecedorFormularioConnect from "./pages/fornecedor/FornecedorFormularioPage";
import ItemFormularioConnect from "./pages/item/ItemFormularioPage";
import EntradaFormularioConnect from "./pages/entrada/EntradaFormularioPage";
import FornecedorPageConnected from "./pages/fornecedor/FornecedorPage";
import InicioPageConnected from "./pages/inicio/InicioPage";
import ItemPageConnected from "./pages/item/ItemPage";
import store from "./store";
import ItemAction from "./actions/ItemAction";
import EntradaAction from "./actions/EntradaAction";

const DefaultMenuStyled = styled.div`
    background-color: #39f;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    box-shadow: #3336 2px 0px 7px;

    @media print {
        display: none;
    }

    .tamanhoTela {
        display: flex;
        flex-direction: column;
        width: 1200px;
        max-width: 1200px;

        .appTitle {
            color: #fff;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            padding: 14px 0px;
            transition: all 0.25s;
            margin-bottom: -10px;
            width: 100%;

            & > button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                display: flex;
                flex-direction: row;
                color: #fff;
                text-decoration: none;
                margin-right: 7px;
                font-size: 24px;
                width: 260px;
                max-width: 260px;
            }

            .menuUsuario {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                width: 260px;
                max-width: 260px;

                & > * {
                    margin-left: 28px;
                }

                .botaoCadastro, .botaoNotificacao {
                    background-color: #fff3;
                    border: none;
                    border-radius: 18px;
                    color: #fff;
                    cursor: pointer;
                    margin-top: 10px;
                    margin-left: 14px;
                    height: 36px;
                    width: 36px;
                    font-size: 14px;
                    text-align: center;
                    transition: all 0.25s;

                    &:hover {
                        background-color: #fff9;
                    }
                }

                .imagemUsuario {
                    background-image: url(https://randomuser.me/api/portraits/men/81.jpg);
                    background-size: cover;
                    border-radius: 100px;
                    border: 2px solid #fffc;
                    height: 60px;
                    width: 60px;
                }
                
                .menuCadastrar {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 10px;
                    transform: translateX(-141px);
                    z-index: 100;

                    .opcoesCadastrar {
                        background-color: #3939;
                        backdrop-filter: blur(15px);
                        border-radius: 4px;
                        box-shadow: #3333 0px 0px 7px;
                        display: flex;
                        flex-direction: column;
                        position: fixed;
                        width: 130px;
                        opacity: 0;
                        transition: all 0.25s;
                        transform: translate(-37px, -54px) scale(0);
                        overflow: hidden;
                        z-index: 1;

                        .titulo {
                            padding: 7px;
                            color: #fff;
                            text-align: center;
                            background-color: #fff6;
                            font-size: 14px;
                        }

                        button {
                            background-color: transparent;
                            border: none;
                            cursor: pointer;
                            margin: 0px;
                            width: 100%;
                            text-align: left;
                            padding: 7px;
                            color: #fff;
                            font-size: 14px;
                            font-weight: normal;
                            z-index: 10;

                            &:hover {
                                background-color: #fff3;
                                border-radius: 0px;
                            }
                        }
                    }

                    &.fixar {
                        .opcoesCadastrar {
                            display: flex;
                            z-index: 100;
                            transform: translate(-37px, 54px) scale(1);
                            opacity: 1;
                        }
                    }
                }

                .menuNotificacao {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 10px;
                    transform: translateX(-86px);
                    z-index: 100;

                    button.menuPrincipal {
                        margin: 0px;
                        margin-top: 12px;
                        height: 36px;
                        width: 36px;
                        z-index: 10;
                    }

                    .opcoesNotificacao {
                        background-color: #3339;
                        backdrop-filter: blur(15px);
                        border-radius: 4px;
                        box-shadow: #3333 0px 0px 7px;
                        display: flex;
                        opacity: 0;
                        flex-direction: column;
                        position: fixed;
                        width: 300px;
                        transition: all 0.25s;
                        transform: translate(-40%, -30%) scale(0);
                        overflow: hidden;
                        z-index: 1;

                        .titulo {
                            padding: 7px;
                            color: #fff;
                            text-align: center;
                            background-color: #fff6;
                        }

                        .notificacao {
                            margin: 7px;
                            transition: all 0.5s;

                            &:hover {
                                background-color: #fff3;
                                border-radius: 4px;
                            }

                            .tituloNotificacao {
                                display: flex;
                                flex-direction: row;
                                padding: 7px 7px 0px;

                                .texto {
                                    font-weight: bold;
                                    flex-grow: 1;
                                    font-size: 14px;
                                }
                            }

                            p {
                                padding: 7px;
                                font-size: 14px;
                            }
                        }
                    }

                    &.fixar {
                        .opcoesNotificacao {
                            transform: translate(-47px, 54px) scale(1);
                            display: flex;
                            z-index: 100;
                            opacity: 1;
                        }
                    }
                }
            }
        }

        .menuOptions {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-top: -14px;
            width: 100%;

            button {
                background-color: transparent;
                border: 2px solid transparent;
                border-radius: 0px;
                border-width: 0px 0px 2px 0px;
                color: #fff7;
                cursor: pointer;
                display: flex;
                flex-direction: row;
                font-size: 14px;
                font-weight: normal;
                justify-content: flex-start;
                padding: 12px 19px;
                text-decoration: none;
                transition: all 0.25s;

                &:hover {
                    color: #fff;
                }

                &.active {
                    color: #fff;
                    border-color: #FFF;
                    border-width: 0px 0px 2px 0px;
                    transform: translateY(-2px);
                }
            }
        }
    }
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    z-index: 0;

    .tamanhoTela {
        display: flex;
        width: 1200px;
        padding: 14px 0px;
        padding-top: 28px;
    }
`;

const AppStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
`;

function App({ paginaAtual }) {

    const [fixarCadastrar, setFixarCadastrar] = useState(false);
    const [fixarNotificacoes, setFixarNotificacoes] = useState(false);
    const navigate = useNavigate();

    function cadastrarFornecedor() {
        navigate('/fornecedores');
        store.dispatch(FornecedorAction.statusOcioso());
        setTimeout(() => {
            store.dispatch(FornecedorAction.statusCadastrar());
        }, 100);
        setFixarCadastrar(false);
    }

    function cadastrarItem() {
        navigate('/itens');
        store.dispatch(ItemAction.statusOcioso());
        setTimeout(() => {
            store.dispatch(ItemAction.statusCadastrar());
        }, 100);
        setFixarCadastrar(false);
    }

    function cadastrarEntrada() {
        navigate('/entradas');
        store.dispatch(EntradaAction.statusOcioso());
        setTimeout(() => {
            store.dispatch(EntradaAction.statusCadastrar());
        }, 100);
        setFixarCadastrar(false);
    }

    function navegar(link) {
        store.dispatch(PaginaAction.mudarPaginaAtual('inicio'));
        navigate(link);
    }

    function curentLink() {
        var url = window.location.href;
        url = url.replace(window.location.protocol, '').replace('/' + window.location.host + '/', '');
        return url;
    }

    return (
        <AppStyled>
            <DefaultMenuStyled>
                <div className="tamanhoTela">
                    <div className="appTitle noprint">
                        <button onClick={ () => navegar('/') }>{store.getState().appName}</button>
                        <SearchComponent />
                        <div className="menuUsuario">
                            <div className={'menuCadastrar ' + (fixarCadastrar === true ? 'fixar' : '')}>
                                <button className="botaoCadastro" onClick={() => { setFixarCadastrar(!fixarCadastrar); setFixarNotificacoes(false); }}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <div className="opcoesCadastrar">
                                    <div className="titulo">Cadastrar</div>
                                    <button className="link" onClick={cadastrarFornecedor}>Fornecedor</button>
                                    <button className="link" onClick={cadastrarItem}>Item</button>
                                    <button className="link" onClick={cadastrarEntrada}>Entrada</button>
                                    <button className="link">Saída</button>
                                </div>
                            </div>
                            <div className={'menuNotificacao ' + (fixarNotificacoes === true ? 'fixar' : '')}>
                                <button className="botaoNotificacao" onClick={() => { setFixarNotificacoes(!fixarNotificacoes); setFixarCadastrar(false); }}>
                                    <FontAwesomeIcon icon={faBell} />
                                </button>
                                <div className="opcoesNotificacao">
                                    <div className="titulo">Notificações</div>
                                    <div className="notificacao">
                                        <div className="tituloNotificacao">
                                            <div className="texto">Fornecedores</div>
                                            <FontAwesomeIcon icon={faBox} />
                                        </div>
                                        <p>Um novo fornecedor foi cadastrado</p>
                                    </div>
                                    <div className="notificacao">
                                        <div className="tituloNotificacao">
                                            <div className="texto">Fornecedores</div>
                                            <FontAwesomeIcon icon={faBox} />
                                        </div>
                                        <p>Um novo fornecedor foi cadastrado</p>
                                    </div>
                                    <div className="notificacao">
                                        <div className="tituloNotificacao">
                                            <div className="texto">Fornecedores</div>
                                            <FontAwesomeIcon icon={faBox} />
                                        </div>
                                        <p>Um novo fornecedor foi cadastrado</p>
                                    </div>
                                </div>
                            </div>
                            <div className="imagemUsuario"></div>
                        </div>
                    </div>
                    <div className="menuOptions">
                        <button className={curentLink() === '/' ? 'active' : ''} onClick={ () => navegar('/') }>Início</button>
                        <button className={paginaAtual === 'novoFornecedor' || curentLink() === '/fornecedores' ? 'active' : ''} onClick={ () => navegar('/fornecedores') }>Fornecedores</button>
                        <button className={paginaAtual === 'novoItem' || curentLink() === '/itens' ? 'active' : ''} onClick={ () => navegar('/itens') }>Itens</button>
                        <button className={paginaAtual === 'novaEntrada' || curentLink() === '/entradas' ? 'active' : ''} onClick={ () => navegar('/entradas') }>Entradas</button>
                        <button className={paginaAtual === 'novaSaida' || curentLink() === '/saidas' ? 'active' : ''} onClick={ () => navegar('/saidas') }>Saídas</button>
                        <button className={curentLink() === '/inventario' ? 'active' : ''} onClick={ () => navegar('/inventario') }>Inventário</button>
                        <button className={curentLink() === '/faturamento' ? 'active' : ''} onClick={ () => navegar('/faturamento') }>Faturamento</button>
                    </div>
                </div>
            </DefaultMenuStyled>
            <Content>
                <div className="tamanhoTela">
                    {
                        (paginaAtual === 'novoFornecedor'
                        ? 
                        <FornecedorFormularioConnect />
                        :
                        (paginaAtual === 'novoItem'
                        ? 
                        <ItemFormularioConnect />
                        :
                        (paginaAtual === 'novaEntrada'
                        ? 
                        <EntradaFormularioConnect />
                        :
                        <Routes>
                            <Route exact path='/' element={<InicioPageConnected />} />
                            <Route path='/fornecedores' element={<FornecedorPageConnected />} />
                            <Route path='/itens' element={<ItemPageConnected />} />
                            <Route path='/entradas' element={<EntradaPageConnected />} />
                            <Route path='/saidas' element={<h1>Saídas</h1>} />
                            <Route path='/inventario' element={<h1>Inventário</h1>} />
                            <Route path='/faturamento' element={<h1>Faturamento</h1>} />
                        </Routes>)))
                    }
                </div>
            </Content>
        </AppStyled>
    );

}

const AppConnector = connect((state) => { 
    return {
        paginaAtual: state.pagina.atual
    }
 })(App);

 export default AppConnector;