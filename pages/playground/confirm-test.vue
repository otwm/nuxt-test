<template>
  <section class="container">
    <confirm />
  </section>
</template>

<script>
  import Confirm from '../../components/Confirm'
  export default {
    components: {
      Confirm
    }
  }
</script>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>

