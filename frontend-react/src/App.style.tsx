import styled from "styled-components";

const AppStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;

    .Content {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        z-index: 0;

        .TamanhoTela {
            display: flex;
            width: 1400px;
            padding: 14px 0px;
            padding-top: 14px;
            margin: 0px 14px;
        }
    }
`;

export default AppStyled;