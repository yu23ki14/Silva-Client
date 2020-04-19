<template lang="pug">
  .dashboard-header
    .dashboard-header-inner(v-if="Object.keys($store.state.dashboard.client).length != 0")
      .dashboard-header-grade
        p.title.is-2
          |{{$store.state.dashboard.client.grade}}
      .dashboard-header-info
        .dashboard-header-client-attributes
          p
            |姓：
            |{{$store.state.dashboard.client.initial}}
          p
            |年齢：
            |{{$store.state.dashboard.client.age}}
          p
            |性別：
            |{{$store.state.dashboard.client.gender}}
          p
            |居住地：
            |{{$store.state.dashboard.client.address}}
        .dashboard-header-client-status
          p.title.is-5
            |{{$store.state.dashboard.statuses.length > 0 ? $store.state.dashboard.statuses[0].text : '未入力'}}
      .dashboard-header-buttons.buttons
        button.button.is-fullwidth(@click="editClientModal")
          |患者情報を編集
        button.button.is-status-update(@click="statusModal($store.state.dashboard.client.id)")
          |ステータスを更新
</template>

<script>
export default {
  methods: {
    statusModal (c) {
      this.$store.commit('modal/toggleAddStatus', { clientId: c })
    },
    editClientModal () {
      this.$store.commit('modal/toggleAddClient', 'edit')
      this.$emit('updateAddModal')
    }
  }
}
</script>

<style lang="sass">
.dashboard-header
  background-color: $brand-primary-thin
  border-bottom: 2px solid lightgrey
  padding: 9px 25px
  min-height: 97px
.dashboard-header-inner
  display: flex
  align-items: center
.dashboard-header-grade
  padding-right: 20px
  p
    word-break: inherit
.dashboard-header-info
  width: 100%
.dashboard-header-client-attributes
  display: flex
  width: 100%
  p
    margin-right: 25px
.dashboard-header-client-status
  margin-top: 10px
.dashboard-header-buttons
  width: 145px
  button
    font-size: 14px
  button.is-status-update
    background-color: $brand-secondary
    color: white
</style>
