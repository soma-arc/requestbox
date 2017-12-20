<template>
  <div>
    <h2>Request</h2>
    Title <input v-model="title">
    Date<flat-pickr v-model="date"
                    :config="flatPickrConfig"></flat-pickr>
    Deadline<flat-pickr v-model="deadline"
                        :config="flatPickrConfig"></flat-pickr>
    Location<input>
    Rewards<input>
    Abstract<input>
    Details
    <textarea></textarea>
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

<style>
</style>
