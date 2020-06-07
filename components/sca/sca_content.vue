<template lang="pug">
  ul.sca-content-container
    li.sca-content-group(v-for="g in data.assessment.question_groups")
      p.sca-content-label
        |{{g.label}}
      ul.sca-content-items
        p(v-if="data.answer.assessment_answer_items.filter(item => item.question_group_id === g.id).length === 0")
          |なし
        li(v-else v-for="item in data.answer.assessment_answer_items.filter(item => item.question_group_id === g.id)")
          div(v-if="g.form_type === 'checkbox_calendar'")
            p
              |{{g.question_items.filter(qi => qi.id === item.question_item_id)[0].label}}
              span(v-if="item.content != null")
                |{{item.content}} から
          div(v-else-if="g.form_type === 'number'")
            p
              |{{g.question_items.filter(qi => qi.id === item.question_item_id)[0].label}}
              span.sca-content-number
                |{{item.content}}
          div(v-else-if="g.form_type === 'checkbox'")
            p
              |{{g.question_items.filter(qi => qi.id === item.question_item_id)[0].label}}
          div(v-else-if="g.form_type === 'radios'")
            p
              |{{g.question_items.filter(qi => qi.id === item.question_item_id)[0].label}}
          div(v-else-if="g.form_type === 'radio'")
            p
              |{{g.question_items.filter(qi => qi.id === item.question_item_id)[0].label}}
          div(v-else-if="g.form_type === 'textarea'")
            p
              |{{item.content}}
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="sass">
.sca-content-label
  font-size: 18px
  font-weight: bold
.sca-content-group
  border-bottom: 2px solid gray
  margin-top: 20px
  &:first-of-type
    margin-top: 0
  &:last-of-type
    border-bottom: none
.sca-content-items
  margin: 10px 0 20px
  list-style: disc
  padding-left: 20px
  p
    margin-bottom: 10px
  span
    margin-left: 10px
  .sca-content-number
    font-weight: bold
</style>
