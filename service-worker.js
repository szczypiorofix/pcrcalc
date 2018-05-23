var cacheName = 'PCR-calc.v-1.00.000';

/**
 * 'css/fontawesome-all.min.css',
 */
var filesToCache = [
    '/',
    'index.html',
    'help.json',

    'js/app.js',
    'js/app.js.map',
    'js/script.js',
    'js/script.js.map',

    'css/style.css',
    'css/style.css.map',
    'https://use.fontawesome.com/releases/v5.0.13/css/all.css',

    //'webfonts/Lato-Regular.ttf',
    'https://fonts.googleapis.com/css?family=Lato|Raleway:200',

    'manifest.json',
    'browserconfig.xml',

    'icons/android-icon-36x36.png',
    'icons/android-icon-48x48.png',
    'icons/android-icon-72x72.png',
    'icons/android-icon-96x96.png',
    'icons/android-icon-144x144.png',
    'icons/android-icon-192x192.png',
    'icons/apple-icon-57x57.png',
    'icons/apple-icon-60x60.png',
    'icons/apple-icon-72x72.png',
    'icons/apple-icon-76x76.png',
    'icons/apple-icon-114x114.png',
    'icons/apple-icon-120x120.png',
    'icons/apple-icon-144x144.png',
    'icons/apple-icon-152x152.png',
    'icons/apple-icon-180x180.png',
    'icons/apple-icon-precomposed.png',
    'icons/apple-icon.png',
    'icons/favicon-16x16.png',
    'icons/favicon-32x32.png',
    'icons/favicon-96x96.png',
    'icons/favicon.ico',
    'icons/ms-icon-70x70.png',
    'icons/ms-icon-144x144.png',
    'icons/ms-icon-150x150.png',
    'icons/ms-icon-310x310.png',
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

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        // To jest konieczne
        return cache.addAll(filesToCache);

        // To nie jest konieczne ale może być pobierane potem
        //cache.addAll(filesToCache);
        })
    );
});
