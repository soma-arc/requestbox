import Vue from 'vue';
import Root from './vue/root.vue';
import User from './user.js';
const firebase = require('firebase/app');
const FIREBASE_CONFIG = require('./config.json');
require('firebase/database');
require('firebase/auth');

window.addEventListener('load', function() {
    firebase.initializeApp(FIREBASE_CONFIG);

    const requestList = [];
    const loggedInUser = User.EMPTY_USER;
    const d = {
        requestList: requestList,
        loggedInUser: loggedInUser
    };
    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        data: d,
        render: (h) => {
            return h('root', { 'props': d })
        },
        components: { 'root': Root }
    });

    const db = firebase.database();
    const posts = db.ref('/posts');
    posts.on('child_added', function(data) {
        console.log('push');
        console.log(data.val());
        requestList.push(data.val());
    });
    posts.on('child_changed', function(data) {
        console.log('updated');
        console.log(data.val());
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('authorized')
        } else {
            console.log('sign out')
        }
    });
});
