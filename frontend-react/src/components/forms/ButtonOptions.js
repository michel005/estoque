import ButtonStyled from "../ButtonStyled";
import styled from "styled-components";
import { useState } from "react";

const Style = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-weight: bold;
        margin-bottom: 4px;
        color: #999;
    }

    .opcoes {
        display: flex;
        flex-direction: row;

        button {
            background-color: #fff;
            border-radius: 0px;
            width: 100%;
            color: #333;
            border: 1px solid #aaa;
            border-width: 0px;
            border-top-width: 1px;
            border-bottom-width: 1px;

            &:hover {
                background-color: #3330;
            }

            &.primary {
                background-color: #3331;
            }

            &:first-child {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                border-left-width: 1px;
            }

            &:last-child {
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                border-right-width: 1px;
            }
        }
    }
`;

export default function ButtonOptions ({
    label = null,
    list = [],
    fieldID = '',
}) {
    const [selecionado, setSelecionado] = useState('');

    return (
        <Style>
            {label === null ? <></> : <label>{label}</label>}
            <div className="opcoes">
                {Object.keys(list).map((val, index) => {
                    return (
                        <ButtonStyled key={index} className={selecionado === list[val].value ? 'primary' : ''} onClick={() => setSelecionado(list[val].value)}>{list[val].text}</ButtonStyled>
                    )
                })}
            </div>
            <input type="hidden" id={fieldID} name={fieldID} value={selecionado} />
        </Style>
    );
}