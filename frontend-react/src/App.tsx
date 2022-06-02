import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
    Route,
    Routes,
    useNavigate
} from "react-router-dom";
import styled from 'styled-components';
import SearchComponent from "./components/SearchComponent";
import InicioPageConnected from "./pages/inicio/InicioPage";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import ItemPage from "./pages/item/ItemPage";
import EntradaPage from "./pages/entrada/EntradaPage";
import useBuscaPaginada from "./hookies/useBuscaPaginada";
import FornecedorPage from "./pages/fornecedor/FornecedorPage";
import Message from "./components/Message";
import GeneralConstants from "./constants/GeneralConstants";

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
        padding-top: 14px;
    }
`;

const AppStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
`;

function App() {

    const [fixarCadastrar, setFixarCadastrar] = useState(false);
    const [fixarNotificacoes, setFixarNotificacoes] = useState(false);
    const [erro, setErro] = useState<any>(null);
    const navigate = useNavigate();

    const {
        lista: item_lista, termoBuscaSalvo: item_termoBuscaSalvo, pageInfo: item_pageInfo, buscarTodos: item_buscarTodos
    } = useBuscaPaginada({
        urlBuscaPaginada: '/item/buscaTudoComQuantidade?pagina=@#PAGINA@#&tamanho=@#TAMANHO@#',
        setErro: setErro
    });

    const {
        lista: entrada_lista, termoBuscaSalvo: entrada_termoBuscaSalvo, pageInfo: entrada_pageInfo, buscarTodos: entrada_buscarTodos
    } = useBuscaPaginada({
        urlBuscaPaginada: '/evento/entrada/buscaPorDataEntrada?pagina=@#PAGINA@#&tamanho=@#TAMANHO@#',
        setErro: setErro
    });

    const {
        lista: fornecedor_lista, termoBuscaSalvo: fornecedor_termoBuscaSalvo, pageInfo: fornecedor_pageInfo, buscarTodos: fornecedor_buscarTodos
    } = useBuscaPaginada({
        urlBuscaPaginada: '/fornecedor/buscaPaginadaPorTermos?pagina=@#PAGINA@#&tamanho=@#TAMANHO@#',
        setErro: setErro
    });

    function cadastrarFornecedor() {
        setFixarCadastrar(false);
    }

    function cadastrarItem() {
        setFixarCadastrar(false);
    }

    function cadastrarEntrada() {
        setFixarCadastrar(false);
    }

    function navegar(link: string) {
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
                        <button onClick={ () => navegar('/') }>{GeneralConstants.AppName}</button>
                        <SearchComponent />
                        <div className="menuUsuario">
                            <div className={'menuCadastrar ' + (fixarCadastrar === true ? 'fixar' : '')}>
                                <button className="botaoCadastro" onClick={() => { setFixarCadastrar(!fixarCadastrar); setFixarNotificacoes(false); }}>
                                    <FontAwesomeIcon icon={solid('plus')} />
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
                                    <FontAwesomeIcon icon={solid('bell')} />
                                </button>
                                <div className="opcoesNotificacao">
                                    <div className="titulo">Notificações</div>
                                    <div className="notificacao">
                                        <div className="tituloNotificacao">
                                            <div className="texto">Fornecedores</div>
                                            <FontAwesomeIcon icon={solid('box')} />
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
                        <button className={curentLink() === '/fornecedores' ? 'active' : ''} onClick={ () => navegar('/fornecedores') }>Fornecedores</button>
                        <button className={curentLink() === '/itens' ? 'active' : ''} onClick={ () => navegar('/itens') }>Itens</button>
                        <button className={curentLink() === '/entradas' ? 'active' : ''} onClick={ () => navegar('/entradas') }>Entradas</button>
                        <button className={curentLink() === '/saidas' ? 'active' : ''} onClick={ () => navegar('/saidas') }>Saídas</button>
                        <button className={curentLink() === '/inventario' ? 'active' : ''} onClick={ () => navegar('/inventario') }>Inventário</button>
                        <button className={curentLink() === '/faturamento' ? 'active' : ''} onClick={ () => navegar('/faturamento') }>Faturamento</button>
                    </div>
                </div>
            </DefaultMenuStyled>
            <Content>
                <div className="tamanhoTela">
                    {
                        <Routes>
                            <Route path='/' element={<InicioPageConnected />} />
                            <Route path='/fornecedores' element={<FornecedorPage setErro={setErro} lista={fornecedor_lista} termoBuscaSalvo={fornecedor_termoBuscaSalvo} pageInfo={fornecedor_pageInfo} buscarTodos={fornecedor_buscarTodos} />} />
                            <Route path='/itens' element={<ItemPage setErro={setErro} lista={item_lista} termoBuscaSalvo={item_termoBuscaSalvo} pageInfo={item_pageInfo} buscarTodos={item_buscarTodos} />} />
                            <Route path='/entradas' element={<EntradaPage setErro={setErro} lista={entrada_lista} termoBuscaSalvo={entrada_termoBuscaSalvo} pageInfo={entrada_pageInfo} buscarTodos={entrada_buscarTodos} />} />
                            <Route path='/saidas' element={<h1>Saídas</h1>} />
                            <Route path='/inventario' element={<h1>Inventário</h1>} />
                            <Route path='/faturamento' element={<h1>Faturamento</h1>} />
                        </Routes>
                    }
                </div>
                {erro !== null && <Message text={erro} closeEvent={() => setErro(null)} />}
            </Content>
        </AppStyled>
    );

}

 export default App;