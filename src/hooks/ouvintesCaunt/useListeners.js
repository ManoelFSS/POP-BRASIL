import { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, increment, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/FirebaseConfig';

const isAndroid = () => /Android/i.test(navigator.userAgent);

export const useListeners = () => {
  const audioRef = useRef(null);
  const [listeners, setListeners] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
    const handlePlay = () => {
      // Verifica se o play está disponível
      if (!localStorage.getItem('playControl')) {
        incrementListenersCount();
        localStorage.setItem('playControl', 'true'); // Salva que o play foi executado
        setIsPlaying(true);
      } else {
        // Se o audio já foi tocado antes, apenas inicia
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
    };

    const handlePause = () => {
      if (isPlaying) {
        decrementListenersCount();
        localStorage.removeItem('playControl'); // Remove a variável de controle de play
      }
      setIsPlaying(false);
    };

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
  }, [audioRef, isPlaying]);

  useEffect(() => {
    const handlePageOpen = () => {
      localStorage.removeItem('decrementControl'); // Remove a variável de controle de decremento
      decrementListenersCount(); // Remove 1 do contador se for maior que 0
    };

    window.addEventListener('load', handlePageOpen);

    return () => {
      window.removeEventListener('load', handlePageOpen);
    };
  }, []);

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
        // Se o áudio já foi tocado antes, inicia automaticamente
        if (localStorage.getItem('playControl') && isAndroid()) {
          if (audioRef.current) {
            audioRef.current.play();
          }
          setIsPlaying(true); // Marca que o áudio está tocando
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  return { audioRef, listeners };
};
