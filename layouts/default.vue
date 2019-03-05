<template>
  <div>
    <nuxt/>
    <confirm-dialog
      :open="confirm"
      @dismiss="No(closeConfirm)"
      @confirm="Yes(closeConfirm)"
      :updatedHook="confirmUpdatedHook"
    >
      <confirm-text :text="text" v-if="type === 'text'"/>
      <div id="dos-custom-confirm" v-if="type === 'component'"/>
    </confirm-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ConfirmDialog from '../components/ConfirmDialog'
  import ConfirmText from '../components/ConfirmText'
  import confirmBinder from '../lib/confirmBinder'

  export default {
    components: {
      ConfirmDialog,
      ConfirmText
    },
    data () {
      return {
        confirm: false,
        confirmView: null,
        text: null,
        type: null,
        confirmUpdatedHook: null
      }
    },
    mounted () {
      const {
        openConfirm,
        closeConfirm,
        setText,
        setComponent,
        clean
      } = this
      confirmBinder.bind({
        openConfirm,
        closeConfirm,
        setText,
        setComponent,
        clean
      })
    },
    methods: {
      openConfirm () {
        this.confirm = true
      },
      closeConfirm () {
        this.confirm = false
      },
      setText (text) {
        this.type = 'text'
        this.text = text
      },
      setComponent (comp, args = {}) {
        this.type = 'component'

        const CompnentClass = Vue.extend(comp)
        const instance = new CompnentClass(args)
        const attach = () => {
          if (!instance || !document.getElementById('dos-custom-confirm')) return
          const component = instance.$mount()
          document.getElementById('dos-custom-confirm').appendChild(component.$el)
        }
        this.confirmUpdatedHook = attach
      },
      clean () {
        this.confirm = false
        this.confirmView = null
        this.text = null
        this.type = null
        this.confirmUpdatedHook = null
      },
      Yes () {
        confirmBinder.Yes()
      },
      No () {
        confirmBinder.No()
      }
    }
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

