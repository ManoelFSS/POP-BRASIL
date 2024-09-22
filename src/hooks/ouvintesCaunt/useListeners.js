import { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, increment, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/FirebaseConfig';

export const useListeners = () => {
  const audioRef = useRef(null);
  const [listeners, setListeners] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);

  // Inicializa o contador de ouvintes no Firebase
  const initializeListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const docSnapshot = await getDoc(countDocRef);

    if (!docSnapshot.exists()) {
      await setDoc(countDocRef, { count: 0 });
    }
  };

  // Incrementa o contador de ouvintes no Firebase
  const incrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(1) });
  };

  // Decrementa o contador de ouvintes no Firebase
  const decrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(-1) });
  };

  // Decrementa o contador em dispositivos móveis
  const decrementListenersCountMobile = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(-1) });
  };

  // Função para verificar se o áudio está pausado
  const isAudioPlaying = () => {
    return audioRef.current && !audioRef.current.paused;
  };

  // Limpa a sessão ao fechar a aba ou a janela, forçando o decremento
  const handleUnload = () => {
    if (hasCounted) {
      const isMobile = /Mobi|Android/i.test(navigator.userAgent);
      if (isMobile) {
        decrementListenersCountMobile();
      } else {
        decrementListenersCount();
      }
      sessionStorage.removeItem('hasCounted'); // Remover o status da sessão ao fechar
    }
  };

  // Monitoramento e manipulação de contagem de ouvintes
  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => {
      if (!hasCounted) {
        incrementListenersCount();
        sessionStorage.setItem('hasCounted', 'true');
        setHasCounted(true);
      }
    };

    const handlePause = () => {
      if (hasCounted) {
        decrementListenersCount();
        sessionStorage.setItem('hasCounted', 'false');
        setHasCounted(false);
      }
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
  }, [audioRef, hasCounted]);

  // Detecção de mudanças de visibilidade
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Só remove o ouvinte se o áudio realmente parar
      if (document.hidden && !isAudioPlaying() && hasCounted) {
        decrementListenersCount();
        sessionStorage.setItem('hasCounted', 'false');
        setHasCounted(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasCounted]);

  // Atualiza o estado dos ouvintes em tempo real com o Firebase
  useEffect(() => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const unsubscribe = onSnapshot(countDocRef, (doc) => {
      if (doc.exists()) {
        setListeners(doc.data().count);
      }
    });

    return () => unsubscribe();
  }, []);

  // Decrementa a contagem ao fechar a janela
  useEffect(() => {
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [hasCounted]);

  // Inicializa o contador ao carregar
  useEffect(() => {
    initializeListenersCount();
    const counted = sessionStorage.getItem('hasCounted') === 'true';
    setHasCounted(counted);

    return () => {
      setHasCounted(false);
    };
  }, []);

  return { audioRef, listeners };
};
