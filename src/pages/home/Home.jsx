import React, { useState, useEffect } from "react";
import { Container_home } from "./HomeStyles"
import  Player from "../../components/player/Player"


const Home = () => {

    const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    // Ouvir o evento 'beforeinstallprompt'
    const handleBeforeInstallPrompt = (event) => {
      // Prevenir o prompt padrão do navegador
      event.preventDefault();
      // Salvar o evento para que possa ser acionado mais tarde
      setInstallPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      // Limpar o ouvinte de eventos quando o componente for desmontado
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    console.log('Clicou no botão de instalar');
    // Mostrar o prompt de instalação ao usuário
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação do PWA');
        } else {
          console.log('Usuário não aceitou a instalação do PWA');
        }
        // Resetar a variável após ser usada
        setInstallPrompt(null);
      });
    }
  };

    const audioSrc = "https://s03.transmissaodigital.com:6694/stream" // link de reprodução da Pop Brasil FM

    return (
        <Container_home>
            <Player audioSrc={audioSrc} albumCover={"https://img.radios.com.br/radio/lg/radio34301_1719839328.png"} />
            <button onClick={() => handleInstallClick()}>
                Instalar Aplicativo
            </button>
        </Container_home>
    )
}

export default Home