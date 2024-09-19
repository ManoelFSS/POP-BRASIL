import styled from "styled-components";


export const Container_home = styled.div`

    max-height: 100svh;
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
        gap: 10px;

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
    
    }

    .install {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom:20px;
        
    }

    
`