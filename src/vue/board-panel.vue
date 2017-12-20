<template>
  <div>
    <h2>Request Board</h2>
    <div class="row">
      <request-card v-for="data in requestList" :request="data" key="data.id"/>
    </div>
  </div>
</template>

<script>
import RequestCard from './request-card.vue';

export default {
    props: ['requestList'],
    components: {
        RequestCard
    }
}
</script>

<style>
.row {
    width: 90%;
}
</style>
