import styled from "styled-components";

export const PlayerControls = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 50px;
  align-items: center;
`;

export const VolumeContainer = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
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
  transform: translate(-50%, -50%) rotate(${(props) => (props.$volume * 360) - 90}deg) translate(119px);
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
`;

export const Container_img = styled.div`
    width: 220px;
    height: 220px;
    border-radius: 50%;
    z-index: 1;
    user-select: none;
    outline: none;
    pointer-events: none; /* Desabilita interações com o ponteiro */
    overflow: hidden;
`
export const Btns = styled.div`
    display: flex;
    justify-content:center;
    gap: 40px;
    z-index: 99;
`