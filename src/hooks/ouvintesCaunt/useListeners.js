import { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, increment, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/FirebaseConfig';

export const useListeners = () => {
  const audioRef = useRef(null);
  const [listeners, setListeners] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCounted, setHasCounted] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true); // Para rastrear se é a primeira visita

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
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => {
      if (!hasCounted) {
        incrementListenersCount();
        setHasCounted(true);
      }
      setIsPlaying(true);
    };

    const handlePause = () => {
      if (isPlaying) {
        decrementListenersCount();
      }
      setIsPlaying(false);
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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        decrementListenersCount();
        setHasCounted(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPlaying]);

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
        if (isFirstVisit) {
          setIsFirstVisit(false); // Atualiza para não ser mais a primeira visita
        } else {
          // Se não for a primeira visita, permite que o áudio toque automaticamente
          if (audioRef.current) {
            audioRef.current.play();
          }
          setIsPlaying(true); // Marca que o áudio está tocando
          setHasCounted(true); // Não incrementa o contador novamente
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isFirstVisit]);

  return { audioRef, listeners };
};
