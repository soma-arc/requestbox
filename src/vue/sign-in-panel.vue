<template>
  <div>
    <h2>Sign In</h2>
    Email<input v-model="email">
    Password<input v-model="password" type="password">
     <div>
        <button @click="signInWithEmailAndPassword">Sign In</button> or
        <button @click="signInGoogle">Sign in with Google account</button>
    </div>
  </div>
</template>

<script>
import User from '../user.js';

export default {
    props: ['currentRoute', 'loggedInUser'],
    data: function() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signInWithEmailAndPassword: function() {
            User.SignInWithEmailAndPassword(this.email, this.password, this.loggedInUser);
        },
        signInGoogle: function() {
            User.SignInWithGoogle(this.loggedInUser);
        },
    }
}
</script>
