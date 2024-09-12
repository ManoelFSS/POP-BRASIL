import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

import React, { useState, useEffect } from 'react';

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Impede o prompt de instalação de aparecer automaticamente
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true); // Mostra o botão de instalação
    };

    // Adiciona o listener para o evento 'beforeinstallprompt'
    window.addEventListener('beforeinstallprompt', handler);

    // Remove o listener na desmontagem do componente
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Mostra o prompt de instalação
      deferredPrompt.prompt();

      // Aguardar a resposta do usuário
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuário aceitou instalar o PWA');
        } else {
          console.log('Usuário rejeitou instalar o PWA');
        }
        setDeferredPrompt(null); // Limpa o deferredPrompt após o uso
      });
    }
  };

  return (
    <>
      {isInstallable && (
        <button onClick={handleInstallClick} style={{ display: 'block' }}>
          Instalar PWA
        </button>
      )}
    </>
  );
};

export default InstallPWAButton;
