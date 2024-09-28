import { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, increment, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/FirebaseConfig';

const isAndroid = () => /Android/i.test(navigator.userAgent);

export const useListeners = () => {
  const audioRef = useRef(null);
  const [listeners, setListeners] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCounted, setHasCounted] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true); // Para rastrear se é a primeira visita

  // Função para inicializar o contador de ouvintes no Firebase, caso não exista
  const initializeListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const docSnapshot = await getDoc(countDocRef);

    if (!docSnapshot.exists()) {
      await setDoc(countDocRef, { count: 0 });
    }
  };

  // Função para incrementar o contador de ouvintes no Firebase
  const incrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(1) });
  };

  // Função para decrementar o contador de ouvintes no Firebase
  const decrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(-1) });
  };

  // Inicializa o contador de ouvintes no Firebase
  useEffect(() => {
    initializeListenersCount();
  }, []);

  // Gerencia os eventos de play e pause no áudio
  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => {
      if (!hasCounted) {
        incrementListenersCount(); // Incrementa o contador no primeiro play
        setHasCounted(true);
      }
      setIsPlaying(true); // Marca o áudio como "tocando"
    };

    const handlePause = () => {
      if (isPlaying) {
        decrementListenersCount(); // Decrementa o contador ao pausar o áudio
      }
      setIsPlaying(false); // Marca o áudio como "parado"
      setHasCounted(false);
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
  }, [audioRef, hasCounted, isPlaying]);

  // Lida com a contagem ao fechar a aba ou recarregar a página
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        decrementListenersCount(); // Decrementa o contador ao fechar ou recarregar a página
        setHasCounted(false); // Reseta a contagem para permitir que incremente novamente no próximo play
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPlaying]);

  // Sincroniza a contagem de ouvintes em tempo real
  useEffect(() => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const unsubscribe = onSnapshot(countDocRef, (doc) => {
      if (doc.exists()) {
        setListeners(doc.data().count); // Atualiza o estado com a contagem atual do Firebase
      }
    });

    return () => unsubscribe(); // Cancela a escuta no Firebase ao desmontar o componente
  }, []);

  // Lida com a visibilidade da aba e controle de áudio
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Se for a primeira visita, não toca o áudio automaticamente
        if (isFirstVisit) {
          setIsFirstVisit(false); // Marca que não é mais a primeira visita
        } else {
          // Se for Android e não for a primeira visita, permite o áudio tocar automaticamente
          if (isAndroid() && audioRef.current && !isPlaying) {
            audioRef.current.play();
            setIsPlaying(true); // Marca que o áudio está tocando
            setHasCounted(true); // Não incrementa o contador novamente
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isFirstVisit, isPlaying]);

  return { audioRef, listeners }; // Retorna a referência de áudio e a contagem de ouvintes
};
