import { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, increment, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/FirebaseConfig'; // Certifique-se de que o Firestore está configurado corretamente

// Hook customizado que gerencia o contador de ouvintes
export const useListeners = () => {
  const audioRef = useRef(null); // Referência para o player de áudio
  const [listeners, setListeners] = useState(0); // Estado para armazenar o número de ouvintes
  const [isCounting, setIsCounting] = useState(false); // Estado para controlar se o usuário está sendo contado como ouvinte

  // Função para inicializar o contador de ouvintes no Firestore, se ele não existir
  const initializeListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const docSnapshot = await getDoc(countDocRef);

    if (!docSnapshot.exists()) {
      await setDoc(countDocRef, { count: 0 });
    }
  };

  // Função para incrementar o contador
  const incrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(1) });
  };

  // Função para decrementar o contador
  const decrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(-1) });
  };

  // Inicializa o contador quando o componente monta
  useEffect(() => {
    initializeListenersCount();

    // Gera um ID de sessão único
    const sessionId = sessionStorage.getItem('sessionId') || Date.now();
    sessionStorage.setItem('sessionId', sessionId);

    // Verifica se o usuário já foi contado na sessão
    const hasCounted = sessionStorage.getItem('hasCounted');
    if (hasCounted === 'true') {
      setIsCounting(true); // Marca que já foi contado
    } else {
      // Se ainda não foi contado, marca que deve ser contado
      sessionStorage.setItem('hasCounted', 'false'); // Inicializa como 'false'
    }

    return () => {
      // Limpa o estado ao desmontar
      setIsCounting(false);
    };
  }, []);

  // Adiciona listeners ao player de áudio e atualiza o contador quando o áudio é tocado ou pausado
  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => {
      if (!isCounting) {
        incrementListenersCount(); // Incrementa quando o áudio começa a tocar
        sessionStorage.setItem('hasCounted', 'true'); // Marca que já foi contado
        setIsCounting(true); // Marca que já foi contado
      }
    };

    const handlePause = () => {
      decrementListenersCount(); // Decrementa quando o áudio é pausado
      setIsCounting(false); // Reseta o contador
    };

    if (audio) {
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      }
    };
  }, [audioRef, isCounting]);

  // Gerencia a visibilidade da aba do navegador
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Se a aba for escondida, não decremente se o áudio está tocando
        if (audioRef.current && !audioRef.current.paused) {
          return; // Não faz nada se o áudio está tocando
        }
      } else {
        // Quando a aba volta ao foco
        if (audioRef.current && !audioRef.current.paused) {
          // Incrementa se ainda não foi contado
          if (!isCounting) {
            incrementListenersCount();
            sessionStorage.setItem('hasCounted', 'true'); // Marca que já foi contado
            setIsCounting(true); // Marca que já foi contado
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isCounting]);

  // Escuta o Firestore em tempo real para atualizar o número de ouvintes
  useEffect(() => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const unsubscribe = onSnapshot(countDocRef, (doc) => {
      if (doc.exists()) {
        setListeners(doc.data().count); // Atualiza o estado com o número de ouvintes atual
      }
    });

    return () => unsubscribe(); // Cleanup ao desmontar o componente
  }, []);

  // Retorna o áudio e o número de ouvintes para ser usado no componente principal
  return { audioRef, listeners };
};
