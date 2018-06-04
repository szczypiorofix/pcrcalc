if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./worker.js').then(function (registration) {
            console.log('ServiceWorker registration successful.');
        }, function (err) {
            console.error('ServiceWorker registration failed: ', err);
        });
    });
}
else {
    console.warn('Service Worker is not supported on this browser.');
}
let deferredPrompt;
let offlineDiv = document.getElementById('offline-div');
// chrome://apps
document.getElementById('offline-button-no').addEventListener('click', function (e) {
    offlineDiv.style.display = 'none';
});
// TO CO PONIŻEJ ZROBIĆ NA PROMISACH
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('Tutaj powinna pojawiać się informacja o dodaniu do offline.');
    offlineDiv.style.display = 'flex';
});
document.getElementById('offline-button-yes').addEventListener('click', (e) => {
    offlineDiv.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice
        .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('OK. Instalujemy aplikację.');
        }
        else {
            console.log('Nic nie instalujemy.');
        }
        deferredPrompt = null;
    });
});
//# sourceMappingURL=sw.js.map