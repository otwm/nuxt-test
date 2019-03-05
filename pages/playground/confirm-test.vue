<template>
  <section class="container">
    <button @click="startConfirm">start confirm</button>
  </section>
</template>

<script>
  import confirmBinder from '../../lib/confirmBinder'
  import Mytest from '../../components/Mytest'

  export default {
    methods: {
      async startConfirm () {
        const { Confirm } = confirmBinder
        // case1: text type
        if (!await Confirm({
          message: 'ok?',
        })) {
          console.log('not ok1');
          return;
        }

        console.log('ok1');

        if (!await Confirm({
          message: 'ok2?',
        })) {
          console.log('not ok2');
          return;
        }

        console.log('ok2');

        if (!await Confirm({
          component: Mytest,
        })) {
          console.log('not ok3');
          return;
        }

        console.log('ok3');
      },
    },
  }
</script>
