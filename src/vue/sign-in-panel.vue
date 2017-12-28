<template>
  <div>
    <h2>Sign In</h2>
    Email<input v-model="email">
    Password<input v-model="password" type="password">
     <div>
        <button @click="signInWithEmailAndPassword">Sign In</button> or
        <button @click="signInGoogle">Sign in with Google account</button>
     </div>
     <transition name="component-fade" mode="out-in">
       <error-card :error="errorObj" v-show="errorObj.code"/>
     </transition>
  </div>
</template>

<script>
import User from '../user.js';
import ErrorCard from './error-card.vue';
const firebase = require('firebase/app');

export default {
    props: ['currentRoute', 'loggedInUser'],
    data: function() {
        return {
            email: '',
            password: '',
            errorObj: {}
        }
    },
    methods: {
        signInWithEmailAndPassword: function() {
            if (this.checkInputs() === false) return;

            User.SignInWithEmailAndPassword(this.email, this.password)
                .catch((error) => {
                    console.log(`${error.code} ... ${error.message}`);
                    this.errorObj = error;
                }).then(() => {
                    const user = firebase.auth().currentUser;
                    if (!user) return;
                    firebase.database().ref(`/users/${user.uid}`).once('value')
                        .then(function(data) {
                            const d = data.val();
                            this.loggedInUser.setData(user.uid, this.email, d.name, d.lab, true);
                        });
                    this.initFields();
                    this.goToBoard();
                });
        },
        signInGoogle: function() {
            User.SignInWithGoogle()
                .catch((error) => {
                    console.log(`${error.code} ... ${error.message}`);
                }).then((result) => {
                    const user = result.user;
                    firebase.database().ref(`/users/${user.uid}`).once('value')
                        .then((result) => {
                            if(result.val() === null) {
                                firebase.database().ref(`users/${user.uid}`).set({
                                    id: user.uid,
                                    name: user.displayName,
                                    lab: ''
                                });
                            }
                            this.loggedInUser.setData(user.uid, user.email,
                                                      user.displayName, '', true);
                        });
                    this.initFields();
                    this.goToBoard();
                });
        },
        checkInputs: function() {
            // TODO: check inputs
            return true;
        },
        initFields: function() {
            this.email = '';
            this.password = '';
            this.errorObj = {};
        },
        goToBoard: function() {
            this.$root.currentRoute = '/';
            window.history.pushState(
                null,
                'board-panel',
                '/'
            );
        }
    },
    components: {
        ErrorCard
    }
}
</script>
