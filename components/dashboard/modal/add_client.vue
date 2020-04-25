<template lang="pug">
  .add_client_modal.modal(:class="{'is-active': $store.state.modal.add_client.display}")
    .modal-background(@click="toggleModal")
    .modal-content
      .modal-inner
        .field
          p.subtitle.is-6
            |優先度
          .control
            label.radio
              input(type="radio" v-model="data.grade" name="grade" value="P")
              span
                |P
            label.radio
              input(type="radio" v-model="data.grade" name="grade" value="G3")
              span
                |G3
            label.radio
              input(type="radio" v-model="data.grade" name="grade" value="G2")
              span
                |G2
            label.radio
              input(type="radio" v-model="data.grade" name="grade" value="G1")
              span
                |G1
            label.radio
              input(type="radio" v-model="data.grade" name="grade" value="N2")
              span
                |N2
            label.radio
              input(type="radio" v-model="data.grade" name="grade" value="N1")
              span
                |N1
        .field
          p.subtitle.is-6
            |姓
          p.control
            input.input(type="text" placeholder="姓イニシャル" v-model="data.initial" maxlength=1)

        .field
          p.subtitle.is-6
            |年齢
          .control
            .select
              select(v-model="data.age")
                option(:value="n + 50" v-for="n in 50")
                  |{{n + 50}}
        .field
          p.subtitle.is-6
            |性別
          .control
            label.radio
              input(type="radio" v-model="data.gender" name="gender" value="F")
              span
                |F
            label.radio
              input(type="radio" v-model="data.gender" name="gender" value="M")
              span
                |M

        .field
          p.subtitle.is-6
            |居住地
          p.control
            input.input.is-fullwidth(type="text" placeholder="居住地" v-model="data.address")
      .modal-buttons
        button.button.is-light(@click="toggleModal")
          span(v-if="$store.state.modal.add_client.type === 'new'")
            |追加せずに閉じる
          span(v-else)
            |編集せずに閉じる
        button.button.is-primary(@click="addClient" v-if="$store.state.modal.add_client.type === 'new'")
          |追加
        button.button.is-primary(@click="updateClient" v-else)
          |編集
    button.modal-close.is-large(aria-label="close", @click="toggleModal")
</template>

<script>
export default {
  props: ['data'],
  methods: {
    toggleModal () {
      this.$store.commit('modal/toggleAddClient')
    },
    async addClient () {
      if (this.data.grade !== null && this.data.age !== null && this.data.gender !== null && this.data.initial !== null && this.data.address !== null) {
        await this.$axios.post('/api/v1/clients', {
          grade: this.data.grade,
          age: this.data.age,
          gender: this.data.gender,
          initial: this.data.initial,
          address: this.data.address,
          underlying_illnesses: this.data.underlying_illnesses
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
    },
    async updateClient () {
      if (this.data.grade !== null && this.data.age !== null && this.data.gender !== null && this.data.initial !== null && this.data.address !== null) {
        await this.$axios.put('/api/v1/clients/' + this.$store.state.dashboard.client.uid, {
          grade: this.data.grade,
          age: this.data.age,
          gender: this.data.gender,
          initial: this.data.initial,
          address: this.data.address,
          underlying_illnesses: this.data.underlying_illnesses
        })
          .then((res) => {
            this.$store.commit('dashboard/updateClients', { data: res.data })
            this.$store.commit('dashboard/setClient', { data: res.data })
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
