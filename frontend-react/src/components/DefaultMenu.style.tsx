import styled from "styled-components";

const DefaultMenuStyled = styled.div`
    background-color: #222;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;

    @media print {
        display: none;
    }

    .tamanhoTela {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 130px;
        max-height: 130px;
        margin: 0px 14px;

        .appTitle {
            color: #fff;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            padding: 14px 0px;
            transition: all 0.25s;
            width: 100%;

            & > button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                display: flex;
                flex-direction: row;
                color: #fff;
                text-decoration: none;
                margin-right: 7px;
                font-size: 24px;
                width: 260px;
                max-width: 260px;
            }

            .menuUsuario {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                width: 100%;

                & > * {
                    margin-left: 28px;
                }

                .botaoCadastro {
                    background-color: #fff3;
                    border: none;
                    border-radius: 18px;
                    color: #fff;
                    cursor: pointer;
                    margin-top: 10px;
                    margin-left: 14px;
                    height: 36px;
                    width: 36px;
                    font-size: 14px;
                    text-align: center;
                    transition: all 0.25s;

                    &:hover {
                        background-color: #fff9;
                    }
                }

                .imagemUsuario {
                    background-image: url(https://randomuser.me/api/portraits/men/81.jpg);
                    background-size: cover;
                    border-radius: 100px;
                    border: 2px solid #fffc;
                    height: 60px;
                    width: 60px;
                }

                .menuCadastrar {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 10px;
                    transform: translateX(-81px);

                    .opcoesCadastrar {
                        background-color: #39f9;
                        backdrop-filter: blur(15px);
                        border-radius: 4px;
                        box-shadow: #3333 0px 0px 7px;
                        display: flex;
                        flex-direction: column;
                        position: fixed;
                        width: 130px;
                        opacity: 0;
                        transition: all 0.25s;
                        transform: translate(-37px, -54px) scale(0);
                        overflow: hidden;
                        z-index: 1;

                        .titulo {
                            padding: 7px;
                            color: #fff;
                            text-align: center;
                            background-color: #fff6;
                            font-size: 14px;
                        }

                        button {
                            background-color: transparent;
                            border: none;
                            cursor: pointer;
                            margin: 0px;
                            width: 100%;
                            text-align: left;
                            padding: 7px;
                            color: #fff;
                            font-size: 14px;
                            font-weight: normal;
                            z-index: 10;

                            &:hover {
                                background-color: #fff3;
                                border-radius: 0px;
                            }
                        }
                    }

                    &.fixar {
                        z-index: 100;

                        .opcoesCadastrar {
                            display: flex;
                            z-index: 100;
                            transform: translate(-37px, 54px) scale(1);
                            opacity: 1;
                        }
                    }
                }
            }
        }

        .menuOptions {
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;

            button {
                background-color: transparent;
                border: 2px solid transparent;
                border-radius: 0px;
                border-width: 0px 0px 2px 0px;
                color: #fff7;
                cursor: pointer;
                display: flex;
                flex-direction: row;
                font-size: 14px;
                font-weight: normal;
                justify-content: flex-start;
                padding: 12px 19px;
                text-decoration: none;
                transition: all 0.25s;

                &:hover {
                    color: #fff;
                }

                &.active {
                    color: #fff;
                    border-color: #fff;
                    border-width: 0px 0px 2px 0px;
                    transform: translateY(-2px);
                }
            }
        }
    }
`;

export default DefaultMenuStyled;