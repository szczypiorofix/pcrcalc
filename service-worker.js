var cacheName = 'PCR-calc.v-1.00.006';

var filesToCache = [
    'index.html',
    'help.html',
    'help.json',

    'js/pwa.js',
    'js/pwa.js.map',
    'js/script.js',
    'js/script.js.map',

    'css/style.css',
    'css/style.css.map',
    'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
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

    'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
    'https://fonts.googleapis.com/css?family=Lato|Raleway:200'
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
// self.addEventListener('install', function(e) {
//     console.log('[ServiceWorker] Install');
//     e.waitUntil(
//         caches.open(cacheName).then(function(cache) {
//         console.log('[ServiceWorker] Caching app shell');
//         return cache.addAll(filesToCache);
//         })
//     );
// });


/** POBIERAJ I ZWRACAJ CO NIEZBĘDNE ALE DODAJE DO CACHE TAKŻE INNE ELEMENTY NA POTEM BEZ WPŁYWU NA TE GŁÓWNE */
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            //cache.addAll([]); // - pliki na potem, pobieranie może się udać lub nie, bez wplywu na resztę
            return cache.addAll(filesToCache); // - niezbędne pliki
        })
    );
});


/** SYNC I PUSH */
// self.addEventListener('sync', function(event) {
//     console.log(event);
//     if (event.tag == 'update-leaderboard') {
//         event.waitUntil(
//             caches.open('mygame-dynamic').then(function(cache) {
//             return cache.add('help.json');
//             })
//         );
//     }
// });

// self.addEventListener('push', function(event) {
//     console.log(event);
//     if (event.data.text() == 'new-email') {
//         event.waitUntil(
//             caches.open(cacheName).then(function(cache) {
//             return fetch('/inbox.json').then(function(response) {
//                 cache.put('/inbox.json', response.clone());
//                 return response.json();
//             });
//             }).then(function(emails) {
//             registration.showNotification("New email", {
//                 body: "From " + emails[0].from.name, tag: "new-email"
//             });
//             })
//         );
//     }
// });
  
// self.addEventListener('notificationclick', function(e) {
//     var notification = e.notification;
//     var primaryKey = notification.data.primaryKey;
//     var action = e.action;
//     if (action === 'close') {
//         notification.close();
//     } else {
//         clients.openWindow('http://www.google.com');
//         notification.close();
//     }
// });

// self.addEventListener('notificationclose', function(e) {
//     var notification = e.notification;
//     var primaryKey = notification.data.primaryKey;
//     console.log('Closed notification: ' + primaryKey);
// });

/** POBIERAJ I ZWRACAJ CO NIEZBĘDNE ALE DODAJE DO CACHE TAKŻE INNE ELEMENTY NA POTEM BEZ WPŁYWU NA TE GŁÓWNE */
// self.addEventListener('install', function(e) {
//     console.log('[ServiceWorker] Install');
//     e.waitUntil(
//         caches.open(cacheName).then(function(cache) {
//         console.log('[ServiceWorker] Caching app shell');
//         cache.addAll(filesToCache); // - pliki na potem, pobieranie może się udać lub nie, bez wplywu na resztę
//         return cache.addAll(filesToCache); // - niezbędne pliki
//         })
//     );
// });

