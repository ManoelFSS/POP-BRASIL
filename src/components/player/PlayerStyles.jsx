import styled from "styled-components";

export const PlayerControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  padding: 10px 0px 0px 0px ;

  .socialMidias, .like_compartilhar_area {
    display: flex;
    justify-content: center;
    gap: 50px;

    button {
      width: 40px;
      height: 40px;

      .icon {
        font-size: 1.2rem;
      }

    }

`;

export const VolumeContainer = styled.div`
  position: relative;
  width: 290px;
  height: 290px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: conic-gradient(
    red ${(props) => props.$volume * 360}deg,
    #04375E ${(props) => props.$volume * 360}deg
  );
  box-shadow:  -4px -4px 20px rgba(87, 179, 255, 0.8),  5px 5px 30px 6px rgba(6, 0, 0, 1);
  z-index: 99;

    .like_compartilhar_area {
      position: absolute;
      top: 64%;
      width: 400px;
      justify-content: space-between;

      button{
        position: relative;
      }
    
      button:nth-child(1)::before {
        content: "${ props => props.$like }";
        font-size: 0.9rem;
        color: #fff;
        position: absolute;
        top: 50px;
        left: 2px;
      
      }

      button:nth-child(2)::after {
        content: "Compartilhar";
        font-size: 0.9rem;
        color: #fff;
        position: absolute;
        top: 50px;
        left: -18px;
      }

      @media (max-width: 460px) {
        width: 310px;

      }

      @media (max-width: 360px) {
        width: 270px;

        button:nth-child(2)::after {
            left: -30px;
          }
      }

    }

  @media (max-width: 460px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 360px) {
    width: 160px;
    height: 160px;
  }

`;

export const VolumeIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 35px;
  height: 35px;
  background-color: red;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => (props.$volume * 360) - 90}deg) translate(135px);
  cursor: pointer;
  z-index: 99;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 1);
  color: #fff;
  font-size: 1.2rem;
  animation: rotate 0.2s linear infinite;

  @keyframes rotate {
    0% , 40% {
      color: #fff;
    }
    50% , 60% {
      color: #43fc00;
    }
    70% , 80% {
      color: yellow; 
    }
    90% ,100% {
      color: #fff;
    }
  }

  @media (max-width: 460px) {
    transform: translate(-50%, -50%) rotate(${(props) => (props.$volume * 360) - 90}deg) translate(90px);
    width: 25px;
    height: 25px;
    font-size: 1rem;
  }

  @media (max-width: 360px) {
    transform: translate(-50%, -50%) rotate(${(props) => (props.$volume * 360) - 90}deg) translate(75px);
  }

`;

export const Container_img = styled.div`
  width: 260px;
  height: 260px;
  border-radius: 50%;
  z-index: 1;
  user-select: none;
  outline: none;
  pointer-events: none; /* Desabilita interações com o ponteiro */
  overflow: hidden;

  @media (max-width: 460px) {
    width: 165px;
    height: 165px;
  }

  @media (max-width: 360px) {
    width: 140px;
    height: 140px;
  }
  
`
export const Btns = styled.div`
    display: flex;
    justify-content:center;
    gap: 50px;
    z-index: 99;
`