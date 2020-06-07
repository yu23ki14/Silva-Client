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
        .field.sca-form-buttons
          p.control
            button.button.is-fullwidth.is-info(@click="next")
              | 次へ
            button.button.is-fullwidth.is-light(@click="prev" v-if="this.step > 0")
              | 戻る
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
      formSwitch: false,
      alert: true
    }
  },
  async asyncData (context) {
    if (context.store.state.sca.data.client_id === null) {
      context.redirect('/')
    } else {
      const a = await context.$axios.get(context.$req2('/api/v1/assessments/9rLVhkKhLOigqH8205A2Tg', 'sca'))
        .then((res) => {
          return res.data
        }).catch(() => {
          context.$store.commit('message/setMessage', { message: 'エラーが発生しました。ブラウザをリロードしてみてください。', messageType: 'danger' })
        })
      return { assessment: a }
    }
  },
  methods: {
    next () {
      if (this.step + 1 === this.assessment.question_groups.length) {
        this.answers[this.assessment.question_groups[this.step].id] = this.$refs.formAnswer.answer
        this.$axios.post(this.req2('/api/v1/assessment_answers', 'sca'), {
          data: this.answers,
          uid: this.$store.state.sca.data.client_id,
          assessment_id: this.assessment.id
        }).then(() => {
          this.$router.push('/clients/' + this.$store.state.sca.data.client_id)
        })
      } else if (this.step === 4 && this.$refs.formAnswer.answer.length > 0) {
        this.formSwitch = true
        this.alert = false
        this.answers[this.assessment.question_groups[this.step].id] = this.$refs.formAnswer.answer
        this.step += 2
        setTimeout(() => {
          if (this.answers[this.assessment.question_groups[this.step].id] !== undefined) {
            this.$refs.formAnswer.checked_answer = Object.keys(this.answers[this.assessment.question_groups[this.step].id])
            this.$refs.formAnswer.answer = this.answers[this.assessment.question_groups[this.step].id]
          }
          this.formSwitch = false
        }, 10)
      } else {
        this.formSwitch = true
        this.answers[this.assessment.question_groups[this.step].id] = this.$refs.formAnswer.answer
        this.step += 1
        setTimeout(() => {
          if (this.answers[this.assessment.question_groups[this.step].id] !== undefined) {
            this.$refs.formAnswer.checked_answer = Object.keys(this.answers[this.assessment.question_groups[this.step].id])
            this.$refs.formAnswer.answer = this.answers[this.assessment.question_groups[this.step].id]
          }
          this.formSwitch = false
        }, 10)
      }
    },
    prev () {
      if (this.step > 0) {
        this.formSwitch = true
        if (this.step + 1 === this.assessment.question_groups.length && !this.alert) {
          this.step -= 2
        } else {
          this.step -= 1
        }
        this.formSwitch = false
        setTimeout(() => {
          this.$refs.formAnswer.checked_answer = Object.keys(this.answers[this.assessment.question_groups[this.step].id])
          this.$refs.formAnswer.answer = this.answers[this.assessment.question_groups[this.step].id]
        }, 10)
      }
    }
  }
}
</script>

<style lang="sass">
.sca-container
  padding: 30px 15px 0
  .field
    margin-bottom: 20px
  .sca-form-buttons
    button
      margin-bottom: 10px
</style>
