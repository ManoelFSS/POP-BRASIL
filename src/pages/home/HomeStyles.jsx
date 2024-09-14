import styled from "styled-components";


export const Container_home = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100svh;
    padding: 0px 20px;



    .gif {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        height:100px;
        margin-top: 20px;
        
        img {
            width: 100%;
            height: 100%
        }

        @media (max-width: 908px) {
            width: 100%;
        }
    }
`