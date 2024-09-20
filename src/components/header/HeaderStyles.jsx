import styled from "styled-components";

export const ContainerHeader = styled.div`
    display: flex;
    z-index: 102;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 80px;
    padding: 0px 20px;
    background: rgba(20, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 1);

    .menu_icon {
        width: 40px;
        height: 50px;
        cursor: pointer;
        color: #fff;
    }

    
    .header_area {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 100%;


        .header_area_right {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;  

            .login {
                color: #fff;
                font-size: 1rem;
                cursor: pointer;
                transition: color 0.3s;
                padding-left: 10px;

                &:hover {
                    color: red;
                }
            }

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
                    font-size: 1rem;
                    color: #aaa;
                }
            }       

            img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
            }

        
        }

       
    }


`