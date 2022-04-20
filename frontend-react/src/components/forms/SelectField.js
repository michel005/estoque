import React, { useState } from "react";
import styled from "styled-components";

const Style = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-weight: bold;
        margin-bottom: 4px;
        color: #999;

        .notNullable {
            color: #CCC;
            font-size: 14px;
        }
    }

    input, select {
        border-radius: 4px;
        border: 1px solid #aaa;
        margin: 0px;
        outline: none;
        padding: 10px 7px;
        transition: all 0.5s;
        max-height: 35px;

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
    placeholder = '',
    nativeSelect = false,
    nullableOption = true,
    onlyValuesList = false,
    nullableOptionText = '',
    nullableOptionValue = null,
    enterEvent = () => {}
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
            if (nativeSelect === false) {
                if (!list.includes(value)) {
                    erro = 'Valor informado não é válido';
                }
            }
        }
        if (erro === '' && value !== null && value !== '' && validation !== undefined) {
            erro = validation();
        }
        showError(erro);
    }

    var onlyValues = [];
    if (onlyValuesList === true) {
        list.map((value) => {
            onlyValues.push({text: value, value: value});
            return value;
        })
    }

    function enterEventInner(event) {
        if (event.charCode === 13) {
            event.preventDefault();
            enterEvent();
        }
    }

    return (
        <Style className={'campo ' + (error && error !== '' ? 'withError ' + fieldID : fieldID)}>
            {label === '' ? <></> : <label htmlFor={fieldID}>{label} {nullable === false ? <span className="notNullable">(Obrigatório)</span> : <></>}</label>}
            { nativeSelect === false ?
            <>
                <input list={fieldID + '_datalist'} onKeyPress={enterEventInner} autoComplete="false" type="text" id={fieldID} name={fieldID} defaultValue={defaultValue} onBlur={validate} placeholder={placeholder} />
                <datalist id={fieldID + '_datalist'}>
                    {list.map((value,index) => {
                        return (<option key={index} value={value} />);
                    })}
                </datalist>
            </>
            : 
            <select defaultValue={defaultValue} id={fieldID} onBlur={validate}  name={fieldID}>
                {nullableOption === true ? <option value={nullableOptionValue}>{nullableOptionText}</option> : <></>}
                {onlyValuesList === true ? 
                    Object.keys(onlyValues).map((value,index) => {
                        return (<option key={index} value={onlyValues[value].value}>{onlyValues[value].text}</option>);
                    })
                :
                    Object.keys(list).map((value,index) => {
                        return (<option key={index} value={list[value].value}>{list[value].text}</option>);
                    })
                }
            </select>}
            <StyleError>{error}</StyleError>
        </Style>
    );
};

export default SelectField;