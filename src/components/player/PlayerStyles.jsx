import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause } from 'react-icons/fa';

// Estilizando o container e os botões
const PlayerControls = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

const VolumeContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: conic-gradient(
    ${({ volume }) => `red ${volume * 100}%, white ${volume * 100}%`}
  );
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const VolumeIndicator = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: blue; /* Cor da bolinha */
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${({ volume }) => volume * 360}deg)
    translate(60px); /* Distância da bolinha em relação ao centro */
  cursor: pointer;
`;

const AlbumCover = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  z-index: 1;
`;

const VolumeKnob = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  transform: rotate(-90deg);
`;

const calculateAngle = (x, y, centerX, centerY) => {
  const dx = x - centerX;
  const dy = y - centerY;
  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
  return angle < 0 ? 360 + angle : angle;
};

const Player = ({ audioSrc, albumCover }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Volume inicial de 0.5 (meio)
  const audioRef = useRef(null);
  const volumeContainerRef = useRef(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleVolumeChange = (event) => {
    const { clientX, clientY } = event.touches ? event.touches[0] : event;

    const containerRect = volumeContainerRef.current.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const angle = calculateAngle(clientX, clientY, centerX, centerY);
    const newVolume = angle / 360;

    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={audioSrc} />
      <PlayerControls>
        <ControlButton onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </ControlButton>

        {/* Controle de volume circular com capa de álbum */}
        <VolumeContainer volume={volume} ref={volumeContainerRef}>
          <AlbumCover src={albumCover} alt="Album Cover" />
          <VolumeIndicator
            volume={volume}
            onMouseDown={(e) => handleVolumeChange(e)}
            onMouseMove={(e) => e.buttons === 1 && handleVolumeChange(e)}
            onTouchMove={(e) => handleVolumeChange(e)}
          />
        </VolumeContainer>
      </PlayerControls>
    </div>
  );
};

export default Player;
