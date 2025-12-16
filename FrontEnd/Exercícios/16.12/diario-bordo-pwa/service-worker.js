const CACHE_NAME = 'diario-bordo-v1.0';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icons/icon-192x192.png'
];

// INSTALAÇÃO
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('Falha ao adicionar ao cache:', error);
      })
  );
  self.skipWaiting(); // IMPORTANTE para Firefox
});

// ATIVAÇÃO
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // IMPORTANTE para Firefox
});

// FETCH (Estratégia: Cache First)
self.addEventListener('fetch', function(event) {
  // Firefox bloqueia algumas requisições
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        
        // Clona a requisição porque ela só pode ser usada uma vez
        var fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(function(response) {
            // Verifica se a resposta é válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clona a resposta para cache
            var responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(function() {
            // Se for uma página HTML, retorna a página offline
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('./index.html');
            }
          });
      })
  );
});