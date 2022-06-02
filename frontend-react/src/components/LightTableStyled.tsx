import styled from "styled-components";

const LightTableStyled = styled.table`
    background-color: #fff;
    border-collapse: collapse;
    box-shadow: #ddd 0px 0px 7px;
    margin-bottom: 14px;
    width: 100%;

    thead {
        color: #000;
        border-radius: 7px;
        text-transform: uppercase;
        display: table;
        width: calc(100% - 17px);
        table-layout: fixed;

        tr {
            transition: all 0.25s;
            table-layout: fixed;
            display: table;
            width: 100%;

            th {
                padding: 21px;
                text-align: left;

                &.alignRight {
                    text-align: right;
                }
            }
        }
    }

    tbody {
        display: block;
        height: auto;
        overflow-y: scroll;

        tr {
            transition: 0.25s;
            height: 63px;
            table-layout: fixed;
            display: table;
            width: 100%;

            &:hover {
                background-color: #eee;
            }

            &:hover.nohover {
                background-color: transparent;
                transform: none;
                box-shadow: none;
            }

            td {
                padding: 14px 21px;

                &.alignRight {
                    text-align: right;
                }

                a {
                    color: #39f;
                    cursor: pointer;
                    font-weight: bold;
                    text-decoration: none;
                }

                button {
                    border-radius: 0px;
                    min-width: 40px !important;

                    &:first-child {
                        border-top-left-radius: 7px;
                        border-bottom-left-radius: 7px;
                    }

                    &:last-child {
                        border-top-right-radius: 7px;
                        border-bottom-right-radius: 7px;
                    }
                }
            }
        }
    }

    tfoot {
        tr {
            th {
                display: flex;
                justify-content: center;
                padding: 14px;

                button,
                select {
                    margin-right: 7px;
                }
            }
        }
    }
`;

export default LightTableStyled;
