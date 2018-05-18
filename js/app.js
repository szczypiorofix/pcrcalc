if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () {
        console.log('Service Worker Registered');
    });
}
document.getElementById("saveoffline").addEventListener('click', function (event) {
    event.preventDefault();
    caches.open('PCR-calc.v-1.00.000').then(function (cache) {
        fetch('help.html').then(function (response) {
            // /get-article-urls returns a JSON-encoded array of
            // resource URLs that a given article depends on
            console.log('OK.');
            return response.json();
        }).then(function (urls) {
            cache.addAll(urls);
        });
    });
});
//# sourceMappingURL=app.js.map