<template lang="pug">
  ul.number-form
    li.field(v-for="item in q")
      label.control
        p
          |{{item.label}}
        input.input(type="number" @change="update" :item_id="item.id" placeholder="数値を入力してください。")
</template>

<script>
export default {
  props: ['q'],
  data () {
    return {
      answer: {}
    }
  },
  methods: {
    update (e) {
      this.answer[e.target.attributes.item_id.value] = e.target.value
    }
  }
}
</script>

<style lang="sass">
.number-form
  li
    display: block
  p
    padding-bottom: 5px
</style>
