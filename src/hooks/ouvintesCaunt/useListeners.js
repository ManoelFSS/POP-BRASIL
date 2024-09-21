import { useEffect, useRef, useState } from 'react';
import { doc, updateDoc, increment, setDoc, onSnapshot, getDoc } from 'firebase/firestore';
import { db } from '../../services/FirebaseConfig'; // Certifique-se de que o Firestore está configurado corretamente

// Hook customizado que gerencia o contador de ouvintes
export const useListeners = () => {
  const audioRef = useRef(null); // Referência para o player de áudio
  const [listeners, setListeners] = useState(0); // Estado para armazenar o número de ouvintes

  // Função para inicializar o contador de ouvintes no Firestore, se ele não existir
  const initializeListenersCount = async () => {
    await setDoc(doc(db, 'listeners', 'listenersCount'), { count: 0 }, { merge: true });
  };

  // Função para incrementar o contador
  const incrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    await updateDoc(countDocRef, { count: increment(1) });
  };

  // Função para decrementar o contador
  const decrementListenersCount = async () => {
    const countDocRef = doc(db, 'listeners', 'listenersCount');
    const docSnap = await getDoc(countDocRef);
    
    if (docSnap.exists() && docSnap.data().count > 0) {
      await updateDoc(countDocRef, { count: increment(-1) });
    }
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

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

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

  // Retorna o áudio e o número de ouvintes para ser usado no componente principal
  return { audioRef, listeners };
};
