import styled from "styled-components";

export const Container_social = styled.div`
   
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    gap: 10px;
    font-size: 1.7rem;
    color: #fff;


    .facebook, .instagram, .whatsapp {
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: red;
        }
    }         


`
