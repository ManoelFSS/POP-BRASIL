import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause } from 'react-icons/fa';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";

const PlayerControls = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 40px;
  align-items: center;
`;

const ControlButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: #04375E;
  box-shadow: -3px -3px 25px rgba(87, 179, 255, 0.8),  5px 5px 20px rgba(6, 22, 42, 1);
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color:#fff;
  transition: color 0.3s;
  cursor: pointer;
  

  &:hover {
    color: red;
  }
    z-index: 99;
`;

const VolumeContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: conic-gradient(
    rgba(44, 44, 44, 0.5) ${({ volume }) => volume * 360}deg,
    #2C609E ${({ volume }) => volume * 360}deg
  );
  box-shadow: inset 2px 2px 16px rgba(3, 38, 83, 0.7), -7px -7px 30px rgba(87, 179, 255, 0.8),  5px 8px 30px rgba(6, 22, 42, 0.971);
  z-index: 99;
`;

const VolumeIndicator = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: red;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${({ volume }) => (volume * 360) - 90}deg) translate(92px);
  cursor: pointer;
  z-index: 99;
  box-shadow: 1px 1px 10px rgba(2, 19, 40, 0.9);
 

`;

const Container_img = styled.div`
    width: 170px;
    height: 170px;
    border-radius: 50%;
    z-index: 1;
    user-select: none;
    outline: none;
    pointer-events: none; /* Desabilita interações com o ponteiro */
    box-shadow:  1px 2px 10px rgba(3, 38, 83, 1);
    overflow: hidden;
    background: #fff url( ${({ albumCover }) => albumCover}) no-repeat center / 80% 80%;
`
const Btns = styled.div`
    display: flex;
    justify-content:center;
    gap: 20px;
    z-index: 99;
`

const calculateAngle = (x, y, centerX, centerY) => {
  const dx = x - centerX;
  const dy = y - centerY;
  let angle = Math.atan2(dy, dx) * (180 / Math.PI); // Calcula o ângulo em graus
  angle = (angle + 90 + 360) % 360; // Ajusta para que o topo seja 0 graus
  return angle;
};

const Player = ({ audioSrc, albumCover }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3); // Volume inicial (começa com 30%)
  const audioRef = useRef(null);
  const volumeContainerRef = useRef(null);
  const dragging = useRef(false);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (clientX, clientY) => {
    const containerRect = volumeContainerRef.current.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const angle = calculateAngle(clientX, clientY, centerX, centerY);
    let newVolume = angle / 360;

    // Limita o volume entre 0.05 e 0.95 para evitar ultrapassar o topo
    newVolume = Math.max(Math.min(newVolume, 0.95), 0.05);

    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMouseDown = () => {
    dragging.current = true;
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleMouseMove = (event) => {
    if (dragging.current) {
      handleVolumeChange(event.clientX, event.clientY);
    }
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    handleVolumeChange(touch.clientX, touch.clientY);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <audio ref={audioRef} src={audioSrc} />
        <PlayerControls>
            <Btns>
                {/* <ControlButton onClick={handlePlayPause}>
                    <TbPlayerTrackPrevFilled />
                </ControlButton> */}
               
                <ControlButton onClick={handlePlayPause}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </ControlButton>

                {/* <ControlButton onClick={handlePlayPause}>
                    <TbPlayerTrackNextFilled />
                </ControlButton> */}
                
            </Btns>
            <VolumeContainer volume={volume} ref={volumeContainerRef}>
                <Container_img albumCover={albumCover}>

                </Container_img>
                <VolumeIndicator
                    volume={volume}
                    onMouseDown={handleMouseDown}
                    onTouchMove={handleTouchMove}
                />
            </VolumeContainer>
        </PlayerControls>
    </div>
  );
};

export default Player;
