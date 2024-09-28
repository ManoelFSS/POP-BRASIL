import { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, increment, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/FirebaseConfig';

export const useListeners = () => {
  const audioRef = useRef(null);
  const [listeners, setListeners] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);
  const localStorageKey = "hasVisited";

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

  const decrementListenersCountMobile = async () => {
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
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const docSnapshot = await getDoc(countDocRef);

    if (docSnapshot.exists()) {
      const currentCount = docSnapshot.data().count;

      if (currentCount > 1) {
        console.log("Removendo 1 do Firebase...");
        await decrementListenersCount(); // Decrementa se o contador for maior que 1
      } else if (currentCount === 1) {
        console.log("Mantendo 1 ouvinte no Firebase.");
        // Não faz nada se for 1, apenas mantém o contador
      } else {
        console.log("Não é possível remover, o contador já está em 0 ou menor.");
      }
    }
  };

  useEffect(() => {
    initializeListenersCount();

    // Se for uma nova aba ou a primeira visita
    if (isNewTabOrFirstVisit()) {
      console.log("Nova aba ou primeira visita - limpando localStorage e removendo 1 do Firebase");
      localStorage.removeItem(localStorageKey); // Limpa o localStorage
      removeFromFirebase(); // Remove 1 do Firebase
    }

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
        if (!audioRef.current.paused && hasCounted) {
          return; // Se o áudio estiver tocando, não faz nada
        }
        if (hasCounted) {
          decrementListenersCount();
          sessionStorage.setItem('hasCounted', 'false');
          setHasCounted(false);
        }
      } else {
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
    const handleBeforeUnload = (event) => {
      if (hasCounted) {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);
        if (isMobile) {
          decrementListenersCountMobile();
        } else {
          decrementListenersCount();
        }
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
