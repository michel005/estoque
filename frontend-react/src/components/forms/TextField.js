import React, { useState } from "react";
import styled from "styled-components";

const Style = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    label {
        font-weight: bold;
        margin-bottom: 4px;

        .notNullable {
            color: #CCC;
            font-size: 14px;
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

        input {
            border: 1px solid #ff4d4d;

            &:focus {
                border-color: red;
            }
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
    disabled = false
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

    return (
        <Style className={(error && error !== '' ? 'withError ' + fieldID : fieldID)}>
            {label !== '' ? <label htmlFor={fieldID}>{label} {nullable === false ? <span className="notNullable">(Obrigatório)</span> : <></>}</label> : <></>}
            <input type={type} id={fieldID} defaultValue={defaultValue} onBlur={() => validate()} placeholder={placeholder + ((label === null || label === '') && nullable === false? ' (Obrigatório)' : '')} disabled={disabled} />
            <StyleError>{error}</StyleError>
        </Style>
    );
};

export default TextField;