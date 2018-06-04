var cacheName = "PCR-CALC-0.00.001";
var filesToCache     = [
  'index.html',
  'css/style.css',

  'manifest.json',

  'worker.js',
  
  'js/script.js',
  'js/sw.js'
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
        caches.open(cacheName).then(function(cache) {
        return cache.match(e.request).then(function (response) {
            return response || fetch(e.request).then(function(response) {
                cache.put(e.request, response.clone());
                return response;
            });
        });
        })
    );
});

/** STANDARDOWY PRZYKŁAD */
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        cache.addAll([
            'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
            'https://fonts.googleapis.com/css?family=Lato|Raleway:200'
        ]);
        return cache.addAll(filesToCache);
        })
    );
});