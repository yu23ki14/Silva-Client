<template lang="pug">
  .dashboard-header
    .dashboard-header-inner(v-if="Object.keys($store.state.dashboard.client).length != 0" v-for="n in 2")
      .dashboard-header-content
        .dashboard-header-info
          .dashboard-header-grade
            p.title.is-3
              |{{$store.state.dashboard.client.grade}}
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
          p.title.is-6
            |ステータス：{{$store.state.dashboard.statuses.length > 0 ? $store.state.dashboard.statuses[0].text : '未入力'}}
      .dashboard-header-buttons.buttons
        button.button.is-light.dashboard-header-back-button(@click="backMenu")
          font-awesome-icon(:icon="['fas', 'chevron-left']")
          |戻る
        button.button(@click="editClientModal")
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
    },
    backMenu () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass">
.dashboard-header
  min-height: 97px
  background-color: $brand-primary-thin
  .dashboard-header-inner
    opacity: 0
    &:first-of-type
      opacity: 1
      position: fixed
      width: calc( 100% - 250px )
      @include mediaQuery-down(sm)
        width: 100%
.dashboard-header-inner
  display: flex
  justify-content: space-between
  border-bottom: 2px solid lightgrey
  background-color: $brand-primary-thin
  padding: 9px 25px
  min-height: 97px
  z-index: 1
  @include mediaQuery-down(sm)
    flex-direction: column-reverse
    width: 100%
    padding: 9px 10px
    flex-wrap: wrap
.dashboard-header-content
  @include mediaQuery-up(sm)
    padding-right: 20px
.dashboard-header-info
  width: 100%
  display: flex
  align-items: center
.dashboard-header-grade
  padding-right: 20px
  @include mediaQuery-down(sm)
    width: 70px
  p
    word-break: inherit
.dashboard-header-client-attributes
  display: flex
  width: 100%
  @include mediaQuery-down(sm)
    flex-wrap: wrap
  p
    margin-right: 25px
.dashboard-header-client-status
  margin-top: 10px
.dashboard-header-buttons
  width: 145px
  @include mediaQuery-down(sm)
    width: 100%
    &:last-child
      margin-bottom: 5px
  button
    font-size: 14px
    @include mediaQuery-down(sm)
      width: auto
    @include mediaQuery-up(sm)
      &.dashboard-header-back-button
        display: none
  button.is-status-update
    background-color: $brand-secondary
    color: white
</style>
