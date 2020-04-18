<template lang="pug">
progress.progress.is-large.is-info(max="100")
  |60%
</template>

<script>
export default {
  mounted () {
    this.logout()
  },
  methods: {
    async logout () {
      await this.$axios.delete('/api/v1/auth/sign_out')
        .then(() => {
          localStorage.removeItem('access-token')
          localStorage.removeItem('client')
          localStorage.removeItem('uid')
          localStorage.removeItem('token-type')
          window.location.href = '/auth/login'
        }).catch(() => {
          this.$store.commit('message/setMessage', { message: '予期せぬエラーが発生しました。' })
          this.$router.push('/information')
        })
    }
  }
}
</script>

<style lang="sass">
</style>
