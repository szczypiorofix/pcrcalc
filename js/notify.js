function notifyMe() {
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
    } else if (Notification.permission === "granted") {
        showNotification();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
            showMyNotification();
        }
      });
    }
}

function showMyNotification() {
    var img = 'icons/favicon.png';
    var text = 'Hello there! I\'m a notification!';
    var notification = new Notification("Powiadomienie...", { body: text, icon: img });
    setTimeout(notification.close.bind(notification), 2000);
}

