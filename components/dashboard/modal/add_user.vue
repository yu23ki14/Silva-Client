<template lang="pug">
  .add_user_modal.modal(:class="{'is-active': $store.state.modal.add_user.display}")
    .modal-background(@click="toggleModal")
    .modal-content
      .modal-inner
        div(v-if="type === 0")
          .field
            p.subtitle.is-6
              |役割
            p.subtitle.is-6
              |{{ roleFormatter(this.$store.state.modal.add_user.role) }}
          .field
            p.subtitle.is-6
              |メールアドレス
            p.control
              input.input.is-fullwidth(type="text" placeholder="メールアドレス" v-model="email")
        div(v-else-if="type === 1")
          p.subtitle.is-5
            |{{user.name}} さんを {{ roleFormatter(this.$store.state.modal.add_user.role) }} として招待してよろしいですか？
        div(v-else-if="type === 2")
          p.subtitle.is-5
            |このメールアドレス（{{email}}）はSilvaに登録されていません。Silvaへの招待メールを送り、チームへ追加しますか？

      .modal-buttons
        button.button.is-light(@click="toggleModal")
          |追加せずに閉じる
        button.button.is-primary(@click="validateEmail", v-if="type === 0")
          |追加
        button.button.is-primary(@click="inviteUserTeam", v-else-if="type === 1")
          |招待
        button.button.is-primary(@click="inviteUserSilva", v-else-if="type === 2")
          |招待
    button.modal-close.is-large(aria-label="close", @click="toggleModal")
</template>

<script>
export default {
  data () {
    return {
      email: null,
      type: 0,
      user: null
    }
  },
  methods: {
    toggleModal () {
      this.$store.commit('modal/toggleAddUser', { clientId: null, role: null })
      this.type = 0
      this.email = null
      this.user = null
    },
    async validateEmail () {
      if (this.email !== null) {
        await this.$axios.post('/api/v1/users/validate_email', {
          email: this.email
        })
          .then((response) => {
            if (response.data.result) {
              this.user = response.data.user
              this.type = 1
            } else {
              this.type = 2
            }
          },
          (error) => {
            return error
          })
      } else {
        this.$store.commit('message/setMessage', { message: '入力されていない情報があります。', messageType: 'warning' })
      }
    },
    async inviteUserTeam () {
      await this.$axios.post('/api/v1/invitations', {
        user_id: this.user.id,
        role: this.$store.state.modal.add_user.role,
        client_id: this.$store.state.modal.add_user.client_id,
        user_present: true
      })
        .then((response) => {
          this.$store.commit('dashboard/updateTeamRole', { data: response.data })
          this.toggleModal()
        },
        (error) => {
          return error
        })
    },
    async inviteUserSilva () {
      await this.$axios.post('/api/v1/invitations', {
        email: this.email,
        role: this.$store.state.modal.add_user.role,
        client_id: this.$store.state.modal.add_user.client_id,
        user_present: false
      })
        .then((response) => {
          this.$store.commit('dashboard/updateTeamRole', { data: response.data })
          this.toggleModal()
        },
        (error) => {
          return error
        })
    }
  }
}
</script>

<style lang="sass">
.add_user_modal
  label
    font-size: 1.25rem
    padding-right: 15px
  span
    padding-left: 5px
  .subtitle:not(:last-child)
    margin-bottom: 10px
  .field
    margin-bottom: 20px
    display: flex
    &:last-child
      margin-bottom: 0
  .control
    width: 100%
  p
    min-width: 160px
  .radio + .radio
    margin: 0
</style>
