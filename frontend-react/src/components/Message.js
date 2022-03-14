import React from "react";
import styled from "styled-components";
import ButtonStyled from "./ButtonStyled";

const MessageStyled = styled.div`
    background-color: #3333;
    backdrop-filter: blur(10px);
    height: 100vh;
    left: 0px;
    position:fixed;
    top: 0px;
    width: 100%;
    z-index: 100;

    &.esconder {
        display: none;
    }

    .content {
        background-color: #fff;
        border-radius: 7px;
        padding: 14px;
        position:fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%);

        .textContent {
            width: 100%;
        }

        .commands {
            margin-top: 14px;
            text-align: center;
            width: 100%;
        }
    }
`;

export default function Message({text, closeEvent = () => {}}) {

    return (
        <MessageStyled id="message_box">
            <div className="content">
                <div className="textContent">{text}</div>
                <div className="commands"><ButtonStyled onClick={closeEvent}>Fechar</ButtonStyled></div>
            </div>
        </MessageStyled>
    );
}