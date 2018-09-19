'use strict';

const applicationServerPublicKey = 'BBFHZo3DijlEGE0byr14vlAVVL28WUhc0wVdPcL8qiEHAb5Kg37mjMLCqavay73XDUosuZMeaOk1FTrqlIB33SM';
const pushButton = document.querySelector('.js-push-btn');
let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// https://github.com/Minishlink/web-push-php-example/blob/master/src/send_push_notification.php
function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server
    const subscriptionJson = document.querySelector('.js-subscription-json');
    //const subscriptionDetails = document.querySelector('.js-subscription-details');
    if (subscription) {
        subscriptionJson.textContent = JSON.stringify(subscription);
    }
}

const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

function updateBtn() {
    if (isSubscribed) {
        console.log('Update button: Disable Push Messaging');
    }
    else {
        console.log('Update button: Enable Push Messaging');
    }
    //pushButton.disabled = false;
}

function subscribeUser() {
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
        .then(function (subscription) {
        console.log('User is subscribed.');
        updateSubscriptionOnServer(subscription);
        isSubscribed = true;
        updateBtn();
    })
        .catch(function (err) {
        console.log('Failed to subscribe the user: ', err);
        updateBtn();
    });
}

// function displayNotification() {
//     if (Notification.permission == 'granted') {
//         var notificationIcon = 'icons/favicon.png';
//         navigator.serviceWorker.getRegistration().then(function (reg) {
//             var options = {
//                 body: 'Here is a notification body!',
//                 icon: notificationIcon,
//                 vibrate: [100, 50, 100],
//                 data: {
//                     dateOfArrival: Date.now(),
//                     primaryKey: 1
//                 },
//                 actions: [
//                     { action: 'explore', title: 'Explore this new world', icon: notificationIcon },
//                     { action: 'close', title: 'Close notification', icon: notificationIcon },
//                 ]
//             };
//             reg.showNotification('Hello world!', options);
//         });
//     }
//     else {
//         console.warn('Brak uprawnień do wyświetlania powiadomień.');
//     }
// }


// https://developers.google.com/web/fundamentals/codelabs/push-notifications/
function initializeUI() {
    document.getElementById("subscribeuser").addEventListener('click', function (e) {
        //pushButton.disabled = true;
        if (isSubscribed) {
            // TODO: Unsubscribe user
        }
        else {
            subscribeUser();
        }
    });
    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
        isSubscribed = !(subscription === null);
        if (isSubscribed) {
            console.log('User IS subscribed.');
        }
        else {
            console.log('User is NOT subscribed.');
            setTimeout(function(e) {
                let c = confirm("Włączyć automatyczną aktualizację aplikacji?");
                if (c) subscribeUser();
            }, 3000);
        }
        //updateBtn();
    });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('./worker.js').then(function (registration) {
        console.log('Service Worker is registered.');
        swRegistration = registration;
        initializeUI();
    }, function (err) {
        console.error('Service Worker Error: ', err);
    });
}
else {
    console.warn('Push messaging is not supported');
}



let deferredPrompt;
let offlineDiv = document.getElementById('offline-div');

// chrome://apps

document.getElementById('offline-button-no').addEventListener('click', function (e) {
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
        }
        else {
            console.log('Nic nie instalujemy.');
        }
        deferredPrompt = null;
    });
});

