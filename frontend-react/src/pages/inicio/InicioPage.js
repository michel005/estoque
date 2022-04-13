import { connect } from "react-redux";
import ItemAction from "../../actions/ItemAction";
import store from "../../store";
import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const InicioPageStyle = styled.div`
    width: 100%;
`;

function InicioPage({ status, itens, error, current, page, pageInfo, categorias }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Início';
        store.dispatch(ItemAction.statusOcioso());
        setConstructorHasRun(true);
    };

    constructor();

    return (
        <InicioPageStyle>
            <div className="cabecalho">
                <h1><FontAwesomeIcon icon={faHome} />Início</h1>
            </div>
        </InicioPageStyle>
    );
};

const InicioPageConnected = connect((state) => { 
    return {
        inicio: state.inicio
    }
 })(InicioPage);

export default InicioPageConnected;