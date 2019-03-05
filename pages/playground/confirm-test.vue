<template>
  <section class="container">
    <button @click="startConfirm">start confirm</button>
  </section>
</template>

<script>
  import confirmBinder from '../../lib/confirmBinder'
  import MyComfirmMessage from '../../components/MyComfirmMessage'

  export default {
    data() {
      return {
        amount: 5,
      }
    },
    methods: {
      async startConfirm () {
        const { Confirm } = confirmBinder

        if (!await Confirm({
          message: 'ok?'
        })) {
          console.log('not ok1')
          return
        }

        console.log('ok1')

        if (!await Confirm({
          message: `${this.amount}개 있나요?`
        })) {
          console.log('not ok2')
          return
        }

        console.log('ok2')

        if (!await Confirm({
          component: MyComfirmMessage,
          componentArgument: {
            propsData: {
              a: '오늘도',
              b: '야근하고',
              c: '집에 가시나요?',
            }
          }
        })) {
          console.log('not ok3')
          return
        }

        console.log('ok3')

        if (!await Confirm({
          component: MyComfirmMessage,
          componentArgument: {
            propsData: {
              a: '버스 코딩 노트북',
              b: '누가 좀',
              c: '추천해줘',
            }
          }
        })) {
          console.log('not ok4')
          return
        }

        console.log('ok4')
      }
    },
  }
</script>
