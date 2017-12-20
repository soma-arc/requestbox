<template>
  <div class="container">
    <div class="row">
      <div v-for="data in requestList" class="card small">
        <div class="section">
          <h3>{{ data.title }}</h3>
          <p>Card content...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['requestList']
}
</script>

