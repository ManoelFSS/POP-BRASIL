import styled from "styled-components";


export const Container_home = styled.div`

    height: 100svh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .header_title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        
        
        h1 {
            font-size: 1.3rem;
            color: #fff;
        }

        p {
            font-size: 1rem;
            color: #aaa;
        }
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
    

    .player {
        position: relative;
        width: 100%;

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
        padding-bottom:20px;
        
    }

    
`