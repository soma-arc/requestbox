<template>
  <header>
    <div id="left-container">
      <a href="/" class="logo">RequestBox</a>
      <v-link href="/" role="button">Board</v-link>
      <v-link href="/request" role="button"
              v-show="loggedInUser.authorized">Request</v-link>
      <button @click="enableNotification" role="button"
              v-show="notificationToken === undefined">EnableNotification</button>
    </div>
    <div id="right-container">
      <v-link href="/user" role="button"
              v-show="loggedInUser.authorized">{{ loggedInUser.name }}</v-link>
      <v-link href="/register" role="button"
              v-show="loggedInUser.authorized == false">Register</v-link>
      <v-link href="/sign-in" role="button"
              v-show="loggedInUser.authorized == false">SignIn</v-link>
      <button @click="signOut" role="button"
              v-show="loggedInUser.authorized">SignOut</button>
    </div>
  </header>
</template>

<script>
import VLink from './v-link.vue';
 const firebase = require('firebase/app');
 
export default {
     props: ['currentRoute', 'loggedInUser'],
     data: function() {
         return {
             notificationToken: undefined
         }
     },
     methods: {
         signOut: function() {
             this.loggedInUser.signOut()
                 .catch((error) => {
                     console.log(`${error.code} ... ${error.message}`);
                 }).then(() => {
                     this.loggedInUser.setData('', '', '', '', false);
                     this.goToBoard();
                 });
         },
         goToBoard: function() {
             this.$root.currentRoute = '/';
             window.history.pushState(
                 null,
                 'board-panel',
                 '/'
             );
         },
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
     },
     components: {
         VLink
     }
 }
</script>

<style>
header {
    display: flex;
    justify-content: space-between;
}

.header-label {
    vertical-align: middle;
    display: inline
}

#right-container #left-container {
    vertical-align: middle;

    flex: 1;
    display: flex;
    align-items: center;
}

</style>
