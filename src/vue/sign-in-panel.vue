<template>
  <div>
    <button @click="signInGoogle">Sign in with Google</button>
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
