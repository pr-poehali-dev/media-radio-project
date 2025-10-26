const CACHE_NAME = 'kontentmedia-pro-v1';
const AUDIO_CACHE = 'kontentmedia-audio-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/pages/Index.tsx',
  '/src/index.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== AUDIO_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  if (url.pathname.endsWith('.mp3') || url.pathname.endsWith('.m3u8') || url.pathname.includes('stream')) {
    event.respondWith(
      caches.open(AUDIO_CACHE).then((cache) => {
        return fetch(request).then((response) => {
          if (response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        }).catch(() => {
          return cache.match(request);
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      })
      .catch(() => {
        return caches.match('/');
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-radio-data') {
    event.waitUntil(
      fetch('/api/current-track')
        .then(response => response.json())
        .then(data => {
          return self.registration.showNotification('Сейчас играет', {
            body: data.track,
            icon: 'https://cdn.poehali.dev/files/2d3e3912-b6eb-47c7-ba9c-d15fa1f09df0.jpg',
            badge: 'https://cdn.poehali.dev/files/2d3e3912-b6eb-47c7-ba9c-d15fa1f09df0.jpg',
            tag: 'now-playing',
            requireInteraction: false
          });
        })
    );
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
