import styled from "styled-components";

const StyledFormulario = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 14px;
    margin-bottom: 21px;

    &:first-child {
        margin-top: 7px;
    }

    .titulo {
        color: #666;
        font-weight: bold;
        font-size: 20px;
        white-space: nowrap;
    }

    .barra {
        background-color: #ddd;
        flex-grow: 1;
        height: 2px;
        width: 100%;
        margin-top: 15px;
        margin-left: 14px;
    }
`;

export default function Separador({ titulo }: any) {
    return (
        <StyledFormulario>
            <div className="titulo">{titulo}</div>
            <div className="barra"></div>
        </StyledFormulario>
    );
}
