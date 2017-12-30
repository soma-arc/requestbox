<template>
  <div class="card medium" v-bind:class="{ deadlineWarning: closedToDeadline }">
      <h3 class="section">{{ request.title }}</h3>
      <div class="request-content">
          依頼者: {{ request.authorName }} {{ request.authorLab | requestLabFormat }}<br>
          <span>場所: {{ request.location }}</span><br>
          <div v-for="(date, index) in request.dateOfExperiment">
              <span>日時: {{ date }}</span><br>
          </div>
          <span>時間: {{ request.time }}</span><br>
          <span>形式: {{ request.format }}</span><br>
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
                  <span>
                      <b>依頼者:</b> {{ request.authorName }}
                      {{ request.authorLab | requestLabFormat }}
                  </span><br>
                  <span>
                      <b>場所: </b>
                      {{ request.location }}<br>
                  </span>
                  <div v-for="(date, index) in dateOfExperiment">
                      <span>日時 {{ index }}: {{ date }}</span><br>
                  </div>
                  <span>
                      <b>所要時間: </b>
                      {{ request.time }}
                      <br>
                  </span>
                  <span><b>実験形式:</b> {{ request.format }}</span><br>
                  <span><b>募集人数:</b> {{ request.num }}人</span><br>
                  <span><b>条件:</b> {{ request.requirements }}</span><br>
                  <span><b>報酬:</b> {{ request.rewards }}</span><br>
                  <span><b>連絡先:</b> {{ request.rewards }}</span><br>
                  <b>詳細</b>
                  <p class="section" style="white-space: pre;">{{ request.details }}</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
     props: ['request'],
     filters: {
         requestLabFormat: function (value) {
             if (value === '') return '';
             return `(${value}研)`;
         }
     },
    computed: {
        closedToDeadline: function() {
            const deadline = new Date(this.request.dateOfDeadline);
            // three days
            return (deadline.getTime() - new Date().getTime()) < 259200000;
        }
    }
}
</script>

<style>
.card {
    height: 300px;
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

.deadlineWarning {
    background-color: LemonChiffon;
}
</style>
