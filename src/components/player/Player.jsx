import React, { useState, useRef, useEffect } from 'react';
import { PlayerControls, VolumeContainer, VolumeIndicator, Container_img, Btns } from './PlayerStyles';

import { FaPlay, FaPause, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { AiFillSound,  AiOutlineLike } from "react-icons/ai";


import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { PiShareFatDuotone } from "react-icons/pi";

import Btn_icon from "../btn/Btn_Icon";


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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Define o volume inicial
      audioRef.current.play(); // Inicia a reprodução automática
      setIsPlaying(true); // Atualiza o estado para "reproduzindo"
    }
  }, []); // O array vazio garante que isso ocorra apenas na montagem

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
      <PlayerControls >
        <VolumeContainer $volume={volume} ref={volumeContainerRef} $like={1000}>
          <Container_img style={{ background: ` #fff url(${albumCover}) no-repeat center / 80% 80%` }} />

          <VolumeIndicator
            $volume={volume}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            style={{ background: ` url(${<AiFillSound />}) no-repeat center / 80% 80%` }}
          >
            <AiFillSound />
          </VolumeIndicator>

          <div className="like_compartilhar_area">
            <Btn_icon icon={<AiOutlineLike />} />
            <Btn_icon icon={<PiShareFatDuotone />} />
          </div>
        </VolumeContainer>

        <div className="socialMidias">
            <Btn_icon icon={<FaFacebookF />} />
            <Btn_icon icon={<FaInstagram />} />
            <Btn_icon icon={<FaWhatsapp />} />
        </div>
          
        <Btns>
          <Btn_icon icon={<TbPlayerTrackPrevFilled />} onClick={handlePlayPause} />
          <Btn_icon icon={isPlaying ? <FaPause style={{ color: "red" }} /> : <FaPlay />} onClick={handlePlayPause} />
          <Btn_icon icon={<TbPlayerTrackNextFilled />} onClick={handlePlayPause} />
        </Btns>
      </PlayerControls>
    </div>
  );
};

export default Player;
