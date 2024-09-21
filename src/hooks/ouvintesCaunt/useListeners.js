import { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, increment, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/FirebaseConfig'; // Certifique-se de que o Firestore está configurado corretamente

// Hook customizado que gerencia o contador de ouvintes
export const useListeners = () => {
  const audioRef = useRef(null); // Referência para o player de áudio
  const [listeners, setListeners] = useState(0); // Estado para armazenar o número de ouvintes

  // Função para inicializar o contador de ouvintes no Firestore, se ele não existir
  const initializeListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await setDoc(countDocRef, { count: 0 }, { merge: true });
  };

  // Função para incrementar o contador
  const incrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(1) });
  };

  // Função para decrementar o contador
  const decrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(-1) });
  };

  // Inicializa o contador quando o componente monta
  useEffect(() => {
    initializeListenersCount();
  }, []);

  // Adiciona listeners ao player de áudio e atualiza o contador quando o áudio é tocado ou pausado
  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => {
      incrementListenersCount(); // Incrementa quando o áudio começa a tocar
    };

    const handlePause = () => {
      decrementListenersCount(); // Decrementa quando o áudio é pausado
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
  }, [audioRef]);

  // Gerencia a visibilidade da aba do navegador
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (document.hidden) {
        if (audio && !audio.paused) {
          decrementListenersCount(); // Decrementa se a aba for escondida enquanto o áudio está tocando
        }
      } else {
        if (audio && !audio.paused) {
          incrementListenersCount(); // Incrementa se a aba voltar ao foco enquanto o áudio está tocando
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [audioRef]);

  // Escuta o Firestore em tempo real para atualizar o número de ouvintes
  useEffect(() => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const unsubscribe = onSnapshot(countDocRef, (doc) => {
      if (doc.exists()) {
        setListeners(doc.data().count); // Atualiza o estado com o número de ouvintes atual
      }
    });

    return () => unsubscribe(); // Cleanup ao desmontar o componente
  }, []);

  // Função para lidar com a saída da página
  useEffect(() => {
    const handleBeforeUnload = () => {
      decrementListenersCount(); // Decrementa quando o usuário fecha a aba ou recarrega
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Retorna o áudio e o número de ouvintes para ser usado no componente principal
  return { audioRef, listeners };
};
