<template lang="pug">
  .sca-container.container
    .columns
      .column.is-6-tablet.is-offset-3-tablet.is-4-widescreen.is-offset-4-widescreen
        .field
          p.title.is-4
            |{{assessment.question_groups[step].title}}
        .field.sca-form-container(v-if="!formSwitch")
          CheckboxForm(v-if="assessment.question_groups[step].form_type === 'checkbox'" :q="assessment.question_groups[step].question_items" ref="formAnswer")
          CheckboxCalendarForm(v-if="assessment.question_groups[step].form_type === 'checkbox_calendar'" :q="assessment.question_groups[step].question_items" ref="formAnswer")
          RadioForm(v-if="assessment.question_groups[step].form_type === 'radio'" :q="assessment.question_groups[step].question_items" ref="formAnswer")
          RadiosForm(v-if="assessment.question_groups[step].form_type === 'radios'" :q="assessment.question_groups[step].question_items" ref="formAnswer")
          NumberForm(v-if="assessment.question_groups[step].form_type === 'number'" :q="assessment.question_groups[step].question_items" ref="formAnswer")
          TextareaForm(v-if="assessment.question_groups[step].form_type === 'textarea'" :q="assessment.question_groups[step].question_items" ref="formAnswer")
        .field
          p.control
            button.button.is-fullwidth.is-info(@click="next")
              | 次へ
</template>

<script>
import CheckboxForm from '../../components/sca/checkbox_form'
import CheckboxCalendarForm from '../../components/sca/checkbox_calendar_form'
import RadioForm from '../../components/sca/radio_form'
import RadiosForm from '../../components/sca/radios_form'
import NumberForm from '../../components/sca/number_form'
import TextareaForm from '../../components/sca/textarea_form'

export default {
  components: {
    CheckboxForm,
    RadioForm,
    RadiosForm,
    NumberForm,
    CheckboxCalendarForm,
    TextareaForm
  },
  data () {
    return {
      step: 0,
      answers: {},
      formSwitch: false
    }
  },
  async asyncData (context) {
    const a = await context.$axios.get(context.$req2('/api/v1/assessments/9rLVhkKhLOigqH8205A2Tg', 'sca'))
      .then((res) => {
        return res.data
      }).catch(() => {
        context.$store.commit('message/setMessage', { message: 'エラーが発生しました。ブラウザをリロードしてみてください。', messageType: 'danger' })
      })
    return { assessment: a }
  },
  methods: {
    next () {
      if (this.step + 1 === this.assessment.question_groups.length) {
        this.$router.push('/sca/result')
      } else {
        this.formSwitch = true
        this.answers[this.assessment.question_groups[this.step].id] = this.$refs.formAnswer.answer
        this.step += 1
        this.title = this.assessment.question_groups[this.step - 1].title
        this.formSwitch = false
      }
    }
  }
}
</script>

<style lang="sass">
.sca-container
  padding: 30px 15px 0
  .field
    margin-bottom: 30px
</style>
