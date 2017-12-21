<template>
  <div class="card warning">
    <h3 class="section">Error - {{ error.code }}</h3>
    <div class="section">{{ error.message }}</div>
  </div>
</template>

<script>
export default {
    props: ['error'],
}
</script>
