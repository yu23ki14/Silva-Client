<template lang="pug">
  .edit-container
    .columns
      .column.is-three-fifths.is-offset-one-fifth
        nuxt-link(to="/information")
          |< 戻る
    .columns
      .column.is-4.is-offset-4
        .field
          p.control.has-icons-left.has-icons-right
            input.input(type="email" placeholder="Email" v-model="user.email")
            span.icon.is-small.is-left
              font-awesome-icon(:icon="['fas', 'envelope']")
        .field
          p.control.has-icons-left
            input.input(type="text" placeholder="事業所名" v-model="user.name")
            span.icon.is-small.is-left
              font-awesome-icon(:icon="['fas', 'building']")
        .field
          p.control.has-icons-left
            input.input(type="text" placeholder="電話番号：任意" v-model="user.phone_number")
            span.icon.is-small.is-left
              font-awesome-icon(:icon="['fas', 'phone']")
        .field
          p.control
            button.button.is-success.is-fullwidth.is-info(@click="edit")
              | 更新
</template>

<script>
export default {
  data () {
    return {
      user: { ...this.$store.state.dashboard.user }
    }
  },
  methods: {
    async edit () {
      if (this.email !== '' && this.name !== '') {
        await this.$axios.patch('/api/v1/auth', {
          email: this.user.email,
          name: this.user.name,
          phone_number: this.user.phone_number
        })
          .then((response) => {
            this.$store.commit('dashboard/setUser', { data: response.data })
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
.edit-container
  margin: 20px 10px
  .field
    text-align: center
  img
    margin: 15px 0 30px
</style>
