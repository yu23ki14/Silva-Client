<template lang="pug">
  .add-status.modal(:class="{'is-active': $store.state.modal.add_status.display}")
    .modal-background(@click="toggleModal")
    .modal-content
      .modal-inner
        .field
          p.subtitle.is-6
            |ステータスを入力してください。
          textarea.textarea(placeholder="PCR検査1回目陰性" v-model="text")
      .modal-buttons
        button.button.is-light(@click="toggleModal")
          |追加せずに閉じる
        button.button.is-primary(@click="addStatus")
          |追加
    button.modal-close.is-large(aria-label="close", @click="toggleModal")
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  },
  methods: {
    toggleModal () {
      this.$store.commit('modal/toggleAddStatus', { clientId: null })
      this.text = ''
    },
    async addStatus () {
      if (this.text !== '') {
        await this.$axios.post('/api/v1/statuses', {
          client_id: this.$store.state.modal.add_status.client_id,
          text: this.text
        }).then((response) => {
          this.$store.commit('dashboard/updateStatuses', { data: response.data })
          this.$store.commit('dashboard/updateClientStatus', { data: response.data })
          this.toggleModal()
        },
        () => {
          this.toggleModal()
          this.$store.commit('message/setMessage', { message: 'アクションを追加できませんでした。もう一度お試しください。', messageType: 'danger' })
        })
      } else {
        this.$store.commit('message/setMessage', { message: '入力されていない情報があります。', messageType: 'warning' })
      }
    }
  }
}
</script>

<style lang="sass">
.add-status
  .field
    margin-bottom: 20px
    &:last-child
      margin-bottom: 0
</style>
