import styled from "styled-components";

const TableStyled = styled.table`
    border-collapse: collapse;
    margin-bottom: 14px;
    width: 100%;
    table-layout: fixed;

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
        background-color: #fff;

        tr {
            transition: 0.25s;
            width: 100%;

            &:hover {
                background-color: #f4f4f4;
            }

            td {
                padding: 14px;

                &.alignRight {
                    text-align: right;
                }
            }
        }
    }

    tfoot {
        background-color: transparent;
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