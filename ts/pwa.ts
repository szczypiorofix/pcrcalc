if ('serviceWorker' in navigator) {
    window.addEventListener('DOMContentLoaded', function(e) {
        navigator.serviceWorker.register('./service-worker.js').then(function(reg) {
            console.log('Service Worker Registered.');
        }).catch(function(err) {
            console.error("Service Worker registration failed: "+err);
        });
    });
} else {
    console.warn('Service Worker is not supported');
}

