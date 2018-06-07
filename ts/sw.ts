
// https://developers.google.com/web/fundamentals/codelabs/push-notifications/


if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('./worker.js').then(function(registration) {
            console.log('Service Worker is registered.');
        }, function(err) {
            console.error('Service Worker Error: ', err);
        });
} else {
    console.warn('Push messaging is not supported');
}


let deferredPrompt;
let offlineDiv = document.getElementById('offline-div');


// chrome://apps

document.getElementById('offline-button-no').addEventListener('click', function(e) {
    offlineDiv.style.display = 'none';
});


window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('Tutaj powinna pojawiać się informacja o dodaniu do offline.');
    offlineDiv.style.display = 'flex';
});

document.getElementById('offline-button-yes').addEventListener('click', (e) => {
    offlineDiv.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('OK. Instalujemy aplikację.');
        } else {
            console.log('Nic nie instalujemy.');
        }
        deferredPrompt = null;
    });
});
