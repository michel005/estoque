import {
    Route,
    Routes,
    NavLink
} from "react-router-dom";
import styled from 'styled-components';
import './App.scss';
import EntradaPage from "./pages/entrada/EntradaPage";
import ItemPageConnected from "./pages/item/ItemPage";
import store from './store';

const DefaultMenuStyled = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 100;

    .appTitle {
        background-color: #111;
        color: #fff;
        display: flex;
        flex-direction: column;
        font-size: 20px;
        font-weight: bold;
        padding: 14px;
        justify-content: center;
        transition: all 0.3s;
    }

    .menuOptions {
        background-color: #3339;
        backdrop-filter: blur(15px);
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        justify-content: flex-start;

        a {
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 10px 14px;
            text-decoration: none;
            transition: all 0.5s;

            &:hover {
                background-color: #39f;
            }

            &.active {
                color: #111;
                background-color: #ccc;
            }
        }
    }
`;

const Content = styled.div`
    position: fixed;
    top: 0px;
    display: flex;
    flex-grow: 1;
    margin-top: 96px;
    overflow: auto;
    padding: 14px;
    width: 100%;
    height: calc(100% - 96px);
    z-index: 0;
`;

const AppStyled = styled.div`
    display: flex;
    height: 100%;
`;

export default function App() {

    return (
        <AppStyled>
            <DefaultMenuStyled>
                <div className="appTitle">{store.getState().appName}</div>
                <div className="menuOptions">
                    <NavLink to="/">Início</NavLink>
                    <NavLink to="/itens">Itens</NavLink>
                    <NavLink to="/entradas">Entradas</NavLink>
                    <NavLink to="/saidas">Saídas</NavLink>
                </div>
            </DefaultMenuStyled>
            <Content>
                <Routes>
                    <Route exact path='/' element={<h1>Início</h1>} />
                    <Route path='/itens' element={<ItemPageConnected />} />
                    <Route path='/entradas' element={<EntradaPage />} />
                    <Route path='/saidas' element={<h1>Saídas</h1>} />
                </Routes>
            </Content>
        </AppStyled>
    );

}