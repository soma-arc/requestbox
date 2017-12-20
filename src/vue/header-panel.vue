<template>
  <header>
    <div id="left-container">
      <a href="/" class="logo">RequestBox</a>
      <v-link  href="/" role="button">Home</v-link>
      <v-link  href="/request" role="button">Request</v-link>
    </div>
    <div id="right-container">
      <p class="header-label" v-show="loggedInUser.authorized">{{ loggedInUser.name }}</p>
      <v-link  href="/register" role="button"
               v-show="loggedInUser.authorized == false">Register</v-link>
      <v-link  href="/sign-in" role="button"
               v-show="loggedInUser.authorized == false">SignIn</v-link>
      <button @click="signOut" role="button"
              v-show="loggedInUser.authorized">SignOut</button>
    </div>
  </header>
</template>

<script>
import VLink from './v-link.vue';

export default {
    props: ['currentRoute', 'loggedInUser'],
    methods: {
        signOut: function() {
            this.loggedInUser.signOut(this.loggedInUser);
        }
    },
    components: {
        VLink
    }
}
</script>

<style>
header {
    display: flex;
    justify-content: space-between;
}

.header-label {
    vertical-align: middle;
    display: inline
}

#right-container #left-container {
    vertical-align: middle;

    flex: 1;
    display: flex;
    align-items: center;
}

</style>
