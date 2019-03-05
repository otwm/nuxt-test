<template>
  <div :class="open? 'confirm show center' : 'confirm center'">
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
      updatedHook: {
        type: Function,
      }
    },
    updated () {
      if (this.updatedHook) this.updatedHook()
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

  .center {
    background: black;
    color: white;
    width: 200px;
    height: 100px;
    margin: -70px 0 0 -120px;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 20px;
  }
</style>
