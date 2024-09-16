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
    rgba(44, 44, 44, 0.5) ${(props) => props.$volume * 360}deg,
    #2C609E ${(props) => props.$volume * 360}deg
  );
  box-shadow: inset 2px 2px 16px rgba(3, 38, 83, 1), -4px -4px 20px rgba(87, 179, 255, 1),  5px 5px 20px rgba(6, 0, 0, 1);
  z-index: 99;
`;

export const VolumeIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => (props.$volume * 360) - 90}deg) translate(122px);
  cursor: pointer;
  z-index: 99;
  box-shadow: 1px 1px 10px rgba(2, 19, 40, 0.9);
  color: #fff;
  font-size: 1rem;
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
    width: 225px;
    height: 225px;
    border-radius: 50%;
    z-index: 1;
    user-select: none;
    outline: none;
    pointer-events: none; /* Desabilita interações com o ponteiro */
    box-shadow:  1px 2px 10px rgba(3, 38, 83, 1);
    overflow: hidden;
`
export const Btns = styled.div`
    display: flex;
    justify-content:center;
    gap: 40px;
    z-index: 99;
`