import React, { useState, useEffect } from "react";
import { Container_home } from "./HomeStyles";
import Btn_Install_app from "../../components/btn/Btn_Install_app";
import Player from "../../components/player/Player";
import Card_Locutor from "../../components/cards/card_locutor/Card_Locutor";
import SomGif from "../../../public/somGif.gif";

const Home = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Verifica se o app está em modo standalone
        const checkStandalone = () => {
            setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
        };

        checkStandalone();

        // Adiciona o evento antes do prompt de instalação
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault(); // Previne a exibição automática do prompt
            setDeferredPrompt(e); // Armazena o evento do prompt
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Limpa o evento ao desmontar o componente
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Exibe o prompt de instalação
            const { outcome } = await deferredPrompt.userChoice; // Aguarda a escolha do usuário
            console.log(outcome === 'accepted' ? 'Usuário aceitou a instalação' : 'Usuário rejeitou a instalação');
            setDeferredPrompt(null); // Reseta o prompt após o uso
        }
    };

    const audioSrc = "https://s03.transmissaodigital.com:6694/stream"; // link de reprodução da Pop Brasil FM

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

                {/* Renderiza o botão de instalação apenas se não estiver em modo standalone */}
                {deferredPrompt && !isStandalone && (
                    <Btn_Install_app onClick={handleInstallClick} />
                )}
            </Container_home>
        </>
    );
};

export default Home;
