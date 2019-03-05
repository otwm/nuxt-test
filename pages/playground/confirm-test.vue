<template>
  <section class="container">
    <button @click="startConfirm">start confirm</button>
  </section>
</template>

<script>
  import confirmFactory from '../../lib/confirmFactory'

  export default {
    methods: {
      async startConfirm () {
        const Confirm = confirmFactory.Confirm
        // case1: text type
        if (!await Confirm({
          message: 'ok?',
        })) {
          console.log('not ok');
          return;
        }
      },
    },
  }
</script>
