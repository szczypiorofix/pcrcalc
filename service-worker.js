var cacheName = 'PCR-calc';
var filesToCache = [
    '/',
    'index.html',
    
    'js/app.js',
    'js/script.js',
    
    'css/fontawesome-all.min.css',
    'css/style.css',
    
    'webfonts/Lato-Regular.ttf',

    'icons/favicon-16x16.png',
    'icons/favicon-32x32.png',
    'icons/favicon-96x96.png',
    'icons/apple-icon-57x57.png',
    'icons/apple-icon-60x60.png',
    'icons/apple-icon-72x72.png',
  ];

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});