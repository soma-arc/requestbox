<template>
  <div class="card small">
    <h3 class="section">{{ request.title }}</h3>
    <div class="request-content">
      <span class="section">{{ request.abstract }}</span><br>
      <span>場所: {{ request.location }}</span><br>
      <span>日時: {{ request.dateOfExperiment }}</span><br>
      <span>条件: {{ request.requirements }}</span><br>
      <span>報酬: {{ request.rewards }}</span><br>
    </div>
    <label class="button" for="modal-toggle">Show details</label>
    <input id="modal-toggle" type="checkbox"/>
    <div class="modal">
      <div class="card">
        <label for="modal-toggle" class="close"></label>
        <h3 class="section">{{ request.title }}</h3>
        <div class="request-content">
          <p class="section">{{ request.details }}</p>
          <span>場所: {{ request.location }}</span><br>
          <span>日時: {{ request.dateOfExperiment }}</span><br>
          <span>条件: {{ request.requirements }}</span><br>
          <span>報酬: {{ request.rewards }}</span><br>
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
    height: 250px;
    display: flex;
}

.request-content {
    flex: 1;
    vertical-align: top;
    padding: 5px;
}

.button {
    text-align: center;
}
</style>
