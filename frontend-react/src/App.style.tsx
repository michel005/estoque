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
        height: calc(100% - 130px);
        max-height: calc(100% - 130px);
        z-index: 0;

        .TamanhoTela {
            display: flex;
            flex-direction: row;
            width: 100%;
            max-height: 100%;

            & > * {
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                height: 100%;
                max-height: 100%;
                width: 100%;
            }
        }
    }
`;

export default AppStyled;