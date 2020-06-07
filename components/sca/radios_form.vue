<template lang="pug">
  ul.radios-form
    li.field(v-for="item in q")
      p
        |{{item.label}}
      label
        input(type="radio" v-model="answer[item.id]" :value="true")
        span
          |あり
      label
        input(type="radio" v-model="answer[item.id]" :value="false")
        span
          |なし
</template>

<script>
export default {
  props: ['q'],
  data () {
    return {
      answer: {}
    }
  }
}
</script>

<style lang="sass">
.radios-form
  p
    margin-bottom: 10px
  label
    margin-left: 15px
  span
    padding-left: 10px
</style>
