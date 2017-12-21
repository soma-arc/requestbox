<template>
  <div>
    <h2>Request</h2>
    Title <input v-model="title">
    Location<input v-model="location">
    Date<flat-pickr v-model="date"
                    :config="flatPickrConfig"></flat-pickr>
    Deadline<flat-pickr v-model="deadline"
                        :config="flatPickrConfig"></flat-pickr>
    Rewards<input v-model="rewards">
    Requirements<input v-model="requirements">
    Abstract<input v-model="abstract">
    Details
    <textarea v-model="details"></textarea>
    <button @click="postRequest">Send</button>
    <transition name="component-fade" mode="out-in">
      <error-card :error="errorObj" v-show="errorObj.code"/>
    </transition>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import ErrorCard from './error-card.vue';
import Request from '../request.js';

export default {
    props: ['currentRoute', 'requestList', 'loggedInUser'],
    data: function() {
        return {
            title: '',
            location: '',
            date: new Date(),
            deadline: new Date(),
            requirements: '',
            rewards: '',
            abstract: '',
            details: '',
            flatPickrConfig: {
                enableTime: true,
                time_24hr: true
            },
            errorObj: {}
        }
    },
    methods: {
        postRequest: function() {
            if (this.checkInputs() === false) return;
            Request.AddToDatabase(this.loggedInUser.id, this.title, this.location, this.date,
                                  this.deadline, '', this.requirements,
                                  this.rewards, this.abstract, this.details);
            this.initFields();
            this.goToBoard();
        },
        initFields: function() {
            this.title = '';
            this.location = '';
            this.requirements = '';
            this.rewards = '';
            this.abstract = '';
            this.details = '';
            this.errorObj = {};
        },
        checkInputs: function() {
            // TODO: check inputs
            return true;
        },
        goToBoard: function() {
            this.$root.currentRoute = '/';
            window.history.pushState(
                null,
                'board-panel',
                '/'
            );
        }
    },
    components: {
        FlatPickr,
        ErrorCard
    }
}
</script>

<style>
</style>
