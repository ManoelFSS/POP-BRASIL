import styled from "styled-components";


export const Container_home = styled.div`

    height: 100svh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .top_home{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding-top: 10px;
        
        
        h1 {
            font-size: 1.3rem;
            color: #fff;
        }

        p {
            font-size: 1rem;
            color: #aaa;
        }

        .socialMidias {
            display: flex;
            justify-content: center;
            gap: 65px;
            padding-top: 20px;

            button {
                width: 40px;
                height: 40px;

                .icon {
                    font-size: 1.2rem;
                }

            }
        }
    }
    

    .center_home {
        position: relative;
        width: 100%;

        .gif {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height:260px;
            position: absolute;
            top: 3%;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
            user-select: none;
            
            z-index: 0;
        
            img {
                width: 100%;
                height: 100%;
            }
                
            @media (max-width: 768px) {

                img {
                    width: 100%;
                }   
            }

            @media (max-width: 460px) {
                top: -2%;  
                height: 200px;
            }

        }
    }

    .card_container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
    }

    .like_compartilhar_area {
        display: flex;
        align-items: center;
        justify-content: center;
        align-items: center;
        gap: 30px;
        padding-top: 30px;

        .btn_icon {
        
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
            min-width: 90px;

            p {
                font-size: 0.9rem;
                color: #fff;
            }
        }

        @media (max-width: 360px) {
            gap: 10px;
        }
    
    }

    .install {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom:20px;
        
    }

    .popup {

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 110;
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 30px 15px;
        border-radius: 10px;
        width: 300px;
        
        p {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            font-size: 1rem;
            position: absolute;
            bottom: 10px;
            right: 10px;
            cursor: pointer;
            transition: color 0.3s;
            padding: 3px 6px ;
            background-color: #fff;
            color: #000;
            font-weight: bold;
            border-radius: 5px;

            &:hover {
                color: #fff;
                background-color: red;
            }
        }

        h3 {
            font-size: 1rem;
            color: #fff;
            padding-bottom: 10px;
            text-align: center;
        }

        div {

            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

            img {
                width: 45px;
                height: 45px;
            }

            button {
                background-color: #fff;
                border: none;
                color: #000;
                cursor: pointer;
                font-size: 1rem;
                font-weight: bold;
                padding: 5px 20px;
                border-radius: 5px;
                transition: background-color 0.3s;

                &:hover {
                    background-color: red;
                    color: #fff;
                }
            }
        }

    }

`