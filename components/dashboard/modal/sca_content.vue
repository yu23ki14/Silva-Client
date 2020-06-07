<template lang="pug">
  .sca-content-modal.modal(:class="{'is-active': $store.state.modal.sca_content.display}")
    .modal-background(@click="closeModal")
    .modal-content
      .sca-content-modal-inner(v-if="sca_loading")
          p
            |データ取得中...
      div(v-else)
        .sca-content-modal-inner(v-if="sca_content")
          ScaContent(:data="sca_data")
        div(v-else)
          .sca-content-modal-inner
            h4
              | この患者さんに紐づけられたSCA19のデータはまだありません。SCA19を起動しますか？
          .modal-buttons
            button.button.is-light(@click="closeModal")
              |閉じる
            button.button.is-primary(@click="moveSca")
              |SCA19を起動
    button.modal-close.is-large(aria-label="close", @click="closeModal")
</template>

<script>
import ScaContent from '../../sca/sca_content'

export default {
  components: {
    ScaContent
  },
  data () {
    return {
      sca_loading: true,
      sca_content: false,
      sca_data: null
    }
  },
  mounted () {
    this.loadScaData()
  },
  methods: {
    loadScaData () {
      this.$axios.get(this.req2('/api/v1/assessment_answers/' + this.$store.state.dashboard.client.uid, 'sca'))
        .then((res) => {
          this.sca_content = true
          this.sca_loading = false
          this.sca_data = res.data
        }).catch((e) => {
          if (e.response.status === 404) {
            this.sca_loading = false
          } else {
            this.$store.commit('modal/toggleScaContent')
            this.$store.commit('message/setMessage', { message: 'エラーが発生しました。もう一度試してみてください。', messageType: 'danger' })
          }
        })
    },
    moveSca () {
      this.$store.commit('sca/setData', { clientId: this.$store.state.dashboard.client.uid })
      this.$store.commit('modal/toggleScaContent')
      this.$router.push('/sca')
    },
    closeModal () {
      this.$store.commit('sca/setData', { clientId: null })
      this.$store.commit('modal/toggleScaContent')
    }
  }
}
</script>

<style lang="sass">
.sca-content-modal
  .sca-content-modal-inner
    padding: 20px
</style>
