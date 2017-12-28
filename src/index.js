import Vue from 'vue';
import Root from './vue/root.vue';
import User from './user.js';
import Request from './request.js';
const firebase = require('firebase/app');
const FIREBASE_CONFIG = require('./config.json');
require('firebase/database');
require('firebase/auth');
require('firebase/messaging')

window.addEventListener('load', function() {
    firebase.initializeApp(FIREBASE_CONFIG);

    const requestList = [];
    const loggedInUser = User.EMPTY_USER;
    const d = {
        requestList: requestList,
        loggedInUser: loggedInUser,
        currentRoute: window.location.pathname
    };
    /* eslint-disable no-new */
    const app = new Vue({
        el: '#app',
        data: d,
        render: (h) => {
            return h('root', { 'props': d })
        },
        components: { 'root': Root }
    });

    const db = firebase.database();
    const posts = db.ref('/posts');
    posts.on('child_added', (data) => {
        // console.log(data.val());
        requestList.push(Request.CreateFromDBData(data.val()));
    });
    posts.on('child_changed', (data) => {
        // console.log('updated');
        console.log(data.val());
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            if (d.loggedInUser.authorized === false) {
                db.ref(`/users/${user.uid}`).once('value')
                    .then((result) => {
                        d.loggedInUser.setData(user.uid, user.email, result.val().name,
                                               result.val().lab, true);
                    });
            }
            console.log('authorized')
        } else {
            console.log('sign out')
        }
    });

    window.addEventListener('popstate', () => {
        app.currentRoute = window.location.pathname;
    });

    const messaging = firebase.messaging();
    messaging.onTokenRefresh(() => {
        messaging.getToken()
            .then((refreshedToken) => {
                console.log('Token refreshed.');
                firebase.database().ref(`/tokns/${refreshedToken}`).set(true);
            })
            .catch((err) => {
                console.log('Unable to retrieve refreshed token ', err);
            });
    });

    messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
    });
});
