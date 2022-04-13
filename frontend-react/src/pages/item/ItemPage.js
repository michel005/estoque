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
        store.dispatch(ItemAction.statusOcioso());
        setConstructorHasRun(true);
    };

    constructor();

    return (
        <ItemPageStyled>
            <div className="cabecalho">
                <h1><FontAwesomeIcon icon={faSitemap} />Itens</h1>
            </div>
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