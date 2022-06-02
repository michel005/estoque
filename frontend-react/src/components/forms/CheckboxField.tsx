import { useState } from "react";
import styled from "styled-components";

const Style = styled.div`
    display: flex;
    flex-direction: column;

    label {
        font-weight: bold;
        margin-bottom: 4px;
        color: #999;
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

const CheckboxField = ({ error = "", value = false, fieldID = "", validation = () => {}, label = "" }: any) => {
    const [errorMSG] = useState(error);

    const validate = () => {
        if (validation !== undefined) {
            validation(!value, fieldID);
        }
        value = !value;
    };

    return (
        <Style className={"campo checkbox " + (errorMSG === "" ? fieldID : "withError " + fieldID)}>
            <div>
                <input type="checkbox" id={fieldID} checked={value} onChange={validate} />
                <label htmlFor={fieldID}>{label}</label>
            </div>
        </Style>
    );
};

export default CheckboxField;
