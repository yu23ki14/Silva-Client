<template lang="pug">
  ul.radios-form
    li.field(v-for="item in q")
      p
        |{{item.label}}
      label
        input(type="radio" :name="item.id" @change="update" :value="true")
        span
          |あり
      label
        input(type="radio" :name="item.id" @change="update" :value="false")
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
  },
  methods: {
    update (e) {
      this.answer[e.target.name] = e.target.value.toLowerCase() === 'true'
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
