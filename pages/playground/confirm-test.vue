<template>
  <section class="container">
    <confirm-dialog
      :open="confirm"
      @dismiss="No(close)"
      @confirm="Yes(open)"
    >
      <div>
        밥은 먹었니?
      </div>
    </confirm-dialog>
    <button @click="confTest">ok</button>
  </section>
</template>

<script>
  import ConfirmDialog from '../../components/ConfirmDialog'

  let confirmResolve;
  const Confirm = ({ open }) => new Promise((resolve) => {
    open()
    confirmResolve = resolve
  })

  const Yes = (open) => {
    open()
    if ( confirmResolve ) confirmResolve(true)
  }
  const No = (close) => {
    close()
    if ( confirmResolve ) confirmResolve(false)
  }

  export default {
    components: {
      ConfirmDialog
    },
    data() {
      return {
        confirm: false,
      };
    },
    methods: {
      async confTest () {
        // case1
        if (!await Confirm({
          message: 'ok?',
          open: this.openConfirm,
        })) {
          console.log('not ok');
          return;
        }

        console.log('ok');

        // case2
        if (!await Confirm({
          component: 'ok?',
          open: this.openConfirm,
        })) {
          console.log('ok')
          return;
        }

        console.log('ok');

        // case3
        if (!await Confirm({
          confirm: 'ok?',
          open: this.openConfirm,
        })) {
          console.log('ok')
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

