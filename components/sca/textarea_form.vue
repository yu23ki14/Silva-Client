<template lang="pug">
  ul.textarea-form
    li
      textarea.textarea(v-model="answer")
</template>

<script>
export default {
  props: ['q'],
  data () {
    return {
      answer: ''
    }
  }
}
</script>

<style lang="sass">
.textarea-form
  .textarea
    height: 250px
</style>
