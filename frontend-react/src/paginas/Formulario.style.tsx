import styled from "styled-components";

const FormularioStyled = styled.div`
    width: 100%;
    .grow2 {
        flex-grow: 2;
    }

    .linha {
        display: flex;
        flex-direction: row;
        margin-bottom: 14px;

        .campo {
            margin-right: 14px;
            flex-grow: 1;
            width: 100%;

            &:last-child {
                margin-right: 0px;
            }
        }
    }
`;

export default FormularioStyled;
