import React, { useState } from "react";
import styled from "styled-components";

const Style = styled.div`
    display: flex;
    flex-direction: column;

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
        outline: none;
        padding: 10px 7px;
        transition: all 0.5s;

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

const SelectField = ( {
    externalError = '', 
    fieldID = '', 
    validation = () => { return ''; }, 
    label = '', 
    nullable = true, 
    defaultValue, 
    list = [], 
    placeholder = ''
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
        if (nullable === false && (value.trim() === '' || value === null)) {
            erro = 'Campo obrigatório não preenchido!';
        }
        if (erro === '' && value !== null && value !== '' && fieldID && fieldID !== null) {
            if (!list.includes(value)) {
                erro = 'Valor informado não é válido';
            }
        }
        if (erro === '' && value !== null && value !== '' && validation !== undefined) {
            erro = validation();
        }
        showError(erro);
    }

    return (
        <Style className={(error && error !== '' ? 'withError ' + fieldID : fieldID)}>
            <label htmlFor={fieldID}>{label} {nullable === false ? <span className="notNullable">(Obrigatório)</span> : <></>}</label>
            <input list={fieldID + '_datalist'} type="text" id={fieldID} defaultValue={defaultValue} onBlur={validate} placeholder={placeholder} />
            <datalist id={fieldID + '_datalist'}>
                {list.map((value,index) => {
                    return (<option key={index} value={value} />);
                })}
            </datalist>
            <StyleError>{error}</StyleError>
        </Style>
    );
};

export default SelectField;