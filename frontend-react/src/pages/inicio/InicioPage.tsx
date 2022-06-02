import styled from "styled-components";
import { useEffect } from "react";
import GeneralConstants from "../../constants/GeneralConstants";

const InicioPageStyle = styled.div`
width: 100%;
`;

function InicioPage() {

    useEffect(() => {
        document.title = GeneralConstants.AppName +  ' - Início';
    });

    return (
        <InicioPageStyle>
        </InicioPageStyle>
    );
};

export default InicioPage;