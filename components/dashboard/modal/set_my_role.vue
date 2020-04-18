<template lang="pug">
  .set_my_role_modal.modal(:class="{'is-active': $store.state.modal.set_my_role.display}")
    .modal-background(@click="toggleModal")
    .modal-content
      .modal-inner
        p.title.is-5
          |チーム内でのあなたの役割を選択してください。
        .select.is-fullwidth
          select(v-model="role")
            option(value="care_manager")
              |ケアマネージャー
            option(value="clinic")
              |訪問診療
            option(value="nurse")
              |訪問看護
            option(value="care")
              |訪問介護
            option(value="rehabilitation")
              |訪問リハビリテーション
            option(value="medicine")
              |訪問薬剤
            option(value="day_service")
              |デイ/施設
            option(value="dentistry")
              |訪問歯科
            option(value="other")
              |その他
      .modal-buttons
        button.button.is-primary(@click="setMyRole")
          |選択
    button.modal-close.is-large(aria-label="close", @click="toggleModal")
</template>

<script>
export default {
  data () {
    return {
      role: null
    }
  },
  methods: {
    toggleModal () {
      this.$store.commit('modal/toggleSetMyRole', { clientId: null })
    },
    async setMyRole () {
      if (this.role !== null && this.email !== null) {
        await this.$axios.post('/api/v1/users/set_my_role', {
          role: this.role,
          client_id: this.$store.state.modal.set_my_role.client_id
        })
          .then((response) => {
            this.$store.commit('dashboard/updateTeamRole', { data: response.data })
            this.toggleModal()
          },
          (error) => {
            return error
          })
      } else {
        this.$store.commit('message/setMessage', { message: '入力されていない情報があります。', messageType: 'warning' })
      }
    }
  }
}
</script>

<style lang="sass">
.set_my_role_modal
  .modal-buttons .button
    width: 100%
</style>
