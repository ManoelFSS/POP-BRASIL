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

  // Função para limpar sessionStorage ao fechar a aba
  const clearSessionOnUnload = () => {
    if (hasCounted) {
      decrementListenersCount();
      sessionStorage.removeItem('hasCounted');
      setHasCounted(false);
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

  // Detecção de mudanças de visibilidade sem remover o ouvinte quando o áudio está tocando
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;

      if (document.hidden) {
        // Aba foi para segundo plano, mas não removeremos o ouvinte se o áudio ainda estiver tocando
        if (audio && !audio.paused && hasCounted) {
          return; // Se o áudio estiver tocando, não remove o ouvinte
        }
        // Se o áudio estiver pausado e o ouvinte estiver contado, decrementa
        if (hasCounted && audio.paused) {
          decrementListenersCount();
          sessionStorage.setItem('hasCounted', 'false');
          setHasCounted(false);
        }
      } else {
        // Aba voltou ao primeiro plano, incrementa apenas se o áudio estiver tocando e não estiver contado
        if (audio && !audio.paused && !hasCounted) {
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

  // Decrementa a contagem ao fechar a janela e limpa a sessão
  useEffect(() => {
    window.addEventListener('beforeunload', clearSessionOnUnload);

    return () => {
      window.removeEventListener('beforeunload', clearSessionOnUnload);
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
