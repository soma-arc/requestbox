<template>
  <div>
    Title<input v-model="title"><br>
    Date<flat-pickr v-model="date"
                    :config="flatPickrConfig"></flat-pickr><br>
    Deadline<flat-pickr v-model="deadline"
                        :config="flatPickrConfig"></flat-pickr><br>
    Location<input><br>
    Rewards<input><br>
    Abstract<input><br>
    Details<br>
    <textarea></textarea>
    <br>
    <button @click="postRequest">Send</button>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
const firebase = require('firebase/app');

export default {
    data: function() {
        return {
            title: '',
            date: new Date(),
            deadline: new Date(),
            flatPickrConfig: {
                enableTime: true,
                time_24hr: true
            },
        }
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
    },
    components: {
        FlatPickr
    }
}
</script>
