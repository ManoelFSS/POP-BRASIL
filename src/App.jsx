import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home"


// index.js ou App.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js') // Caminho para o seu arquivo service-worker.js
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.error('Erro ao registrar o Service Worker:', error);
      });
  });
}


function App() {

  return (
    <>
      <Home /> 
    </>
  )
}

export default App
