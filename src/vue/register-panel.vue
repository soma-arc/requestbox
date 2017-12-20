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
  </div>
</template>

<script>
import User from '../user.js';
export default {
    data: function() {
        return {
            name: '',
            lab: '',
            email: '',
            password: '',
        }
    },
    methods: {
        register: function() {
            User.RegisterWithEmailAndPassword(this.name, this.email,
                                              this.lab, this.password, this.loggedInUser);
        },
        signInGoogle: function() {
            User.SignInWithGoogle(this.loggedInUser);
        }
    }
}
</script>
