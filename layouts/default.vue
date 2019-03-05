<template>
  <div>
    <nuxt/>
    <confirm-dialog
      ref="cf"
      :open="confirm"
      @dismiss="No(closeConfirm)"
      @confirm="Yes(closeConfirm)"
    >
      <confirm-text :text="text" v-if="type === 'text'"/>
      <component v-bind:is="confirmView" v-if="type === 'component'"></component>
    </confirm-dialog>
  </div>
</template>

<script>
  import ConfirmDialog from '../components/ConfirmDialog'
  import ConfirmText from '../components/ConfirmText'
  import confirmFactory from '../lib/confirmFactory'

  let confirmResolve;
  const Confirm = ({ open, message, component, internalComp, setText, setComponent }) => new Promise((resolve) => {
    if (message) {
      setText(message)
    }
    if (component) {
      setComponent(component)
    }
    if (internalComp) {
      setComponent(internalComp)
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
        confirmView: null,
        text: null,
        type: 'component',
      };
    },
    mounted() {
      const {
        openConfirm,
        closeConfirm,
        setText,
        setComponent,
      } = this
      confirmFactory.bind({
        openConfirm,
        closeConfirm,
        setText,
        setComponent,
      })
    },
    methods: {
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
    },
  }

</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

