<template lang="pug">
  .add-action.modal(:class="{'is-active': $store.state.modal.add_action.display}")
    .modal-background(@click="toggleModal")
    .modal-content
      .modal-inner
        .field
          p.subtitle.is-6
            |アクションを追加する役割を選択してください。
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
        .field
          p.subtitle.is-6
            |アクション内容を入力してください。
          textarea.textarea(placeholder="週1日に減らして診療実施" v-model="text")
      .modal-buttons
        button.button.is-light(@click="toggleModal")
          |追加せずに閉じる
        button.button.is-primary(@click="addAction")
          |追加
    button.modal-close.is-large(aria-label="close", @click="toggleModal")
</template>

<script>
export default {
  data () {
    return {
      role: '',
      text: ''
    }
  },
  methods: {
    toggleModal () {
      this.$store.commit('modal/toggleAddAction', { clientId: null })
      this.text = ''
    },
    async addAction () {
      if (this.role !== '' && this.text !== '') {
        if (Object.keys(this.$store.state.dashboard.team[this.role].user).length > 0) {
          const userId = this.$store.state.dashboard.team[this.role].user.id
          await this.$axios.post('/api/v1/actions', {
            user_id: userId,
            client_id: this.$store.state.modal.add_action.client_id,
            text: this.text,
            role: this.role
          }).then((response) => {
            this.$store.commit('dashboard/updateTeamAction', { data: response.data })
            this.toggleModal()
          },
          () => {
            this.toggleModal()
            this.$store.commit('message/setMessage', { message: 'アクションを追加できませんでした。もう一度お試しください。', messageType: 'danger' })
          })
        } else {
          this.$store.commit('message/setMessage', { message: '選択した役割には事業者が設定されていません。', messageType: 'warning' })
        }
      } else {
        this.$store.commit('message/setMessage', { message: '入力されていない情報があります。', messageType: 'warning' })
      }
    }
  }
}
</script>

<style lang="sass">
.add-action
  .field
    margin-bottom: 20px
    &:last-child
      margin-bottom: 0
</style>
