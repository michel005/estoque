import React, { useState } from "react";
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
            color: #CCC;
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

        input, select {
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

const TextField = ( {
    externalError = '', 
    type = 'text',
    fieldID = '', 
    validation = () => { return ''; }, 
    label = '', 
    nullable = true, 
    defaultValue, 
    placeholder = '',
    disabled = false,
    enterEvent = () => {},
    className = '',
    icon = null,
    eventIcon = () => {},
    readonly = false,
    readonlyIcon = null,
    convertValueToText = []
} ) => {

    const [error, setError] = useState(externalError);

    const showError = (errorMessage) => {
        var rootComponent = document.getElementsByClassName(fieldID)[0];
        rootComponent.classList.remove('withError');
        setError(errorMessage);
        if (errorMessage !== '') {
            rootComponent.classList.add('withError');
        }
    };

    const validate = () => {
        var value = document.getElementById(fieldID).value;
        var erro = '';
        if (nullable === false && value.trim() === '') {
            erro = 'Campo obrigatório não preenchido!';
        }
        if (erro === '' && fieldID !== '') {
            if (type.toString().toLowerCase() === 'email') {
                if (value.trim().length > 0) {
                    if (value.indexOf('@') === -1) {
                        erro = 'E-mail com formado errado!';
                    } else {
                        var emailParts = value.split('@');
                        if (emailParts.length > 2) {
                            erro = 'E-mail com mais de um @!';
                        } else
                        if (emailParts[0].trim().length === 0) {
                            erro = 'E-mail sem texto antes da @!';
                        } else
                        if (emailParts[1].trim().length === 0) {
                            erro = 'E-mail sem texto depois da @!';
                        }
                    }
                }
            }
        }
        if (erro === '') {
            erro = validation();
        }
        showError(erro);
    };

    function enterEventInner(event) {
        if (event.charCode === 13) {
            event.preventDefault();
            enterEvent();
        }
    }

    function convertValue() {
        var result = Object.keys(convertValueToText).filter((value) => convertValueToText[value].value === defaultValue);
        if (result.length === 1) {
            return convertValueToText[result[0]].text;
        } else {
            return '';
        }
    }

    return (
        <Style className={'campo ' + className + ' ' + (error && error !== '' ? 'withError ' + fieldID : fieldID)}>
            {readonly === true ?
            <>
                {label !== '' ? <label>{label}</label> : <></>}
                <div className="readonly">{readonlyIcon === null ? <></> : readonlyIcon}{convertValueToText.length === 0 ? defaultValue : convertValue()}</div>
            </>
            :
            <>
                {label !== '' ? <label htmlFor={fieldID}>{label} {nullable === false ? <span className="notNullable">(Obrigatório)</span> : <></>}</label> : <></>}
                <div className="iconContainer">
                    <input autoComplete="false" onKeyPress={enterEventInner} type={type} id={fieldID} name={fieldID} defaultValue={defaultValue} onBlur={() => validate()} placeholder={placeholder + ((label === null || label === '') && nullable === false? ' (Obrigatório)' : '')} disabled={disabled} />
                    {icon === null ? <></> : 
                    <ButtonStyled onClick={eventIcon} className="icon">
                        {icon}
                    </ButtonStyled>}
                </div>
                <StyleError>{error}</StyleError>
            </>
            }
        </Style>
    );
};

export default TextField;