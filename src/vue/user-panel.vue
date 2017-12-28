<template>
<div id="user-panel">
  <h2>User Information</h2>
  <div class="request-content">
    <div class="input-group fluid">
      <div class="col-sm-5 col-md-5" style="text-align:right;">名前: </div>
      <div class="col-sm col-md">{{ this.loggedInUser.name }}</div>
    </div>
    <span class="input-group fluid">
      <div class="col-sm-5 col-md-5" style="text-align:right; vertical-align:middle;">所属研究室: </div>
      <div class="col-sm col-md"><input v-model="loggedInUser.lab">研究室</div>
    </span>
  </div>
  <button @click="saveChange">変更を保存</button>
  <h2>投稿履歴</h2>
</div>
</template>

<script>
const firebase = require('firebase/app');
export default {
    props: ['currentRoute', 'requestList', 'loggedInUser'],
    methods: {
        saveChange: function() {
            firebase.database().ref(`users/${this.loggedInUser.id}/lab`).set(
                this.loggedInUser.lab
            );
        }
    }
}
</script>

<style>
#user-panel {
    width: 80%;
}

.request-content {
    flex: 1;
    padding: 10px;
    content-align:center;
    width: 80%;
}
</style>
