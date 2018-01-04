<template>
<div>
  <h2>Request Board</h2>
  <span>Filter <input v-model="filterStr" @input="inputListener"></span>
  <div class="row">
    <request-card v-for="data in filteredList" :request="data" key="data.id"/>
  </div>
</div>
</template>

<script>
import RequestCard from './request-card.vue';
const firebase = require('firebase/app');

function filterByStr(element, index, array) {
    this.filterStr = this.filterStr.toLowerCase();
    return element.authorLab.toLowerCase().includes(this.filterStr) ||
        element.authorName.toLowerCase().includes(this.filterStr) ||
        element.details.toLowerCase().includes(this.filterStr) ||
        element.title.toLowerCase().includes(this.filterStr) ||
        element.dateOfDeadline.toLowerCase().includes(this.filterStr) ||
        element.time.toLowerCase().includes(this.filterStr) ||
        element.location.toLowerCase().includes(this.filterStr) ||
        element.format.toLowerCase().includes(this.filterStr) ||
        element.requirements.toLowerCase().includes(this.filterStr);
}

export default {
    props: ['requestList'],
    data: function() {
        return {
            notificationToken: undefined,
            filterStr: '',
            filteredList: this.requestList
        }
    },
    components: {
        RequestCard
    },
    methods: {
        inputListener: function() {
            console.log('input')
            if(this.filterStr === '') {
                this.filteredList = this.requestList;
            } else {
                this.filteredList = this.requestList.filter(filterByStr,
                                                            {filterStr: this.filterStr});
            }
        },
        enableNotification: function() {
            const messaging = firebase.messaging();
            navigator.serviceWorker.register('firebaseMessagingSw.js')
                .then((registration) => {
                    messaging.useServiceWorker(registration);
                    messaging.requestPermission()
                        .then(() => {
                            console.log('Notification permission granted.');
                            messaging.getToken()
                                .then((currentToken) => {
                                    if (currentToken) {
                                        firebase.database().ref(`/tokens/${currentToken}`).set(true);
                                        this.notificationToken = currentToken;
                                        this.notificationEnabled;
                                    } else {
                                        console.log('No Instance ID token available. Request permission to generate one.');
                                    }
                                })
                                .catch((err) => {
                                    console.log('An error occurred while retrieving token. ', err);
                                });
                        })
                        .catch(function(err) {
                            console.log('Unable to get permission to notify.', err);
                        });
                });
        }
    }
}
</script>

<style>
.row {
    width: 90%;
}
</style>

