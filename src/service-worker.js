// service-worker.js

// Evitar cache de requisições relacionadas à contagem de ouvintes
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/listeners')) {
      // Garante que as requisições para a contagem de ouvintes sempre vão para a rede
      event.respondWith(fetch(event.request));
    } else {
      // Lógica padrão de cache para outras requisições
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
    const countDocRef = 'URL_DA_SUA_API_PARA_ATUALIZAR_OUVINTES'; // Substitua pelo endpoint da sua API
    try {
      // Aqui você pode buscar a contagem atual ou realizar a atualização
      const response = await fetch(countDocRef);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      // Aqui você pode atualizar a contagem de ouvintes conforme necessário
      console.log('Sincronizando contagem de ouvintes:', data);
      
      // Se precisar atualizar a contagem, você pode enviar uma requisição POST ou PUT
      // Exemplo:
      // await fetch(countDocRef, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ count: data.count }), // Ajuste conforme sua estrutura de dados
      // });
    } catch (error) {
      console.error('Erro ao sincronizar contagem de ouvintes:', error);
    }
  }
  