import styled from "styled-components";


export const Container_home = styled.div`

    min-height: 100svh;
    .header_title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 10px 0px;
        
        h1 {
            font-size: 1.7rem;
            color: #fff;
        }

        p {
            font-size: 1rem;
            color: #aaa;
        }
    }
    

    .player {
        position: relative;

        .gif {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height:220px;
            position: absolute;
            top: 10%;
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

            @media (max-width: 500px) {
                top: -2%;
            }
            
        }
    }

    .card_container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px 20px;
    }

    .install {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 10px 20px 10px;
    }

    
`