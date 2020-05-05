<template lang="pug">
  .login-container.container
    .columns
      .column.is-4.is-offset-4
        img(src="~assets/images/logos/logo-blue.svg" width="250")

        .field
          p.control.has-icons-left.has-icons-right
            input.input(type="email" placeholder="Email" v-model="email")
            span.icon.is-small.is-left
              font-awesome-icon(:icon="['fas', 'envelope']")
        .field
          p.control.has-icons-left
            input.input(type="password" placeholder="Password" v-model="password")
            span.icon.is-small.is-left
              font-awesome-icon(:icon="['fas', 'lock']")
        .field
          p.control
            button.button.is-fullwidth.is-info(@click="login")
              | ログイン

        nuxt-link(to="/auth/sign_up")
          |新規登録はこちら
</template>

<script>
export default {
  data () {
    return {
      password: '',
      email: ''
    }
  },
  methods: {
    async login () {
      await this.$axios.post('/api/v1/auth/sign_in', {
        email: this.email,
        password: this.password
      })
        .then((response) => {
          localStorage.setItem('client', response.headers.client)
          localStorage.setItem('access-token', response.headers['access-token'])
          localStorage.setItem('uid', response.headers.uid)
          window.location.href = '/'
        },
        () => {
          this.$store.commit('message/setMessage', { message: 'メールアドレスもしくはパスワードが間違っています。' })
        })
    }
  }
}
</script>

<style lang="sass">
.login-container
  padding: 100px 15px 0
  text-align: center
  img
    margin-bottom: 30px
</style>
