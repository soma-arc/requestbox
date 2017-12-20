<template>
  <div>
    Name<input v-model="name"><br>
    Lab<input v-model="lab"><br>
    email<input v-model="email"><br>
    password<input v-model="password"><br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import User from '../user.js';
export default {
    data: function() {
        return {
            name: '',
            lab: '',
            email: '',
            password: '',
        }
    },
    methods: {
        register: function() {
            User.RegisterWithEmailAndPassword(this.name, this.email,
                                              this.lab, this.password, this.loggedInUser);
        }
    }
}
</script>
