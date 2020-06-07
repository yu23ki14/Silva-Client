<template lang="pug">
  .checkbox-calendar-form
    ul
      li(v-for="item in q")
        label
          input(type="checkbox" v-model="checked_answer" :value="String(item.id)" @change="update")
          span
            |{{item.label}}
        span.icon.is-small(v-if="checked_answer.includes(String(item.id))" @click="dp_target_id = item.id")
          font-awesome-icon(:icon="['fas', 'calendar-alt']")
        p(v-if="answer[item.id] !== undefined")
          |{{answer[item.id].date}}
    .modal(:class="{'is-active': dp_target_id !== null}")
      .modal-background(@click="closeDPModal")
      .modal-content
        button.modal-close.is-large(aria-label="close", @click="closeDPModal")
        client-only
          date-picker(:inline="true" v-model="dp_value" @selected="updatedate" :language="lang")
          button.button.is-fullwidth.is-info.is-small(@click="resetdate")
            |リセット
</template>

<script>
import { ja } from 'vuejs-datepicker/dist/locale'

export default {
  props: ['q'],
  data () {
    return {
      answer: {},
      checked_answer: [],
      dp_value: '',
      dp_target_id: null,
      lang: ja
    }
  },
  methods: {
    update (e) {
      if (this.answer[e.target.value]) {
        delete this.answer[e.target.value]
      } else {
        this.answer[e.target.value] = { id: e.target.value }
      }
    },
    updatedate (e) {
      this.answer[this.dp_target_id].date = this.dateFormatter(e, 'YYYY/MM/DD (WW)')
    },
    resetdate () {
      delete this.answer[this.dp_target_id].date
      this.dp_value = ''
      this.dp_target_id = null
    },
    closeDPModal () {
      this.dp_target_id = null
      this.dp_value = ''
    }
  }
}
</script>

<style lang="sass">
.checkbox-calendar-form
  li
    display: flex
    align-items: center
    margin-bottom: 10px
  label
    display: flex
    align-items: center
    span
      padding-left: 10px
  .icon
    padding: 0 15px 0 20px
    cursor: pointer
  input
    width: 15px
    height: 15px
  .modal-content
    display: inline-block
    width: auto
    border-radius: 2px
</style>
