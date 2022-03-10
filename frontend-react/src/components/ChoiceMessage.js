import React, { useState } from "react";
import styled from "styled-components";
import ButtonStyled from "./ButtonStyled";

const ChoiceMessageStyled = styled.div`
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
        position:fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        overflow: hidden;

        .title {
            background-color: #333;
            color: #fff;
            padding: 14px;
            width: 100%;
        }

        .textContent {
            padding: 14px;
            width: 100%;
        }

        .commands {
            margin-top: 14px;
            padding: 0px 14px 14px;
            text-align: center;
            width: 100%;

            button {
                margin-right: 14px;

                &:last-child {
                    margin: 0px;
                }
            }
        }
    }
`;

export default function ChoiceMessage({title = 'Janela sem Título', text, choices = [ 
    { name: 'Sim', command: () => {} },
    { name: 'Não', command: () => {} }
]}) {

    return (
        <ChoiceMessageStyled id="message_box">
            <div className="content">
                <div className="title">{title}</div>
                <div className="textContent">{text}</div>
                <div className="commands">
                    {choices.map((choice, index) => {
                        return (
                            <ButtonStyled key={index} className={index === 0 ? 'primary' : ''} onClick={choice.command}>{choice.name}</ButtonStyled>
                        );
                    })}
                </div>
            </div>
        </ChoiceMessageStyled>
    );
}