<template>
  <div>
    <h3 v-if="loggedInUser.authorized">loggedIn {{ loggedInUser.name }}</h3>
    <h3 v-else>Not LoggedIn</h3>
    Name<input v-model="name"><br>
    Lab<input v-model="lab"><br>
    email<input v-model="email"><br>
    password<input v-model="password"><br>
    <button @click="register">Register</button>
    <button @click="signInGoogle">Sign in with Google</button>
    <button @click="signOut">Sign out</button><br>
    Title<input v-model="title"><br>
    Date<flat-pickr v-model="date"
                    :config="config"></flat-pickr>
    <button @click="postRequest">Send</button>
    <div class="container">
      <div class="row">
        <div v-for="data in requestList" class="card small">
          <div class="section">
            <h3>{{ data.title }}</h3>
            <p>Card content...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import User from '../user.js';
const firebase = require('firebase/app');

export default {
    props: ['requestList', 'loggedInUser'],
    data: function() {
        return {
            title: '',
            name: '',
            lab: '',
            email: '',
            password: '',
            date: new Date(),
        };
    },
    methods: {
        postRequest: function() {
            const newPostKey = firebase.database().ref().child('posts').push().key;
            const postData = {
                id: newPostKey,
                title: this.title,
                name: this.name
            }
            firebase.database().ref(`/posts/${newPostKey}`).update(postData);
        },
        register: function() {
            console.log('register');
            User.RegisterWithEmailAndPassword(this.name, this.email,
                                              this.lab, this.password, this.loggedInUser);
        },
        signInGoogle: function() {
            User.SignInWithGoogle(this.loggedInUser);
        },
        signOut: function() {
            this.loggedInUser.signOut(this.loggedInUser);
        }
    },
    components: {
        FlatPickr
    }
}
</script>
