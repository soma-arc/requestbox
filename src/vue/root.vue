<template>
  <div>
    Name<input v-model="name"><br>
    Lab<input v-model="lab"><br>
    email<input v-model="email"><br>
    password<input v-model="password"><br>
    <button @click="register">Register</button><button @click="signInGoogle">Sign in with Google</button><br>
    Title<input v-model="title"><br>
    Date<flat-pickr v-model="date"
                    :config="config"></flat-pickr>
    <button @click="postRequest">Send</button>
    <div class="container">
      <div class="row">
        <div v-for="data in dataList" class="card small">
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
const firebase = require('firebase/app');

export default {
    props: ['dataList'],
    data: function() {
        return {
            title: '',
            name: '',
            lab: '',
            email: '',
            password: '',
            date: null
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
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .catch(function(error) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                }).then(() => {
                    const user = firebase.auth().currentUser;
                    if (user) {
                        firebase.database().ref(`users/${user.uid}`).set({
                            id: user.uid,
                            name: this.name,
                            lab: this.lab
                        });
                        console.log('add data');
                    }
                });
        },
        signInGoogle: function() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;
                // The signed-in user info.
                const user = result.user;
            }).catch(function(error) {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
            });
        }
    },
    components: {
        FlatPickr
    }
}
</script>
