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

                a {
                    color: #39f;
                    font-weight: bold;
                    text-decoration: none;
                }

                &.buttonCell {
                    display: flex;
                    flex-direction: row;
                    padding: 10px 14px;

                    button {
                        border-radius: 0px;

                        &:first-child {
                            border-radius: 7px 0px 0px 7px;
                        }

                        &:last-child {
                            border-radius: 0px 7px 7px 0px;
                        }
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