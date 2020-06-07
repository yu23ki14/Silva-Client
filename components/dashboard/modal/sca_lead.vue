<template lang="pug">
  .sca-lead-modal.modal(:class="{'is-active': $store.state.modal.sca_lead.display}")
    .modal-background(@click="toggleModal")
    .modal-content
      .sca-lead-modal-inner
        h4
          | SCA19は...
        p
          | SCA19を利用することで
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
