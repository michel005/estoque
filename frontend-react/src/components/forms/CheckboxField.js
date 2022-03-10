import { useState } from "react";
import styled from "styled-components";

const Style = styled.div`
    display: flex;
    flex-direction: column;

    label {
        margin-bottom: 4px;
    }

    input {
        font-size: 20px;
        margin: 0px;
        margin-right: 4px;
        outline: none;
        transition: all 0.5s;

        &:hover {
            border-color: #666;
        }

        &:focus {
            border-color: #39f;
        }
    }

    &.withError {
        border: 1px solid red;
        border-radius: 4px;
        padding: 7px;
        
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

const CheckboxField = ( {
    error = '', 
    value = false, 
    fieldID = '', 
    validation = () => { return ''; }, 
    label = ''
}) => {
    const [errorMSG, setErrorMSG] = useState(error);
    const [internalValue, setInternalValue] = useState(value);

    const validate = () => {
        if (validation !== undefined) {
            var rootComponent = document.getElementsByClassName(fieldID)[0];
            var erro = (validation === undefined ? '' : validation());
            rootComponent.classList.remove('withError');
            if (erro !== '') {
                rootComponent.classList.add('withError');
                setErrorMSG(erro);
            } else {
                setErrorMSG('');
                setInternalValue(!internalValue);
            }
        } else {
            setErrorMSG('');
            setInternalValue(!internalValue);
        }
    };

    return (
        <Style className={(errorMSG === '' ? fieldID : 'withError ' + fieldID)}>
            <div>
                <input type='checkbox' id={fieldID} checked={internalValue} onChange={validate} />
                <label htmlFor={fieldID}>{label}</label>
            </div>
            <StyleError>{errorMSG}</StyleError>
        </Style>
    );
};

export default CheckboxField;