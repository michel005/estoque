import React, { useState } from "react";
import styled from "styled-components";
import ValueUtils from "../../utils/ValueUtils";

const Style = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-weight: bold;
        margin-bottom: 4px;
        color: #999;

        .notNullable {
            color: #ccc;
            font-size: 14px;
        }
    }

    input,
    select {
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

const SelectField = ({
    externalError = "",
    fieldID = "",
    label = "",
    nullable = true,
    defaultValue = null,
    list = {},
    placeholder = "",
    nativeSelect = false,
    nullableOption = true,
    nullableOptionText = "",
    nullableOptionValue = null,
    validar=() => { return ""; }
}: any) => {
    const [error, setError] = useState(externalError);

    const showError = (errorMessage: string) => {
        var rootComponent = document.getElementsByClassName(fieldID)[0];
        rootComponent.classList.remove("withError");
        setError(errorMessage);
        if (errorMessage !== "") {
            rootComponent.classList.add("withError");
        }
    };

    const validate = () => {
        var value: string = ValueUtils.valueById(fieldID);
        var erro = "";
        if (nullable === false && (value === null || value.trim() === "")) {
            erro = "Campo obrigatório não preenchido!";
        }
        if (erro === "" && value !== null && value !== "" && nativeSelect === false) {
            if (list[value] === undefined) {
                erro = "Valor informado não é válido";
            }
        }
        if (erro === "") {
            erro = validar()
        }
        showError(erro);
    };

    return (
        <Style className={"campo " + (error && error !== "" ? "withError " + fieldID : fieldID)}>
            {label === "" ? (
                <></>
            ) : (
                <label htmlFor={fieldID}>
                    {label} {nullable === false && <span className="notNullable">(Obrigatório)</span>}
                </label>
            )}
            {nativeSelect === false ? (
                <>
                    <input
                        list={fieldID + "_datalist"}
                        autoComplete="false"
                        type="text"
                        id={fieldID}
                        name={fieldID}
                        defaultValue={defaultValue}
                        onBlur={validate}
                        placeholder={placeholder}
                    />
                    <datalist id={fieldID + "_datalist"}>
                        {nullableOption === true && <option value={nullableOptionValue}>{nullableOptionText}</option>}
                        {Object.keys(list).map((value, index) => {
                            return (
                                <option key={index} value={value}>
                                    {list[value]}
                                </option>
                            );
                        })}
                    </datalist>
                </>
            ) : (
                <select defaultValue={defaultValue} id={fieldID} onChange={validate} name={fieldID}>
                    {nullableOption === true && <option value={nullableOptionValue}>{nullableOptionText}</option>}
                    {Object.keys(list).map((value, index) => {
                        return (
                            <option key={index} value={value}>
                                {list[value]}
                            </option>
                        );
                    })}
                </select>
            )}
            <StyleError>{error}</StyleError>
        </Style>
    );
};

export default SelectField;
