<template>
  <div>
    <header-panel :currentRoute="currentRoute"
                  :loggedInUser="loggedInUser"></header-panel>
    <keep-alive>
      <transition name="component-fade" mode="out-in">
        <component v-bind:is="viewComponent"
                   :currentRoute="currentRoute"
                   :requestList="requestList"
                   :loggedInUser="loggedInUser"></component>
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import ROUTES from '../routes.json';
import RegisterPanel from './register-panel.vue';
import HomePanel from './home-panel.vue';
import RequestPanel from './request-panel.vue';
import SignInPanel from './sign-in-panel.vue';
import HeaderPanel from './header-panel.vue';

export default {
    props: ['currentRoute', 'requestList', 'loggedInUser'],
    data: function() {
        return {
        };
    },
    computed: {
        viewComponent: function() {
            return ROUTES[this.currentRoute];
        }
    },
    components: {
        HomePanel,
        RegisterPanel,
        RequestPanel,
        SignInPanel,
        HeaderPanel,
    }
}
</script>

<style>
input:focus {
  background-color: none;
  outline: none;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}

.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
