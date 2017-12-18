<template>
  <div>
    Title<input v-model="title"><br>
    Name<input v-model="name"><br>
    Date<flat-pickr v-model="date"
                    :config="config"></flat-pickr>
    <button @click="click">Send</button>
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
            date: null
        };
    },
    methods: {
        click: function() {
            const newPostKey = firebase.database().ref().child('posts').push().key;
            const postData = {
                id: newPostKey,
                title: this.title,
                name: this.name
            }
            firebase.database().ref('/posts/' + newPostKey).update(postData);
        }
    },
    components: {
        FlatPickr
    }
}
</script>
