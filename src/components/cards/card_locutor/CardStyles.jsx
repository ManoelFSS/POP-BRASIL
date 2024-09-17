import styled from "styled-components";

export const Container_card_locutor = styled.div`
    display: flex;
    width: 400px;
    height: 150px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.5);
    margin-top: 30px;
    position: relative;

    @media (max-width: 500px) {
        width: 100%;
    }

    .expand {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        transition: color 0.3s;
        cursor: pointer;
        color: #fff;

        &:hover {
            color: red;
        }
    }


    .card_left {
        background: rgba(0, 0, 0, 0.5);
        position: relative;

        .heart {
            position: absolute;
            top: 8px;
            left: 8px;
            color: red;
            cursor: pointer;
            cursor: pointer;
            font-size: 1.5rem;
            font-weight:bolder;
            animation: heart 0.5s infinite;

            @keyframes heart {
                0% {
                    transform: scale(1);
                }
                100% {
                    transform: scale(1.2);
                }
            }
            
        }

        img {
            width: 120px;
            height: 115px;
            border-radius: 10px 0px 0px 0;
            
        }
        
        p {
            font-size: 1.1rem;
            color: #aaa;
            font-weight: 700;
            text-align: center;
            padding-bottom: 5px;
            padding-top: 5px;
        }
        

    }

    .card_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        width: 100%;

        .programa, .locutor {
            
            padding: 6px 0px 0px 10px;

            h3 {
                color: #fff;
                font-size: 1.2rem;
            }

            p {
                color: #aaa;
                font-size: 1rem;
                padding-top: 2px;
            }
        }
    }
    
`