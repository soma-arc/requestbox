const firebase = require('firebase/app');
require('firebase/messaging')

firebase.initializeApp({
    'messagingSenderId': '454554230684'
});

const messaging = firebase.messaging();

