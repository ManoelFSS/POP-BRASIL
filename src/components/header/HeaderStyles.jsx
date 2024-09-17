import styled from "styled-components";

export const ContainerHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 85px;
    padding: 0px 20px;
    border:solid 1px #04375E;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);

    .menu_icon {
        width: 40px;
        height: 50px;
        cursor: pointer;
        color: #fff;
    }

    
    .header_area {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;


        .header_area_right {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;  

            .header_text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 5px;
                color: #fff;

                h3 {
                    font-size: 1rem;
                }

                p {
                    font-size: 0.8rem;
                    color: #aaa;
                }
            }       

            img {
                width: 55px;
                height: 55px;
                border-radius: 50%;
                object-fit: cover;
            }

        
        }

       
    }


`