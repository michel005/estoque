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
        padding: 14px;
        position:fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%);

        .title {
            padding: 0px 0px 14px;
            font-weight: bold;
            font-size: 24px;
            width: 100%;
        }

        .textContent {
            padding: 14px 0px;
            width: 100%;
        }

        .commands {
            margin-top: 14px;
            text-align: center;
            width: 100%;
        }
    }
`;

export default function Message({title, text, closeEvent = () => {}}) {

    return (
        <MessageStyled id="message_box">
            <div className="content">
                {title === null ? <></> : <div className="title">{title}</div>}
                <div className="textContent">{text}</div>
                <div className="commands"><ButtonStyled onClick={closeEvent}>Fechar</ButtonStyled></div>
            </div>
        </MessageStyled>
    );
}