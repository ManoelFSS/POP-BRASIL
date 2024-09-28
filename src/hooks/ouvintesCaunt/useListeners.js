import { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, increment, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/FirebaseConfig';

export const useListeners = () => {
  const audioRef = useRef(null);
  const [listeners, setListeners] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);
  const localStorageKey = 'hasVisited';

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

  const isNewTabOrFirstVisit = () => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      return false;
    }
    return true;
  };

  const removeFromFirebase = async () => {
    console.log('Removendo 1 do Firebase...');
    await decrementListenersCount();
  };

  useEffect(() => {
    initializeListenersCount();

    const counted = sessionStorage.getItem('hasCounted') === 'true';
    setHasCounted(counted);

    if (isNewTabOrFirstVisit()) {
      console.log('Nova aba ou primeira visita - limpando localStorage');
      localStorage.removeItem(localStorageKey);
    }

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

  // Verifica o fechamento da aba ou recarregamento real
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasCounted) {
        // Se for uma nova sessão ou aba realmente fechada
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        if (!document.hidden && !isMobile) {
          // Apenas remove se for uma nova sessão, não colocando aba em segundo plano
          decrementListenersCount();
          sessionStorage.setItem('hasCounted', 'false');
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasCounted]);

  // Detecta se a aba está apenas em segundo plano e não decrementa
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Aba foi trazida para frente.');
      } else {
        console.log('Aba em segundo plano - contador não será decrementado');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Escuta atualizações do Firebase
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
