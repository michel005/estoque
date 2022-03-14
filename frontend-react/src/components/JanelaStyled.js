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

    &.esconder {
        display: none;
    }

    .content {
        background-color: #fff;
        border-radius: 7px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        position:fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        .title {
            background-color: #333;
            color: #fff;
            padding: 14px;
            width: 100%;
        }

        .innerContent {
            padding: 14px;
            width: 100%;
        }

        .commands {
            margin-top: 14px;
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