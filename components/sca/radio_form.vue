<template lang="pug">
  ul.radio-form
    li
      label(v-for="item in q")
        input(type="radio" name="radio" :value="item.id" v-model="answer")
        span
          |{{item.label}}
</template>

<script>
export default {
  props: ['q'],
  data () {
    return {
      answer: null
    }
  }
}
</script>

<style lang="sass">
.radio-form
  label
    display: block
    margin-bottom: 10px
  span
    padding-left: 10px
</style>
