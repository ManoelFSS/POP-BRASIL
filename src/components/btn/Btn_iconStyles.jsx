import styled from "styled-components";

export const Button  = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: #04375E;
    box-shadow: -3px -3px 16px rgba(87, 179, 255, 0.6),  7px 6px 20px rgba(6, 0, 0, 1);
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color:#fff;
    transition: color 0.3s;
    cursor: pointer;
    
    &:hover {
        color: red;
    }
    z-index: 99;
`;
