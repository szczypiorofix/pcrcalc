if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful.');
      }, function(err) {
        console.error('ServiceWorker registration failed: ', err);
      });
    });
} else {
  console.warn('Service Worker is not supported on this browser.')
}

let deferredPrompt;
let offlineDiv = document.getElementById('offline-div');

// chrome://apps

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  console.log('Tutaj powinna pojawiać się informacja o dodaniu do offline.');
  offlineDiv.style.display = 'flex';
});

document.getElementById('offline-button-no').addEventListener('click', function(e) {
  offlineDiv.style.display = 'none';
})