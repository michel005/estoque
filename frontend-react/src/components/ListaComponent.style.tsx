import styled from "styled-components";

const ListaComponentStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: #fff;
    /* box-shadow: 4px 4px 7px #3333;
    border-radius: 7px;
    overflow: hidden; */

    .comandos {
        background-color: #333;
        display: flex;
        flex-direction: row;
        min-height: 56px;
        width: 100%;

        .espacador {
            display: flex;
            flex-grow: 1;
        }

        button {
            font-size: 13px;

            &:hover {
                background-color: #444;
            }

            &.primary:hover {
                background-color: #39fc;
            }

            svg {
                margin-right: 7px;
            }
        }

        & > * {
            min-height: 56px;
            border-radius: 0px;
        }
    }

    .filtros,
    .colunas {
        background-color: #fffc;
        backdrop-filter: blur(10px);
        border-radius: 7px;
        display: flex;
        flex-direction: column;
        position: fixed;
        padding: 4px;
        box-shadow: 4px 4px 7px #3333;

        .title {
            padding: 4px;
            font-weight: bold;
        }

        button {
            padding: 4px;
            color: #333;
            font-weight: normal;
            text-align: left;
            width: 100%;
            font-size: 14px;
            margin-top: 4px;

            :hover {
                background-color: #3333;
            }

            svg {
                width: 18px;
                text-align: left;
                margin-right: 4px;
            }
        }
    }

    .filtrosVisiveis {
        background-color: #f4f4f4;
        border: 1px solid #333;
        border-width: 0px 1px 0px 0px;
        display: flex;
        flex-direction: column;
        padding: 14px;
        height: auto;

        .title {
            font-size: 24px;
            margin-bottom: 14px;
        }

        .filtro {
            margin-bottom: 14px;

            &:hover {
                .link {
                    opacity: 1;
                    transform: translateY(4px) translateX(0%);

                    &:hover {
                        color: #aaa;
                    }
                }

                label {
                    transform: translateX(20px);
                }
            }

            .link {
                position: fixed;
                font-weight: 50;
                color: #ddd;
                transition: all 0.5s;
                transform: translateY(4px) translateX(-200%);
                opacity: 0;

                svg {
                    transform: rotate(45deg);
                }
            }

            label {
                transition: all 0.5s;
                transform: translateX(0px);
            }
        }

        .espacamento {
            display: flex;
            flex-grow: 1;
        }
    }

    .filtros {
        transform: translate(190px, 56px);
    }

    .colunas {
        transform: translate(94px, 56px);
    }

    .columnActive {
        transition: all 0.5s;
    }

    .tabelaEFiltros {
        display: flex;
        flex-direction: row-reverse;
        min-height: calc(100% - 56px);
    }

    .tabela {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: 100%;

        .coluna {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            font-size: 14px;
            width: 100%;
            padding: 0px 14px;
            justify-content: center;

            &.align {
                &.right {
                    text-align: right;
                }
            }
        }

        .cabecalho {
            background-color: #444;
            display: flex;
            flex-direction: row;
            min-height: 56px;
            width: 100%;

            .espacoScroll {
                min-width: 15px;
            }

            .coluna {
                color: #fff;

                &.columnActive {
                    background-color: #555;
                }

                & > div svg {
                    margin-top: 4px;
                    margin-right: 7px;
                }

                .orderBy {
                    svg {
                        margin-left: 4px;
                        color: #fff;
                        transition: all 0.5s;
                    }

                    &.desc {
                        svg {
                            transform: rotate(180deg);
                        }
                    }
                }
            }
        }

        .linhas {
            display: flex;
            flex-direction: column;
            overflow-y: scroll;
            height: 100%;
            width: 100%;

            &::-webkit-scrollbar {
                width: 15px; // manage scrollbar width here
            }
            &::-webkit-scrollbar * {
                background: transparent; // manage scrollbar background color here
            }
            &::-webkit-scrollbar-thumb {
                background: #666; // manage scrollbar thumb background color here
            }

            .linhaVazia {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;
                height: 100%;
                width: 100%;
            }

            .linha {
                background-color: #fff;
                transition: all 0.5s;

                &:nth-child(even) {
                    background-color: #f4f4f4;

                    .coluna.columnActive {
                        background-color: #ddd;
                    }
                }

                &:hover {
                    background-color: #ddd;
                }

                .coluna.columnActive {
                    background-color: #eee;
                }

                .linhaInterna {
                    display: flex;
                    flex-direction: row;
                    min-height: 56px;

                    .comandoslinha {
                        display: none;
                    }
                }
            }

            .selecionado {
                &:hover {
                    background-color: #fff;
                }
                .linhaInterna {
                    display: flex;
                    min-height: none;
                    justify-content: center;

                    &:hover {
                        background-color: #fff;
                    }

                    .coluna {
                        display: none;

                        &.titleColumn {
                            display: flex;
                            font-size: 24px;
                            font-weight: bold;
                        }
                    }

                    .comandoslinha {
                        display: flex;
                        flex-direction: row;
                        width: auto;
                        justify-content: center;
                        padding: 14px;

                        & > div {
                            display: flex;
                            flex-direction: row;

                            button {
                                display: flex;
                                color: #333;
                                margin-left: 7px;
                            }

                            .botaoSelecionar {
                                transform: rotate(45deg);
                                margin-top: -2px;
                            }
                        }
                    }
                }

                .detalhes {
                    padding: 14px;
                    display: flex;
                    flex-direction: column;

                    .linhaDetalhe {
                        display: flex;
                        flex-direction: row;
                        margin-bottom: 14px;

                        .campo {
                            width: 100%;
                        }
                    }
                }
            }
        }

        .rodape {
            background-color: #333;
            display: flex;
            flex-direction: row;
            min-height: 56px;
            padding: 0px 14px;
            width: 100%;

            .controleTamanhoPagina {
                display: flex;
                flex-direction: column;
                justify-content: center;
                color: #fff;

                .primary,
                button:hover {
                    color: #fff;
                }

                .primary {
                    background-color: #999;
                }

                & > div {
                    display: flex;
                    flex-direction: row;
                    font-size: 14px;

                    .labelTamanhoPagina {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        margin-right: 14px;
                        font-weight: bold;
                    }

                    .labelMostrando {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        margin-left: 14px;
                        font-weight: bold;
                    }
                }
            }

            .espacamento {
                display: flex;
                flex-grow: 1;
            }

            .controleDePagina {
                display: flex;
                flex-direction: column;
                justify-content: center;
                color: #fff;

                & > div {
                    display: flex;
                    flex-direction: row;
                    font-size: 14px;

                    .descricaoPagina {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        margin-bottom: 3px;
                        margin-right: 7px;
                        margin-left: 7px;
                        font-weight: bold;
                    }

                    button {
                        margin: 0px 3px;

                        &:hover {
                            background-color: #aaa6;
                        }
                    }

                    svg {
                        color: #fff;
                    }
                }
            }
        }
    }
`;

export default ListaComponentStyle;
