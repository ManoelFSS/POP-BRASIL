import styled from "styled-components";

export const Container_home = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 50px 10px;

    .gif {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
        margin-top: 30px;
        padding: 0 10px;
        
        img {
            width: 100%;
            height: 100%
        }
    }
`