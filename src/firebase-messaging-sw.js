const firebase = require('firebase/app');
require('firebase/messaging')

firebase.initializeApp({
    'messagingSenderId': '454554230684'
});

self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://google.com')
    );
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        title: 'nortify!!',
        body: 'Background Message body.',
        icon: '/firebase-logo.png',
    };

    return self.registration.showNotification(notificationTitle,
                                              notificationOptions);
});
