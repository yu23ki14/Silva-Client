<template lang="pug">
  .sca-lead-modal.modal(:class="{'is-active': $store.state.modal.sca_lead.display}")
    .modal-background(@click="toggleModal")
    .modal-content
      .sca-lead-modal-inner
        h4
          | SCA19を起動しますか？
        p
          | SCA19はCOVID-19感染が疑われる症例について情報を整理し、共有するためのツールです。チーム内での情報共有はもちろんのこと、保健所など第三者に情報を共有する際の漏れを無くしスムーズなやり取りを促します。
      .modal-buttons
        button.button.is-light(@click="toggleModal")
          |閉じる
        button.button.is-primary(@click="toSca")
          |SCA19を起動
    button.modal-close.is-large(aria-label="close", @click="toggleModal")
</template>

<script>
export default {
  methods: {
    toggleModal () {
      const cid = this.$store.state.sca.data.client_id
      this.$router.push('/clients/' + cid)
      this.$store.commit('sca/setData', { clientId: null })
      this.$store.commit('modal/toggleScaLead')
    },
    toSca () {
      this.$router.push('/sca')
      this.$store.commit('modal/toggleScaLead')
    }
  }
}
</script>

<style lang="sass">
.sca-lead-modal
  .sca-lead-modal-inner
    padding: 15px
    p
      margin: 10px 0
  .modal-buttons
    button
      position: relative
    a
      width: 100%
      height: 100%
      position: absolute
      left: 0
      top: 0
</style>
