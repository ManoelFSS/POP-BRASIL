import styled from "styled-components";

export const PlayerControls = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 40px;
  align-items: center;
`;

export const VolumeContainer = styled.div`
  position: relative;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: conic-gradient(
    rgba(44, 44, 44, 0.5) ${(props) => props.$volume * 360}deg,
    #2C609E ${(props) => props.$volume * 360}deg
  );
  box-shadow: inset 2px 2px 16px rgba(3, 38, 83, 0.5), -7px -7px 30px rgba(87, 179, 255, 0.5),  5px 8px 30px rgba(6, 22, 42, 1);
  z-index: 99;
`;

export const VolumeIndicator = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: red;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${(props) => (props.$volume * 360) - 90}deg) translate(124px);
  cursor: pointer;
  z-index: 99;
  box-shadow: 1px 1px 10px rgba(2, 19, 40, 0.9);

`;

export const Container_img = styled.div`
    width: 230px;
    height: 230px;
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