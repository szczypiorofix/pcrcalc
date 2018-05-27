if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('./service-worker.js').then(function(reg) {
        console.log('Service Worker Registered.');
        console.log(reg.pushManager);
        reg.pushManager.getSubscription().then(function(sub) {
            if (sub === null) {
                // Update UI to ask user to register for Push
                console.log('Not subscribed to push service!');
            } else {
                // We have a subscription, update the database
                console.log('Subscription object: ', sub);
            }
        });
    }).catch(function(err) {
        console.error("Service Worker registration failed: "+err);
    });
} else {
    console.warn('Push messaging is not supported');
}

let deferredPrompt;
let btnAdd = document.getElementById("addToHomeScreenButton");

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    console.log('To jest powiadomienie o dodaniu PWA zamiast standardowego z przeglądarki.');
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    console.log(deferredPrompt);
    //btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    // btnAdd.style.display = 'none';
    // Show the prompt
    if (deferredPrompt !== undefined) {
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
          .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
          });
    }
});




// document.getElementById("saveoffline").addEventListener('click', function(event) {
//     event.preventDefault();
//     caches.open('PCR-calc.v-1.00.000').then(function(cache) {
//         fetch('./help.json').then(function(response) {
//             // /get-article-urls returns a JSON-encoded array of
//             // resource URLs that a given article depends on
//             console.log('OK.');
//             //console.log(response);
//             return response.json();
//         }).then(function(urls) {
//             console.log('Zapisywanie na potem...');
//             console.log(urls); // Zwraca treści plików wpisane w 'help.json'
//             cache.addAll(urls['cache']);
//         });
//     });
// });

