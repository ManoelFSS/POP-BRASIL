import { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, increment, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/FirebaseConfig';

export const useListeners = () => {
  const audioRef = useRef(null);
  const [listeners, setListeners] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);

  const initializeListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const docSnapshot = await getDoc(countDocRef);

    if (!docSnapshot.exists()) {
      await setDoc(countDocRef, { count: 0 });
    }
  };

  const incrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(1) });
  };

  const decrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(-1) });
  };

  // Inicializa a contagem ao montar o componente
  useEffect(() => {
    initializeListenersCount();
    const counted = sessionStorage.getItem('hasCounted') === 'true';
    setHasCounted(counted);
  }, []);

  // Função para incrementar ao tocar o áudio
  const handlePlay = () => {
    if (!hasCounted) {
      incrementListenersCount();
      sessionStorage.setItem('hasCounted', 'true');
      setHasCounted(true);
    }
  };

  // Função para decrementar ao pausar o áudio
  const handlePause = () => {
    if (hasCounted) {
      decrementListenersCount();
      sessionStorage.setItem('hasCounted', 'false');
      setHasCounted(false);
    }
  };

  // Gerenciar eventos de play/pause no áudio
  useEffect(() => {
    const audio = audioRef.current;

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

  // Gerenciar o comportamento ao fechar a aba ou sair da página
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasCounted) {
        decrementListenersCount();
        sessionStorage.removeItem('hasCounted');
      }
    };

    const handleConnectionChange = () => {
      if (!navigator.onLine && hasCounted) {
        decrementListenersCount();
        sessionStorage.removeItem('hasCounted');
        setHasCounted(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [hasCounted]);

  // Sincronizar o número de ouvintes em tempo real com Firebase
  useEffect(() => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const unsubscribe = onSnapshot(countDocRef, (doc) => {
      if (doc.exists()) {
        setListeners(doc.data().count);
      }
    });

    return () => unsubscribe();
  }, []);

  return { audioRef, listeners };
};
