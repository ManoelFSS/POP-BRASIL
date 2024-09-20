import React, { useState, useEffect } from "react";
import { Container_home } from "./HomeStyles";
import Btn_Install_app from "../../components/btn/Btn_Install_app";
import Player from "../../components/player/Player";
import Header from "../../components/header/Header";
import SomGif from "../../../public/somGif.gif";
import Btn_icon from "../../components/btn/Btn_Icon";

import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaYoutube } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFatDuotone } from "react-icons/pi";


import Google from "../../../public/google.png";
import { useAuthContext } from "../../context/contextAuth/ContexAuth"; // Certifique-se de ajustar o caminho

const Home = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isStandalone, setIsStandalone] = useState(false);
    const [isInstallable, setIsInstallable] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const User = JSON.parse(localStorage.getItem("User"));
    
    const { signInGoogle } = useAuthContext(); // Obtendo o usuário do contexto de autenticação

    useEffect(() => {
        const checkStandalone = () => {
            setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
        };

        checkStandalone();

        const handleBeforeInstallPrompt = (e) => {
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            setDeferredPrompt(null);
            setIsInstallable(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Radio Pop Brasil',
                    text: 'Primeiro Lugar, em Todos os Lugares!',
                    url: 'https://pop-brasil.vercel.app/',
                });
            } catch (error) {
                console.error('Erro ao compartilhar:', error);
            }
        } else {
            alert('Compartilhamento não suportado no seu dispositivo.');
        }
    };

    const MP3 = import.meta.env.VITE_MP3_RADIO;

    console.log(modalVisible)

    return (
        <>
            <Container_home>
                <Header setModalVisible={setModalVisible} />
                <div className="top_home">
                    <h1>POP BRASIL FM 93.7</h1>
                    <p>Primeiro Lugar, em Todos os Lugares</p>
                    <div className="socialMidias">
                        <a href="https://www.facebook.com/radiopopbrasilfm/?locale=pt_BR" target="_blank">
                            <Btn_icon icon={<FaFacebookF />} />
                        </a>
                        <a href="https://www.instagram.com/radio.popbrasilfm/" target="_blank">
                            <Btn_icon icon={<FaInstagram />} />
                        </a>
                        <a href="https://www.youtube.com/watch?v=ynJgNmBXL6I" target="_blank">
                            <Btn_icon icon={<FaYoutube />} />
                        </a>
                    </div>
                </div>

                <div className="center_home">
                    <Player audioSrc={MP3} albumCover={"https://img.radios.com.br/radio/lg/radio34301_1719839328.png"} />
                    <div className="gif">
                        <img src={SomGif} alt="gif som animation" />
                    </div>
                </div>

                {/* <div className="card_container"> 
                    <Card_Locutor />
                </div> */}

                <div className="like_compartilhar_area">
                    {/* <div className='btn_icon'>
                        <Btn_icon icon={<AiOutlineLike />} />
                        <p>1000</p>
                    </div> */}

                    <div className='btn_icon'>
                        {User === null ? (
                            <Btn_icon icon={<FaWhatsapp />} onClick={() => setModalVisible(true)} />
                        ) : (
                            <a href="https://wa.me/5587996076111" target="_blank">
                                <Btn_icon icon={<FaWhatsapp />} />
                            </a>
                        )}
                        <p>Pedir Música</p>
                    </div>

                    <div className='btn_icon'>
                        <Btn_icon icon={<PiShareFatDuotone onClick={handleShare} />} />
                        <p>Compartilhar</p>
                    </div>
                </div>

                <div className="install">
                    {isInstallable && !isStandalone && (
                        <Btn_Install_app onClick={handleInstallClick} />
                    )}
                </div>

                {/* Modal de login */}
                <div className="popup" style={{ display: modalVisible  ? 'block' : 'none' }}>
                    <p onClick={() => setModalVisible(false)}>X</p>
                    <h3>Faça login para pedir uma música</h3>
                    <div>
                        <img src={Google} alt="google" />
                        <button onClick={() => {
                            signInGoogle(); // Chama a função de login
                            setModalVisible(false); // Fecha o modal
                        }}>Login</button>
                    </div>
                </div>
            </Container_home>
        </>
    );
};

export default Home;
