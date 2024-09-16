import styled from "styled-components";


export const Container_home = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100svh;
    padding: 0px 10px;

    .player {
        position: relative;

        .gif {
            display: flex;
            justify-content: center;
            align-items: center;
            width:100vw;
            height:180px;
            position: absolute;
            top: 12%;
            left: 50%;
            transform: translateX(-50%);
            
            z-index: 1;
        
            img {
                width: 90%;
                height: 100%;
            }
                
            @media (max-width: 768px) {
                img {
                    width: 100%;
                }   
            }
            
        }
    }

    
`