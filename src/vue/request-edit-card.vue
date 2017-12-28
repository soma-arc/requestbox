<template>
<div class="card medium" v-bind:class="{ deadlineWarning: closedToDeadline }">
  <div class="section">
    <span><h3>{{ request.title }}</h3>
      応募期限 {{ request.dateOfDeadline }}</span>
  </div>
  <div class="request-content">
    <!-- <button>編集</button><button>削除</button><br> -->
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
    height: 480px;
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
    height: 700px;
    padding: 5px;
}

.deadlineWarning {
    background-color: LemonChiffon;
}
</style>
