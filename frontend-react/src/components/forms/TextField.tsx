import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonStyled from "../ButtonStyled";

const Style = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: auto;
    transition: all 0.5s;

    label {
        font-weight: bold;
        margin-bottom: 4px;
        color: #999;

        .notNullable {
            color: #ccc;
            font-size: 14px;
        }
    }

    .readonly {
        color: #aaa;

        svg {
            margin-right: 7px;
        }
    }

    .iconContainer {
        display: flex;
        flex-direction: row;
        width: 100%;

        * {
            transition: all 0.5s;
        }

        .icon {
            background-color: #fff3;
            color: #fff6;
            padding: 7px 10px;

            svg {
                font-size: 16px;
            }
        }
    }

    input {
        border-radius: 4px;
        border: 1px solid #aaa;
        margin: 0px;
        max-height: 35px;
        outline: none;
        padding: 10px 7px;
        transition: all 0.5s;
        width: 100%;

        &:disabled {
            background-color: #eee;
            cursor: not-allowed;
        }

        &:hover {
            border-color: #666;
        }

        &:focus {
            border-color: #39f;
        }
    }

    &.withError {
        label {
            color: red;
        }

        input,
        select {
            border: 1px solid #ff4d4d;

            &:focus {
                border-color: red;
            }
        }
    }

    &.menuPrincipal {
        input {
            border: none;
            background-color: #fff3;
            color: #fff;
            padding: 14px;
            transition: all 0.5s;

            &::placeholder {
                color: #fff6;
            }
        }

        &:hover {
            input {
                background-color: #fff6;
            }

            &::placeholder {
                color: #fff9;
            }

            .iconContainer {
                .icon {
                    background-color: #fff6;
                    color: #fff9;
                }
            }
        }

        *:first-child {
            border-radius: 4px 0px 0px 4px;
        }

        *:last-child {
            border-radius: 0px 4px 4px 0px;
        }
    }
`;

const StyleError = styled.span`
    color: red;
    font-size: 12px;
    display: block;
`;

const TextField = ({
    type = "text",
    fieldID = "",
    label = "",
    nullable = true,
    defaultValue = null,
    placeholder = "",
    disabled = false,
    validate = () => {
        return "";
    },
    className = "",
    icon = null,
    eventIcon = () => {},
    readonly = false,
    readonlyIcon = null,
    convertValueToText = [],
}: any) => {
    const [error, setError] = useState("");

    const validateEvent = () => {
        var el: any = document.getElementById(fieldID);
        var value = el.value;
        var erro = validate();
        if (erro === "" && nullable === false && value.trim() === "") {
            erro = "Campo obrigat??rio n??o preenchido!";
        }
        setError(erro);
    };

    function convertValue() {
        var result = Object.keys(convertValueToText).filter((value) => convertValueToText[value].value === defaultValue);
        if (result.length === 1) {
            return convertValueToText[result[0]].text;
        } else {
            return "";
        }
    }

    return (
        <Style className={"campo " + className + " " + (error && error !== "" ? "withError " + fieldID : fieldID)}>
            {readonly === true ? (
                <>
                    {label !== "" && <label>{label}</label>}
                    <div className="readonly">
                        {readonlyIcon !== null && readonlyIcon}
                        {convertValueToText.length === 0 ? defaultValue : convertValue()}
                    </div>
                </>
            ) : (
                <>
                    {label !== "" && (
                        <label htmlFor={fieldID}>
                            {label} {nullable === false && <span className="notNullable">(Obrigat??rio)</span>}
                        </label>
                    )}
                    <div className="iconContainer">
                        <input
                            autoComplete="false"
                            type={type}
                            id={fieldID}
                            className={error !== "" ? "widthError" : ""}
                            defaultValue={defaultValue}
                            placeholder={placeholder}
                            onBlur={validateEvent}
                            disabled={disabled}
                        />
                        {icon !== null && (
                            <ButtonStyled onClick={eventIcon} className="icon">
                                {icon}
                            </ButtonStyled>
                        )}
                    </div>
                    <StyleError>{error}</StyleError>
                </>
            )}
        </Style>
    );
};

export default TextField;
