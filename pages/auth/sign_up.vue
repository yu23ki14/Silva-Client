<template lang="pug">
  .signup-container.container
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
            input.input(type="password" placeholder="パスワード" v-model="password")
            span.icon.is-small.is-left
              font-awesome-icon(:icon="['fas', 'lock']")
        .field
          p.control.has-icons-left
            input.input(type="text" placeholder="事業所名" v-model="name")
            span.icon.is-small.is-left
              font-awesome-icon(:icon="['fas', 'building']")
        .field
          p.control.has-icons-left
            input.input(type="text" placeholder="電話番号：任意" v-model="phone_number")
            span.icon.is-small.is-left
              font-awesome-icon(:icon="['fas', 'phone']")
        .field
          p.control
            button.button.is-success.is-fullwidth.is-info(@click="signUp")
              | 新規登録
        nuxt-link(to="/auth/login")
          p
            |すでに登録済みの方はこちら
        nuxt-link(to="/about")
          p
            |silvaとは
</template>

<script>
export default {
  data () {
    return {
      password: '',
      email: '',
      name: '',
      phone_number: ''
    }
  },
  methods: {
    async signUp () {
      let url
      if (this.$route.query.invitation_uid !== undefined) {
        url = '/api/v1/auth?invitation_uid=' + this.$route.query.invitation_uid
      } else {
        url = '/api/v1/auth'
      }
      if (this.email !== '' && this.password !== '' && this.name !== '') {
        await this.$axios.post(url, {
          email: this.email,
          password: this.password,
          name: this.name,
          phone_number: this.phone_number
        })
          .then((response) => {
            localStorage.setItem('client', response.headers.client)
            localStorage.setItem('access-token', response.headers['access-token'])
            localStorage.setItem('uid', response.headers.uid)
            window.location.href = '/'
          },
          () => {
            this.$store.commit('message/setMessage', { message: 'エラーが発生しました。', type: 'alert' })
          })
      } else {
        this.$store.commit('message/setMessage', { message: 'メールアドレス、パスワード、事業所名は必須項目です。' })
      }
    }
  }
}
</script>

<style lang="sass">
.signup-container
  padding: 50px 10px 0
  text-align: center
  img
    margin-bottom: 30px
  a > p
    text-align: right
</style>
