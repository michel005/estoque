import styled from "styled-components";

const ButtonStyled = styled.button`
    background-color: #333;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    padding: 10px 14px;
    outline: none;
    transition: all 0.5s;

    &:hover {
        background-color: #333a;
    }

    &:disabled {
        opacity: 0.5;

        &:hover {
            background-color: #333;
            cursor: not-allowed;
        }
    }

    &.primary {
        background-color: #39f;
        color: #fff;

        &:hover {
            background-color: #39fa;
        }

        &:disabled {

            &:hover {
                background-color: #39f;
            }
        }
    }

    &.transparent {
        background-color: transparent;
        color: #111;

        &:hover {
            background-color: #eeec;
        }

        &:disabled {

            &:hover {
                background-color: #39f;
            }
        }
    }

    &.alert {
        background-color: #ff4d4d;
        color: #fff;

        &:hover {
            background-color: #ff4d4daa;
        }

        &:disabled {

            &:hover {
                background-color: #ff7575;
            }
        }
    }
`;

export default ButtonStyled;