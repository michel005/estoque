import styled from "styled-components";

const TableStyled = styled.table`
    background-color: #f4f4f4;
    border-collapse: collapse;
    border-radius: 7px;
    box-shadow: #CCC 0px 0px 7px;
    overflow: hidden;
    margin-bottom: 14px;

    thead {
        background-color: #333;
        color: #fff;
        width: 100%;

        tr {
            th {
                padding: 14px;
                text-align: left;

                &.alignRight {
                    text-align: right;
                }
            }
        }
    }

    tbody {
        width: 100%;
        height: 100%;

        tr {
            transition: 0.5s;
            width: 100%;

            &:nth-child(even) {
                background-color: #fff;
            }

            &:hover {
                background-color: #ddd;
            }

            td {
                padding: 14px;

                &.alignRight {
                    text-align: right;
                }

                a {
                    color: #39f;
                    font-weight: bold;
                    text-decoration: none;
                }

                &.buttonCell {
                    display: flex;
                    flex-direction: row;

                    button {
                        border-radius: 0px;

                        &:first-child {
                            border-top-left-radius: 7px;
                            border-bottom-left-radius: 7px;
                        }

                        &:last-child {
                            border-top-right-radius: 7px;
                            border-bottom-right-radius: 7px;
                        }
                    }

                    &.colSpan {
                        display: table-cell;
                    }
                }
            }
        }
    }

    tfoot {
        tr {
            th {
                padding: 14px;

                button {
                    margin-right: 7px;
                }
            }
        }
    }
`;

export default TableStyled;