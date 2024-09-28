// service-worker.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js');
importScripts('../src/services/FirebaseConfig.js'); // Altere para o caminho correto do seu arquivo

// Inicializando o Firestore
const db = firebase.firestore();

// Evitar cache de requisições relacionadas à contagem de ouvintes
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/listeners')) {
    event.respondWith(fetch(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Adicionando suporte ao Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-listeners') {
    event.waitUntil(syncListenersCount());
  }
});

// Função para sincronizar a contagem de ouvintes
async function syncListenersCount() {
  const countDocRef = db.collection('listeners').doc('listenersCount');

  try {
    const doc = await countDocRef.get();
    if (!doc.exists) {
      await countDocRef.set({ count: 0 });
    }

    // Atualizar a contagem de ouvintes
    await countDocRef.update({
      count: firebase.firestore.FieldValue.increment(1),
    });

    console.log('Contagem de ouvintes atualizada');
  } catch (error) {
    console.error('Erro ao sincronizar contagem de ouvintes:', error);
  }
}
