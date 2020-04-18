<template lang="pug">
  header
    .notification(v-if="$store.state.message.message != null", :class="'is-' + $store.state.message.message_type", @click="deleteMessage")
      button.delete
      span
        | {{$store.state.message.message}}
</template>

<script>
export default {
  methods: {
    deleteMessage () {
      this.$store.commit('message/removeMessage')
    }
  }
}
</script>

<style lang="sass">
header
  .notification
    margin: 5px
    position: fixed
    right: 0
    max-width: 250px
    z-index: 41
    cursor: pointer
</style>
