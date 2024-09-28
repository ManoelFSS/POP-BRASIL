import { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, increment, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/FirebaseConfig';

export const useListeners = () => {
  const audioRef = useRef(null);
  const [listeners, setListeners] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Para verificar se o áudio está tocando
  const [hasCounted, setHasCounted] = useState(false); // Para verificar se já incrementou

  // Função para inicializar o contador de ouvintes no Firebase
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

  useEffect(() => {
    initializeListenersCount();

    return () => {
      setHasCounted(false);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => {
      if (!hasCounted) {
        incrementListenersCount();
        setHasCounted(true); // Marcar que já contou
      }
      setIsPlaying(true); // Marcar que o áudio está tocando
    };

    const handlePause = () => {
      // Remove um ouvinte quando o áudio é pausado
      if (isPlaying) {
        decrementListenersCount();
      }
      setIsPlaying(false); // Atualiza o estado para pausado
      setHasCounted(false); // Permitir que o contador seja incrementado novamente
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

  // Controle para fechamento de aba
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        decrementListenersCount();
        setHasCounted(false); // Reinicia a contagem para nova sessão
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPlaying]);

  // Escuta as mudanças no contador de ouvintes no Firebase
  useEffect(() => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const unsubscribe = onSnapshot(countDocRef, (doc) => {
      if (doc.exists()) {
        setListeners(doc.data().count);
      }
    });

    return () => unsubscribe();
  }, []);

  // Lidar com a visibilidade da aba
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Se a aba é visível e está pausada, podemos dar play sem incrementar o contador
        if (audioRef.current && audioRef.current.paused) {
          setIsPlaying(false);
          setHasCounted(false); // Permitir que o contador seja incrementado na próxima vez que o áudio tocar
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { audioRef, listeners };
};
