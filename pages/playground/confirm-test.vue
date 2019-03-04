<template>
  <section class="container">
    <confirm-dialog
      ref="cf"
      :open="confirm"
      @dismiss="No(closeConfirm)"
      @confirm="Yes(closeConfirm)"
    >
      <confirm-text :text="text" v-if="type === 'text'"/>
      <component v-bind:is="confirmView" v-if="type === 'component'"></component>
    </confirm-dialog>
    <button @click="confTest">ok</button>
  </section>
</template>

<script>
  import ConfirmDialog from '../../components/ConfirmDialog'
  import Mytest from '../../components/Mytest'
  import ConfirmText from '../../components/ConfirmText'

  let confirmResolve;
  const Confirm = ({ open, message, component, internalComp, setText, setComponent }) => new Promise((resolve) => {
    if (message) {
      setText(message)
    }
    if (component) {
      setComponent(component)
    }
    open()
    confirmResolve = resolve
  })

  const Yes = (close) => {
    close()
    if ( confirmResolve ) confirmResolve(true)
  }
  const No = (close) => {
    close()
    if ( confirmResolve ) confirmResolve(false)
  }

  export default {
    components: {
      ConfirmDialog,
      ConfirmText,
    },
    data() {
      return {
        confirm: false,
        confirmView: Mytest,
        text: null,
        type: 'component',
      };
    },
    methods: {
      async confTest () {
        // case1: text type
        if (!await Confirm({
          message: 'ok?',
          open: this.openConfirm,
          setText: this.setText,
        })) {
          console.log('not ok');
          return;
        }

        console.log('ok');

        // case2: external component
        if (!await Confirm({
          component: Mytest,
          open: this.openConfirm,
          setComponent: this.setComponent,
        })) {
          console.log('not ok');
          return;
        }

        console.log('ok');

        // case3: internal component
        if (!await Confirm({
          internalComp: 'my-internal',
          open: this.openConfirm,
        })) {
          console.log('not ok');
          return;
        }

        console.log('ok');

        // case4: object override
        if (!await Confirm({
          internalComp: {

          },
          open: this.openConfirm,
        })) {
          console.log('not ok');
          return;
        }

        console.log('ok');
      },
      openConfirm () {
        this.confirm = true
      },
      closeConfirm () {
        this.confirm = false
      },
      setText(text) {
        this.type = 'text'
        this.text = text
      },
      setComponent (comp) {
        this.type = 'component'
        this.confirmView = comp
      },
      Yes, No,
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

