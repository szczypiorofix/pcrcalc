// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./service-worker.js').then(function() {
//         console.log('Service Worker Registered');
//     });
// }
document.getElementById("saveoffline").addEventListener('click', function (event) {
    // event.preventDefault();
    // caches.open('PCR-calc.v-1.00.000').then(function(cache) {
    //     fetch('./help.json').then(function(response) {
    //         // /get-article-urls returns a JSON-encoded array of
    //         // resource URLs that a given article depends on
    //         console.log('OK.');
    //         //console.log(response);
    //         return response.json();
    //     }).then(function(urls) {
    //         console.log('Zapisywanie na potem...');
    //         console.log(urls); // Zwraca to co w 'help.json'
    //         cache.addAll(urls['cache']);
    //     });
    // });
});
//# sourceMappingURL=app.js.map