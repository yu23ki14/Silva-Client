<template lang="pug">
  ul.checkbox-form
    li(v-for="item in q")
      label
        input(type="checkbox" v-model="answer" :value="item.id")
        span
          |{{item.label}}
</template>

<script>
export default {
  props: ['q'],
  data () {
    return {
      answer: []
    }
  }
}
</script>

<style lang="sass">
.checkbox-form
  li
    display: block
    margin-bottom: 10px
  label
    display: flex
    align-items: center
  span
    padding-left: 10px
  input
    width: 15px
    height: 15px
</style>
