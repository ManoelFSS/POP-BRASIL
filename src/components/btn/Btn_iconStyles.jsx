import styled from "styled-components";

export const Button  = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background: #04375E;
    box-shadow: -3px -3px 16px rgba(87, 179, 255, 0.6),  7px 6px 20px rgba(6, 0, 0, 1);
    border: none;
    cursor: pointer;
    transition: color 0.3s;
    cursor: pointer;
    
    .icon {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.2rem;
        color:#fff;

        &:hover {
            color: red;
        }
    }

    &:nth-child(2) {
        padding-left: 2px;
    }

    z-index: 99;
`;
