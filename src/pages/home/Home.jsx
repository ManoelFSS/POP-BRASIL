import React, { useState, useEffect } from "react";
import { Container_home } from "./HomeStyles"
import Btn_Install_app from "../../components/btn/Btn_Install_app";
import  Player from "../../components/player/Player"
import Card_Locutor from "../../components/cards/card_locutor/Card_Locutor"
import SomGif from "../../../public/somGif.gif"

const Home = () => {

    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Verifica se o app está em modo standalone
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsStandalone(true);
            console.log('App já está instalado ou em modo standalone.');
        } else {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                setDeferredPrompt(e);
                console.log('Prompt de instalação exibido.');
            });
        }

        // Limpeza do efeito
        return () => {
            window.removeEventListener('beforeinstallprompt', () => {});
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(outcome === 'accepted' ? 'Usuário aceitou a instalação' : 'Usuário rejeitou a instalação');
            setDeferredPrompt(null); // Reseta o prompt
        }
    };

    const audioSrc = "https://s03.transmissaodigital.com:6694/stream" // link de reprodução da Pop Brasil FM

    return (
        <>
            <Container_home>
                <div className="player">
                    <Player audioSrc={audioSrc} albumCover={"https://img.radios.com.br/radio/lg/radio34301_1719839328.png"} />
                </div>
                <div className="gif">
                    <img src={SomGif} alt="gif som animation" />
                </div>

                <Card_Locutor />
                
                {/* < Btn_Install_app  onClick={() => handleInstallClick()} /> */}
            </Container_home>
        </>
        
    )
}

export default Home