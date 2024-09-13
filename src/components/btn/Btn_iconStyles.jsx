import styled from "styled-components";

export const Button  = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    background: #04375E;
    box-shadow: -3px -3px 16px rgba(87, 179, 255, 0.6),  7px 6px 20px rgba(6, 0, 0, 1);
    border: none;
    cursor: pointer;
    transition: color 0.3s;
    cursor: pointer;
    
    &:hover {
        color: red;
    }

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        font-size: 1.8rem;
        color:#fff;
    }

    &:nth-child(2) {
        padding-left: 5px;
    }

    z-index: 99;
`;
