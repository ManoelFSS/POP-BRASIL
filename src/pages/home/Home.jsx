import React, { useState, useEffect } from "react";
import { Container_home } from "./HomeStyles";
import Btn_Install_app from "../../components/btn/Btn_Install_app";
import Player from "../../components/player/Player";
import Card_Locutor from "../../components/cards/card_locutor/Card_Locutor";
import Header from "../../components/header/Header";
import SomGif from "../../../public/somGif.gif";
import Btn_icon from "../../components/btn/Btn_Icon";

import {FaFacebookF, FaInstagram, FaWhatsapp} from 'react-icons/fa';
import { FaYoutube } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFatDuotone } from "react-icons/pi";


const Home = () => {

    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isStandalone, setIsStandalone] = useState(false);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        // Verifica se o app está em modo standalone
        const checkStandalone = () => {
            setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
            
        };

        checkStandalone();

        const handleBeforeInstallPrompt = (e) => {
            // e.preventDefault(); // Previne o comportamento padrão do prompt
            setDeferredPrompt(e); // Armazena o evento
            setIsInstallable(true); // Exibe o botão de instalação
            console.log("Prompt de instalação capturado.");
            console.log(isStandalone)
            console.log(e)
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        console.log("Clicou no botão de instalação");
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Exibe o prompt de instalação
            const { outcome } = await deferredPrompt.userChoice; // Aguarda a escolha do usuário
            console.log(outcome === 'accepted' ? 'Usuário aceitou a instalação' : 'Usuário rejeitou a instalação');
            setDeferredPrompt(null); // Reseta o prompt após o uso
            setIsInstallable(false); // Oculta o botão de instalação
        } else {
            console.log("Nenhum prompt de instalação disponível.");
        }
    };

    const MP3 = import.meta.env.VITE_MP3_RADIO

    return (
        <>
            <Container_home>
                <Header />
                <div className="top_home">
                    <h1>POP BRASIL FM 93.7</h1>
                    <p>Primeiro Lugar, em Todos os Lugares</p>

                    <div className="socialMidias">
                        <a href="https://www.facebook.com/radiopopbrasilfm/?locale=pt_BR" target="_blank">  <Btn_icon icon={<FaFacebookF />} /> </a>
                        <a href="https://www.instagram.com/radio.popbrasilfm/" target="_blank"> <Btn_icon icon={<FaInstagram />} /> </a> 
                        <a href="https://www.youtube.com/watch?v=ynJgNmBXL6I" target="_blank"> <Btn_icon icon={<FaYoutube />} /> </a>
                    </div>
                </div>

                <div className="center_home">
                    <Player audioSrc={MP3} albumCover={"https://img.radios.com.br/radio/lg/radio34301_1719839328.png"} />
                    <div className="gif">
                        <img src={SomGif} alt="gif som animation" />
                    </div>
                </div>

                <div className="card_container"> 
                    <Card_Locutor />
                </div>

                <div className="like_compartilhar_area">
                    
                    <div className='btn_icon'>
                        <Btn_icon icon={<AiOutlineLike />} />
                        <p>1000</p>
                    </div>

                    <div className='btn_icon' >
                        <Btn_icon icon={<FaWhatsapp />} />
                        <p>Pedir Musica</p>
                    </div>

                    <div className='btn_icon'>
                        <Btn_icon icon={<PiShareFatDuotone />} />
                        <p>Compartilhar</p>
                    </div>
                    
                </div>

                {/* <div className="install">
                    {isInstallable && !isStandalone && (
                        <Btn_Install_app onClick={handleInstallClick} />
                    )}
                </div> */}
                
            </Container_home>
        </>
    );
};

export default Home;
