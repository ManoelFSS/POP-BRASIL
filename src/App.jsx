import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home"

function App() {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Ajustar o timer para controlar o tempo de exibição da tela de carregamento
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 3000);  // Delay de 3 segundos; ajuste conforme necessário

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      { isLoading ? <Home /> : null }
    </>
  )
}

export default App
