<template>
  <div>
    <h2>Registration</h2>
    Name<input v-model="name">
    Lab<input v-model="lab">
    email<input v-model="email">
    password<input type="password" v-model="password">
    <div>
      <button @click="register">Register</button> or <button @click="signInGoogle">Sign in with Google account</button>
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
    data: function() {
        return {
            name: '',
            lab: '',
            email: '',
            password: '',
            errorObj: {}
        }
    },
    methods: {
        register: function() {
            if (this.checkInputs === false) return;

            User.RegisterWithEmailAndPassword(this.email, this.password)
                .catch((error) => {
                    console.log(`${error.code} ... ${error.message}`);
                    this.errorObj = error;
                    console.log(this.errorObj);
                }).then(() => {
                    const user = firebase.auth().currentUser;
                    if (!user) return;
                    firebase.database().ref(`users/${user.uid}`).set({
                        id: user.uid,
                        name: this.name,
                        lab: this.lab
                    });
                    this.loggedInUser.setData(user.uid, this.email,
                                              this.name, this.lab, true);
                    this.initFields();
                    this.goToBoard();
                });
        },
        checkInputs: function() {
            // TODO: check inputs
            return true;
        },
        signInGoogle: function() {
            User.SignInWithGoogle()
                .catch((error) => {
                    console.log(`${error.code} ... ${error.message}`);
                    this.errorObj = error;
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
        goToBoard: function() {
            this.$root.currentRoute = '/';
            window.history.pushState(
                null,
                'board-panel',
                '/'
            );
        },
        initFields: function() {
            this.name = '';
            this.lab = '';
            this.email = '';
            this.password = '';
            this.errorObj = {};
        }
    },
    components: {
        ErrorCard
    }
}
</script>
