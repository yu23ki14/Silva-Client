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
        // .control.has-icons-left.field
          .select.is-fullwidth
            select(v-model="role")
              option(disabled value="")
                |事業種
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
                |デイサービス・施設
              option(value="dentistry")
                |訪問歯科
              option(value="other")
                |その他
          span.icon.is-small.is-left
            i.fas.fa-globe
        .field
          p.control
            button.button.is-success.is-fullwidth.is-info(@click="signUp")
              | 新規登録
        nuxt-link(to="/auth/login")
          |すでに登録済みの方はこちら
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
          phone_number: this.phone_number,
          invitation_uid: 'teadijajoisjfaduja'
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
  padding-top: 50px
  text-align: center
  img
    margin-bottom: 30px
</style>
