import { connect } from "react-redux";
import ItemAction from "../../actions/ItemAction";
import store from "../../store";
import styled from "styled-components";
import { useState } from "react";

const InicioPageStyle = styled.div`
    width: 100%;
`;

function InicioPage({ inicio }) {
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
        </InicioPageStyle>
    );
};

const InicioPageConnected = connect((state) => { 
    return {
        inicio: state.inicio
    }
 })(InicioPage);

export default InicioPageConnected;