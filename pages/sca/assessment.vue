<template lang="pug">
  .sca-container.container
    .columns
      .column.is-6-tablet.is-offset-3-tablet.is-4-widescreen.is-offset-4-widescreen
        .field
          p.title.is-4
            |{{step + 1}}. {{assessment.question_groups[step].title}}
        .field.sca-form-container(v-if="!formSwitch")
          CheckboxForm(v-if="assessment.question_groups[step].form_type === 'checkbox'" :q="assessment.question_groups[step].question_items" ref="formAnswer")
          RadioForm(v-if="assessment.question_groups[step].form_type === 'radio'" :q="assessment.question_groups[step].question_items" ref="formAnswer")
          RadiosForm(v-if="assessment.question_groups[step].form_type === 'radios'" :q="assessment.question_groups[step].question_items" ref="formAnswer")
        .field
          p.control
            button.button.is-fullwidth.is-info(@click="next")
              | 次へ
</template>

<script>
import CheckboxForm from '../../components/sca/checkbox_form'
import RadioForm from '../../components/sca/radio_form'
import RadiosForm from '../../components/sca/radios_form'

export default {
  components: {
    CheckboxForm,
    RadioForm,
    RadiosForm
  },
  data () {
    return {
      description: 'SCA (Silva Clinical Assessment) Covid19 はCovid19感染疑いのある患者さんの対応方針を決定するのを支援するシステムです。',
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
      this.formSwitch = true
      if (this.step + 1 === this.assessment.question_groups.length) {
        this.$router.push('/sca/result')
      } else {
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
.sca-form-container
  margin-left: 10px
.field
  padding-bottom: 30px
</style>
