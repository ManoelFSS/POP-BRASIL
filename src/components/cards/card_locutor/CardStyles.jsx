import styled from "styled-components";

export const Container_card_locutor = styled.div`
    display: flex;
    justify-content: center;
    max-width: 400px;
    min-width: 290px;
    height: 230px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.8);

    .card_left {
        background-color: #062034;
        position: relative;

        .heart {
            position: absolute;
            top: 10px;
            left: 10px;
            color: red;
            cursor: pointer;
            cursor: pointer;
            font-weight:bolder;
        }
        img {
            width: 120px;
            height: 120px;
            border-radius: 10px 0 0 0;
            
        }

        .icones {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 40px;
            gap: 20px;
            font-size: 1.3rem;
            color: #fff;
    
            .facebook, .instagram, .whatsapp {
                cursor: pointer;
                transition: color 0.3s;
    
                &:hover {
                    color: red;
                }
            }         
        }

        .likes {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 65px;
            gap: 8px;
            color: #fff;

            h4 {
                font-size: 1rem;
            }

            p {
                font-size: 1rem;
                color: #aaa;
                font-weight: 700;
            }
        }

    }

    .card_right {
        position: relative;
        padding: 0px 10px 0px 15px;

        .programa, .locutor, .descricao {
            
            padding: 6px 0px;

            h3 {
                color: #fff;
                font-size: 1rem;
            }

            p {
                color: #aaa;
                font-size: 0.8rem;
                padding-top: 2px;
            }
        }

        .descricao {

            height: 125px;
            width: 100%;

            p {
                font-size: 0.7rem;
                padding: 5px 0 0 0;
            }
        }

        .expand {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 20px;
            height: 20px;
            transition: color 0.3s;
            cursor: pointer;
            color: #fff;

            &:hover {
                color: red;
            }
        }
    }
    
`