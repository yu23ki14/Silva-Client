<template lang="pug">
  .invitations_modal.modal(:class="{'is-active': $store.state.modal.invitations.display}")
    .modal-background
    .modal-content
      .modal-inner
        p.title.is-5
          span(v-if="data.length > 1")
            |複数の
          |チームへの招待が来ています。承認・非承認を選択して送信してください。
        .field(v-for="invitation in data")
          hr
          .invitation-inner
            table.table.is-striped
              tbody
                tr
                  td
                    |役割
                  td
                    |{{roleFormatter(invitation.role)}}
                tr
                  td
                    |患者情報
                  td
                    |姓.{{invitation.client.initial}}, 年齢.{{invitation.client.age}}, 性別.{{invitation.client.gender}}
                tr
                  td
                    |招待者
                  td
                    |{{invitation.sended_user.name}}
            .control
              label.radio
                input(type="radio" :name="invitation.id" @change="setAnswer(true, invitation.id)")
                span
                  |承認
              br
              label.radio
                input(type="radio" :name="invitation.id" @change="setAnswer(false, invitation.id)")
                span
                  |非承認
      .modal-buttons
        button.button.is-primary(@click="answerInvitation")
          |送信
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      answer: {}
    }
  },
  methods: {
    toggleModal () {
      this.$store.commit('modal/toggleInvitations')
    },
    async answerInvitation () {
      if (Object.keys(this.answer).length === this.data.length) {
        await this.$axios.post('/api/v1/invitations/answer', {
          answer: this.answer
        })
          .then((response) => {
            this.toggleModal()
            window.location.href = '/'
          },
          (error) => {
            return error
          })
      } else {
        this.$store.commit('message/setMessage', { message: '入力されていない情報があります。', messageType: 'warning' })
      }
    },
    setAnswer (a, i) {
      this.answer[i] = a
    }
  }
}
</script>

<style lang="sass">
.invitations_modal
  .modal-buttons .button
    width: 100%
  .invitation-inner
    display: flex
    justify-content: center
  .control
    padding-left: 20px
    span
      padding-left: 10px
</style>
