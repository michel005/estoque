import styled from "styled-components";

const ListaComponentStyle = styled.div`
display: flex;
flex-direction: column;

.columnActive {
    background-color: #3331;
    color: #666 !important;
}

.cabecalho > .columnActive {
    background-color: #444 !important;
    color: #fff !important;
}

.selecionado .columnActive {
    background-color: #fff;
    color: #3339 !important;
}

.orderBy {
    color: #fff;
    margin-left: 7px;

    &.desc {
        transform: rotate(180deg);
        margin-left: 0px;
    }
}

.filtrosEComandos {
    display: flex;
    flex-direction: column;
    margin-bottom: 7px;

    .linhaComandos {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        .comandos {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin-right: 0px;
            flex-grow: 1;

            &.filtrosEsquerda {
                justify-content: flex-start;
            }

            .botoes {
                display: flex;
                flex-direction: row;

                .opcoesColunas {
                    background-color: #3339;
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                    padding: 7px;
                    position: fixed;
                    transform: translateY(40px);
                    z-index: 100 !important;
                    backdrop-filter: blur(10px);

                    .title {
                        color: #fff;
                        padding: 4px;
                    }

                    button {
                        color: #aaa;
                        padding: 4px;
                        text-align: left;
                        font-size: 12px;
                        font-weight: normal;

                        &.showing {
                            color: #eee;
                        }

                        &:hover {
                            color: #eee;
                            background-color: #3339;
                        }

                        svg {
                            font-size: 12px;
                            margin-right: 7px;
                            width: 12px;
                        }
                    }
                }

                button {
                    min-width: 40px;
                    border-radius: 0px;

                    &:first-child {
                        border-top-left-radius: 4px;
                        border-bottom-left-radius: 4px;
                    }

                    &:last-child {
                        border-top-right-radius: 4px;
                        border-bottom-right-radius: 4px;
                    }
                }

                #botaoCadastrar {
                    margin-right: 7px;
                }
            }
        }
    }

    .linhaFiltro {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 7px;

        .filtro {
            margin-right: 14px;

            .campo label, .campoLabel label {
                margin-left: 14px;
            }

            button.link {
                position: absolute;
                margin-top: 3px;
                font-weight: bold;
                
                svg {
                    font-size: 14px;
                    transform: rotate(45deg);
                }
            }
        }

        .calendario {
            width: 220px;
        }
    }
}

.linha {
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: all 0.25s;

    &:nth-child(even) {
        background-color: #fff;
    }

    &:hover {
        background-color: #eee;
    }

    &.nohover, &.nohover:hover {
        background-color: transparent;
    }

    &.empty {
        background-color: #fff;
    }

    .linhaInterna {
        display: flex;
        flex-direction: row;
        flex-flow: row;
        width: 100%;
        transition: all 0.25s;

        .coluna {
            color: #999;
            display: flex;
            flex-direction: row;
            text-align: left;
            font-size: 15px;
            padding: 14px;
            flex-grow: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            word-break: normal;
            width: 100%;
            transition: all 0.25s;

            &.align {
                &.right {
                    text-align: right;
                    justify-content: flex-end;
                }
                &.center {
                    text-align: center;
                    justify-content: center;
                }
            }

            &.comandoslinha {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                max-width: 50px;

                .opcoesRegistro {
                    background-color: transparent;
                    backdrop-filter: unset;
                    padding: 0px;
                    display: none;
                    flex-direction: row;
                    margin-right: 14px;
                    transform: none;
                    position: static;
                    transition: none;
                    min-width: 100px;
                }

                .botaoSelecionar {
                    color: #999;
                    transition: all 0.25s;

                    &.selecionado {
                        transform: rotate(180deg);
                    }
                }
            }
        }

        &.cabecalho {
            background-color: #333;

            .coluna {
                color: #fff;
                transition: all 0.25s;

                svg {
                    margin-top: 3px;
                    margin-right: 7px;
                }
            }
        }
    }

    .detalhes {
        background-color: #fff;
        padding: 0px 14px 14px;
        margin-bottom: 14px;

        .separador {
            display: flex;
            flex-direction: row;
            margin-top: 14px;
            margin-bottom: 14px;
            width: 100%;

            .tituloSeparador {
                color: #aaa;
                font-weight: bold;
                font-size: 20px;
                display: flex;
                margin-right: 14px;
                width: auto;
            }

            .barraSeparador {
                display: flex;
                background-color: #ddd;
                height: 2px;
                flex-grow: 1;
                transform: translateY(15px);
            }
        }

        .linhaDetalhe {
            display: flex;
            flex-direction: row;

            .campo {
                flex-grow: 1;
                margin-bottom: 14px;
                width: 25%;
            }
        }
    }

    &.selecionado {
        background-color: #fff;
        box-shadow: #3333 0px 0px 7px;
        z-index: 90;
        transform: scale(1.025);

        .linhaInterna {

            .coluna {
                display: none;
            }

            .coluna.titleColumn {
                color: #3339;
                display: flex;
                font-size: 30px;
                flex-grow: 1;
            }

            .comandoslinha {
                display: flex;
                min-width: 200px;
                
                .opcoesRegistro {
                    display: flex;

                    button {
                        background-color: transparent;
                        width: 100px;
                        padding: 0px;
                        color: #3339;
                        font-size: 18px;
                        width: auto;
                        margin-right: 14px;
                        transition: none;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;

                        &:hover {
                            background-color: transparent;
                            color: #39f;
                        }
                    }
                }

                .botaoSelecionar {
                    color: #999;
                    transition: all 0.25s;
                    margin-right: 4px;

                    &.selecionado {
                        transform: rotate(180deg);
                    }
                }

                .botaoSelecionar {
                    height: 100%;
                }
            }
        }
    }

    .opcoesColunas {
        background-color: #3339;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        padding: 7px;
        position: fixed;
        transform: translateY(30px);
        z-index: 100 !important;
        backdrop-filter: blur(10px);

        .title {
            color: #fff;
            padding: 4px;
        }

        button {
            color: #aaa;
            padding: 4px;
            text-align: left;
            font-size: 12px;
            font-weight: normal;

            &.showing {
                color: #eee;
            }

            &:hover {
                color: #eee;
                background-color: #3339;
            }

            svg {
                font-size: 12px;
                margin-right: 7px;
                width: 12px;
            }
        }
    }
}

.paginacao {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    padding: 14px;
    background-color: #fff;

    button {
        margin-right: 7px;

        &:last-child {
            margin-right: 0px;
        }

        &:disabled {
            opacity: 0.2;
        }
    }
}

@media print {
    .linha {
        display: none;
    }

    .linha.selecionado {
        box-shadow: none;
        display: flex;

        .coluna {
            display: none;
        }

        .coluna.titleColumn {
            display: flex;
            font-weight: bold;
            font-size: 36px;
        }

        .comandosLinha {
            display: none;
        }
    }
}
`;

export default ListaComponentStyle;