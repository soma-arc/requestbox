<template>
  <div class="card small">
    <h3 class="section">{{ request.title }}</h3>
    <div >
      <p class="section">{{ request.location }}</p>
      <p class="section">{{ request.abstract }}</p>
    </div>
    <label class="button" for="modal-toggle">Show details</label>
    <input id="modal-toggle" type="checkbox"/>
    <div class="modal">
      <div class="card">
        <label for="modal-toggle" class="close"></label>
        <h3 class="section">{{ request.title }}</h3>
        <div class="section">
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
    height: 200px;
}
</style>
