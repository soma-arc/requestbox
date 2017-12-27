<template>
  <header>
    <div id="left-container">
      <a href="/" class="logo">RequestBox</a>
      <v-link  href="/" role="button">Board</v-link>
      <v-link  href="/request" role="button">Request</v-link>
    </div>
    <div id="right-container">
      <v-link href="/home" role="button"
              v-show="loggedInUser.authorized">{{ loggedInUser.name }}</v-link>
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
            this.loggedInUser.signOut()
                .catch((error) => {
                    console.log(`${error.code} ... ${error.message}`);
                }).then(() => {
                    this.loggedInUser.setData('', '', '', '', false);
                    this.goToBoard();
                });
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
