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

  useEffect(() => {
    initializeListenersCount();

    const counted = sessionStorage.getItem('hasCounted') === 'true';
    setHasCounted(counted);

    return () => {
      setHasCounted(false);
    };
  }, []);

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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Não decrementa se o áudio está tocando
        if (!audioRef.current.paused && hasCounted) {
          // Se o áudio estiver tocando, não faz nada
          return;
        }
        // Se não está tocando, decrementa
        if (hasCounted) {
          decrementListenersCount();
          sessionStorage.setItem('hasCounted', 'false');
          setHasCounted(false);
        }
      } else {
        // Quando a aba volta ao foco
        if (audioRef.current && !audioRef.current.paused && !hasCounted) {
          incrementListenersCount();
          sessionStorage.setItem('hasCounted', 'true');
          setHasCounted(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasCounted]);

  useEffect(() => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const unsubscribe = onSnapshot(countDocRef, (doc) => {
      if (doc.exists()) {
        setListeners(doc.data().count);
      }
    });

    return () => unsubscribe();
  }, []);

  // Função para decrementar ao fechar a janela
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasCounted) {
        decrementListenersCount();
        sessionStorage.setItem('hasCounted', 'false');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasCounted]);

  return { audioRef, listeners };
};
