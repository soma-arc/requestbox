<template>
  <div class="card medium">
    <h3 class="section">{{ request.title }}</h3>
    <div class="request-content">
      <span>場所: {{ request.location }}</span><br>
      <div v-for="(date, index) in request.dateOfExperiment">
          <span>日時: {{ date }}</span><br>
      </div>
      <span>時間: {{ request.time }}</span><br>
      <span>形式: {{ request.form }}</span><br>
      <span>条件: {{ request.requirements }}</span><br>
      <span>報酬: {{ request.rewards }}</span><br>
    </div>
    <label class="button" v-bind:for="request.id">Show details</label>
    <input v-bind:id="request.id" type="checkbox"/>
    <div class="modal">
      <div class="card large modal-card">
        <label v-bind:for="request.id" class="close"></label>
          <div class="section">
              <span><h3>{{ request.title }}</h3>
                  応募期限 {{ request.dateOfDeadline }}</span>
          </div>
        <div class="request-content">
          <span>場所: {{ request.location }}</span><br>
          <div v-for="(date, index) in dateOfExperiment">
              <span>日時: {{ date }}</span><br>
          </div>
          <span>所要時間: {{ request.time }}</span><br>
          <span>実験形式: {{ request.format }}</span><br>
          <span>募集人数: {{ request.num }}人</span><br>
          <span>条件: {{ request.requirements }}</span><br>
          <span>報酬: {{ request.rewards }}</span><br>
          <span>連絡先: {{ request.rewards }}</span><br>
          詳細
          <p class="section">{{ request.details }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['request'],
}
</script>

<style>
.card {
    height: 280px;
    display: flex;
}

.request-content {
    flex: 1;
    vertical-align: top;
    padding: 10px;
}

.button {
    text-align: center;
}

.modal-card {
    height: 500px;
    padding: 5px;
}
</style>
