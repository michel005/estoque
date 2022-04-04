import styled from "styled-components";

const LightTableStyled = styled.table`
    background-color: #fff;
    border-collapse: collapse;
    border-radius: 0px;
    box-shadow: #ddd 0px 0px 7px;
    margin-bottom: 14px;

    thead {
        color: #000;
        border-radius: 7px;
        text-transform: uppercase;
        width: 100%;

        tr {
            transition: all 0.25s;
            
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
        width: 100%;
        height: 100%;

        tr {
            transition: 0.5s;
            height: 63px;
            width: 100%;

            &:hover {
                background-color: #f4f4f4;
                transform: translateX(7px);
                box-shadow: #ccc 0px 0px 7px;
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
                    font-weight: bold;
                    text-decoration: none;
                }

                &.buttonCell {
                    display: flex;
                    flex-direction: row;

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

                    &.colSpan {
                        display: table-cell;
                    }
                }
                
                &.buttonCell.alignRight {
                    justify-content: flex-end;
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

export default LightTableStyled;