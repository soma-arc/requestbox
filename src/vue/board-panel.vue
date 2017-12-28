<template>
<div>
  <h2>Request Board</h2>
  <div class="row">
      <request-card v-for="data in requestList" :request="data" key="data.id"/>
    </div>
  </div>
</template>

<script>
import RequestCard from './request-card.vue';
const firebase = require('firebase/app');

export default {
    props: ['requestList'],
    data: function() {
        return {
            notificationToken: undefined,
        }
    },
    components: {
        RequestCard
    },
    methods: {
        enableNotification: function() {
            const messaging = firebase.messaging();
            navigator.serviceWorker.register('firebaseMessagingSw.js')
                .then((registration) => {
                    messaging.useServiceWorker(registration);
                    messaging.requestPermission()
                        .then(() => {
                            console.log('Notification permission granted.');
                            messaging.getToken()
                                .then((currentToken) => {
                                    if (currentToken) {
                                        firebase.database().ref(`/tokens/${currentToken}`).set(true);
                                        this.notificationToken = currentToken;
                                        this.notificationEnabled;
                                    } else {
                                        console.log('No Instance ID token available. Request permission to generate one.');
                                    }
                                })
                                .catch((err) => {
                                    console.log('An error occurred while retrieving token. ', err);
                                });
                        })
                        .catch(function(err) {
                            console.log('Unable to get permission to notify.', err);
                        });
                });
        }
    }
}
</script>

<style>
.row {
    width: 90%;
}
</style>
