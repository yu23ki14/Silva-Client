<template lang="pug">
  .dashboard-header
    .dashboard-header-inner(v-if="Object.keys($store.state.dashboard.client).length != 0" v-for="n in 2")
      .dashboard-header-buttons
        button.button.is-light.dashboard-header-back-button(@click="backMenu")
          font-awesome-icon(:icon="['fas', 'chevron-left']")
          |戻る
        button.button(@click="statusModal($store.state.dashboard.client.id)")
          |ステータス更新
        button.button(@click="$store.commit('modal/toggleScaContent')")
          |SCA19
        button.button(@click="editClientModal")
          |患者情報編集
      .dashboard-header-content
        .dashboard-header-info
          .dashboard-header-alert
            p.title.is-4.is-alert(v-if="$store.state.dashboard.client.alert === true")
              font-awesome-icon(:icon="['fas', 'exclamation-triangle']")
            p.title.is-4.is-safe(v-if="$store.state.dashboard.client.alert === false")
              font-awesome-icon(:icon="['fas', 'circle']")
          .dashboard-header-client-attributes
            p
              |名前：
              |{{$store.state.dashboard.client.last_name}} {{$store.state.dashboard.client.first_name}}
            p
              |年齢：
              |{{$store.state.dashboard.client.age}}
            p
              |性別：
              |{{genderFormatter($store.state.dashboard.client.gender)}}
            p
              |居住地：
              |{{$store.state.dashboard.client.address}}
        .dashboard-header-client-status
          p.title.is-6
            |ステータス：{{$store.state.dashboard.statuses.length > 0 ? $store.state.dashboard.statuses[0].text : '未入力'}}
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
  border-bottom: 2px solid lightgrey
  background-color: $brand-primary-thin
  padding: 15px 20px
  min-height: 97px
  z-index: 1
  @include mediaQuery-down(sm)
    flex-direction: column-reverse
    width: 100%
    padding: 10px 5%
    flex-wrap: wrap
.dashboard-header-content
  width: 100%
  @include mediaQuery-up(sm)
    padding-right: 20px
.dashboard-header-info
  width: 100%
  display: flex
  align-items: center
.dashboard-header-alert
  padding-right: 15px
  p
    word-break: inherit
    color: #ff4646
    &.is-safe
      color: #1dbd00
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
  width: 100%
  margin-bottom: 10px
  button
    font-size: 14px
    margin-right: 10px
    @include mediaQuery-down(sm)
      width: auto
      margin: 0 10px 10px 0
  .dashboard-header-back-button
    display: none
    @include mediaQuery-down(sm)
      display: inline-block
  button.is-status-update
    background-color: $brand-secondary
    color: white
</style>
