<template>
  <div :class="open? 'confirm show' : 'confirm'">
    <slot>
      test<br/>
    </slot>
    <button @click="yes">Yes</button>
    <button @click="no">No</button>
  </div>
</template>

<script>
  export default {
    props: {
      open: Boolean,
    },
    methods: {
      yes() {
        this.$emit('confirm')
      },
      no() {
        this.$emit('dismiss')
      },
    }
  }
</script>

<style>
  .confirm {
    display: none;
  }
  .confirm.show {
    display: block;
  }
</style>
