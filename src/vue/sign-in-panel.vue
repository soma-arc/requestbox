<template>
  <div>
    <h2>Sign In</h2>
    Email<input>
    Password<input type="password">
     <div>
        <button>Sign In</button> or
        <button @click="signInGoogle">Sign in with Google account</button>
    </div>
  </div>
</template>

<script>
import User from '../user.js';

export default {
    props: ['currentRoute', 'loggedInUser'],
    methods: {
        signInGoogle: function() {
            User.SignInWithGoogle(this.loggedInUser);
        },
    }
}
</script>
