import styled from "styled-components";

const ButtonStyled = styled.button`
    background-color: #333;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    max-height: 35px;
    padding: 10px 14px;
    outline: none;
    transition: all 0.25s;

    &:hover {
        background-color: #333a;
    }

    &:hover.nohover {
        background-color: #333;
        cursor: unset;
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

    &.success {
        background-color: #00821a;
        color: #fff;

        &:hover {
            background-color: #00821aaa;
        }

        &:disabled {

            &:hover {
                background-color: #00821a;
            }
        }
    }

    &.transparent {
        background-color: transparent;
        color: #111;
        padding: 7px;

        &:hover {
            background-color: #eeec;
        }

        &.noHover:hover {
            background-color: transparent;
        }

        &:disabled {
            background-color: transparent;

            &:hover {
                background-color: transparent;
            }
        }
    }

    &.link {
        background-color: transparent;
        color: #39f;
        font-size: 16px;
        padding: 0px;

        &:hover {
            color: #111;
        }

        &:disabled {
            background-color: transparent;

            &:hover {
                background-color: transparent;
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

    &.menuPrincipal {
        border: none;
        background-color: transparent;
        border-radius: 200px;
        color: #fff6;
        border: 2px dashed #fff2;
        transition: all 0.5s;
        padding: 0px;
        padding-top: 3px;
        width: 36px;

        &:hover {
            color: #fffa;
            border: 2px dashed #fff6;
        }

        &.inverso {
            color: #fff9;
            border: none;
            background-color: #fff3;
            padding-top: 2px;
            font-size: 16px;

            &:hover {
                color: #fff;
                background-color: #fff6;
            }
        }
    }
`;

export default ButtonStyled;