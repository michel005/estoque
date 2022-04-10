import styled from "styled-components";

const JanelaStyled = styled.div`
    background-color: #3333;
    backdrop-filter: blur(10px);
    height: 100vh;
    left: 0px;
    position:fixed;
    top: 0px;
    width: 100%;
    z-index: 50;

    * {
        transition: all 0.5s;
    }

    &.esconder {
        display: none;
    }

    .content {
        background-color: #fff;
        box-shadow: #999 0px 0px 7px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position:fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        .title {
            color: #000;
            font-weight: bold;
            font-size: 24px;
            padding: 21px;
            width: 100%;
        }

        .innerContent {
            padding: 21px;
            width: 100%;
        }

        .commands {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin-top: 21px;
            text-align: left;
            width: 100%;

            button {
                margin-right: 14px;
                
                &:last-child {
                    margin-right: 0px;
                }
            }
        }
    }
`;

export default JanelaStyled;