<template lang="pug">
  .textarea-form
    p
      |{{q[0].label}}
    ul
      li
        textarea.textarea(v-model="answer[q[0].id]")
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
.textarea-form
  p
    margin-bottom: 10px
  .textarea
    height: 250px
</style>
