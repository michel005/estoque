import { faAddressBook, faArrowDown, faArrowUp, faBell, faBox, faHome, faSitemap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Route,
    Routes,
    NavLink
} from "react-router-dom";
import styled from 'styled-components';
import './App.scss';
import EntradaPageConnected from "./pages/entrada/EntradaPage";
import FornecedorPageConnected from "./pages/fornecedor/FornecedorPage";
import ItemPageConnected from "./pages/item/ItemPage";

const DefaultMenuStyled = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 300px;

    .appTitle {
        color: #000;
        display: flex;
        flex-direction: row;
        font-size: 24px;
        font-weight: bold;
        padding: 21px;
        justify-content: flex-start;
        word-wrap: break-word;
        transition: all 0.3s;

        a {
            color: #fff;
            text-decoration: none;
        }

        .logo {
            background-color: #39f;
            color: #fff;
            border-radius: 7px;
            font-size: 20px;
            padding: 9px 12px 10px;
        }
    }

    .menuOptions {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        a {
            border-radius: 7px;
            color: #666;
            display: flex;
            flex-direction: row;
            font-size: 18px;
            font-weight: bold;
            justify-content: flex-start;
            padding: 10px 14px;
            margin: 7px;
            text-decoration: none;
            transition: all 0.25s;

            svg {
                margin-right: 14px;
                margin-top: 2px;
                width: 20px;
            }

            &:hover {
                color: #000;
            }

            &.active {
                color: #3399ff;
            }
        }
    }
`;

const Content = styled.div`
    display: flex;
    flex-grow: 1;
    overflow: auto;
    padding: 14px 21px;
    width: 100%;
    height: 100%;
    z-index: 0;

    .cabecalho {
        display: flex;
        flex-direction: row;
        width: 100%;

        h1 {
            font-weight: normal;
            font-size: 36px;
        }

        svg {
            margin-right: 14px;
        }
    }
`;

const AppStyled = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100%;
`;

export default function App() {

    return (
        <AppStyled>
            <DefaultMenuStyled>
                <div className="appTitle">
                    <div className="logo">
                        <NavLink to="/"><FontAwesomeIcon icon={faBox} /></NavLink>
                    </div>
                </div>
                <div className="menuOptions">
                    <NavLink to="/"><FontAwesomeIcon icon={faHome} /> Início</NavLink>
                    <NavLink to="/fornecedores"><FontAwesomeIcon icon={faAddressBook} /> Fornecedores</NavLink>
                    <NavLink to="/itens"><FontAwesomeIcon icon={faSitemap} /> Itens</NavLink>
                    <NavLink to="/entradas"><FontAwesomeIcon icon={faArrowUp} /> Entradas</NavLink>
                    <NavLink to="/saidas"><FontAwesomeIcon icon={faArrowDown} /> Saídas</NavLink>
                    <NavLink to="/notificacoes"><FontAwesomeIcon icon={faBell} /> Notificações</NavLink>
                </div>
            </DefaultMenuStyled>
            <Content>
                <Routes>
                    <Route exact path='/' element={<h1>Início</h1>} />
                    <Route path='/fornecedores' element={<FornecedorPageConnected />} />
                    <Route path='/itens' element={<ItemPageConnected />} />
                    <Route path='/entradas' element={<EntradaPageConnected />} />
                    <Route path='/saidas' element={<h1>Saídas</h1>} />
                </Routes>
            </Content>
        </AppStyled>
    );

}