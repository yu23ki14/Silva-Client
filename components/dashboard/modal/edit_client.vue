<template lang="pug">
  .add_client_modal.modal.is-active
    .modal-background(@click="toggleModal")
    .modal-content
      .modal-inner
        .field
          p.subtitle.is-6
            |アラート
          .control
            label.radio
              input(type="radio" v-model="alert" name="alert" value="true")
              span
                |ON
            label.radio
              input(type="radio" v-model="alert" name="alert" value="false")
              span
                |OFF
        .field
          p.subtitle.is-6
            |姓
          p.control
            input.input(type="text" placeholder="姓イニシャル" v-model="initial" maxlength=1)

        .field
          p.subtitle.is-6
            |年齢
          .control
            .select
              select(v-model="age")
                option(:value="n + 50" v-for="n in 50")
                  |{{n + 50}}
        .field
          p.subtitle.is-6
            |性別
          .control
            label.radio
              input(type="radio" v-model="gender" name="gender" value="F")
              span
                |F
            label.radio
              input(type="radio" v-model="gender" name="gender" value="M")
              span
                |M

        .field
          p.subtitle.is-6
            |居住地
          p.control
            input.input.is-fullwidth(type="text" placeholder="居住地" v-model="address")
      .modal-buttons
        button.button.is-light(@click="toggleModal")
          |編集せずに閉じる
        button.button.is-primary(@click="addClient")
          |編集
    button.modal-close.is-large(aria-label="close", @click="toggleModal")
</template>

<script>
export default {
  data () {
    return {
      grade: this.$store.state.dashboard.client.grade,
      age: null,
      gender: null,
      initial: null,
      address: null,
      underlying_illnesses: []
    }
  },
  methods: {
    toggleModal () {
      this.$store.commit('modal/toggleAddClient')
    },
    async addClient () {
      if (this.grade !== null && this.age !== null && this.gender !== null && this.initial !== null && this.address !== null) {
        await this.$axios.post('/api/v1/clients', {
          grade: this.grade,
          age: this.age,
          gender: this.gender,
          initial: this.initial,
          address: this.address,
          underlying_illnesses: this.underlying_illnesses
        })
          .then((res) => {
            this.$store.commit('dashboard/updateClients', { data: res.data })
            this.toggleModal()
          },
          () => {
            this.$store.commit('message/setMessage', { message: 'エラーが発生しました。', messageType: 'danger' })
          })
      } else {
        this.$store.commit('message/setMessage', { message: '入力されていない情報があります。', messageType: 'warning' })
      }
    }
  }
}
</script>

<style lang="sass">
.add_client_modal
  label
    font-size: 1rem
    padding-right: 15px
  span
    padding-left: 5px
  .subtitle:not(:last-child)
    margin-bottom: 0px
  .field
    margin-bottom: 25px
    display: flex
    align-items: center
    &:last-child
      margin-bottom: 0
  p
    min-width: 85px
  .radio + .radio
    margin: 0
</style>
