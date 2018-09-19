var cacheName = "PCR-CALC-0.00.001";

var filesToCache = [
    'index.html',
    
    'manifest.json',
    'browserconfig.xml',

    'js/sw.js',
    'js/sw.js.map',
    'js/script.js',
    'js/script.js.map',

    'css/style.css',
    'css/style.css.map',
    
    'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
    'https://fonts.googleapis.com/css?family=Lato|Raleway:200',

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
    'icons/ms-icon-310x310.png'
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
        cache.addAll([
            'https://use.fontawesome.com/releases/v5.0.13/css/all.css',
            'https://fonts.googleapis.com/css?family=Lato|Raleway:200'
        ]);
        return cache.addAll(filesToCache);
        })
    );
});

  
self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    console.log(e);
    cacheName = e.notification.data.version;
    console.log("Cache Name: "+cacheName);
    var action = e.action;
    if (action === 'update') {
        console.log('Aktaulizowanie aplikacji w toku ...');
        notification.close();
        location.reload();
    } else {
        console.log('Anulowanie aktualizacji...');
        notification.close();
    }
});

self.addEventListener('notificationclose', function(e) {
    console.log('Closed notification.');
    console.log(e.notification);
});

self.addEventListener('sync', function(e) {
    console.log('SYNC !!!');
    console.log(e.tag);
});

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
    const title = 'PCR Calc';
    const notificationIcon = 'icons/favicon.png';
    const options = {
        body: 'Jest dostępna nowa wersja aplikacji. Zaktualizować teraz?',
        icon: notificationIcon,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            version: "PCR-CALC-0.00.002"
        },
        actions: [
            {action: 'update', title: 'Aktualizacja', icon: notificationIcon},
            {action: 'cancel', title: 'Zamknij', icon: notificationIcon},
        ]
    };
  

    // var notificationIcon = 'icons/favicon.png';
    // navigator.serviceWorker.getRegistration().then(function(reg) {
    // var options = {
    //     body: 'Here is a notification body!',
    //     icon: notificationIcon,
    //     vibrate: [100, 50, 100],
    //     data: {
    //     dateOfArrival: Date.now(),
    //     primaryKey: 1
    //     },
    //     actions: [
    //         {action: 'explore', title: 'Explore this new world', icon: notificationIcon},
    //         {action: 'close', title: 'Close notification', icon: notificationIcon},
    //     ]
    // };
    // reg.showNotification('Hello world!', options);
    // });


    event.waitUntil(self.registration.showNotification(title, options));
});
