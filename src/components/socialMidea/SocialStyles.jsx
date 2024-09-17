import styled from "styled-components";

export const Container_social = styled.div`
    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 35px;
    gap: 30px;
    font-size: 1.4rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);

    .facebook, .instagram, .whatsapp {
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: red;
        }
    }         


`
