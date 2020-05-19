<template lang="pug">
  .dashboard-menu
    .dashboard-menu-inner(:style="{ height: height + 'px' }")
      .dashboard-menu-user-info
        p.subtitle.is-6
          |ログイン中
        p.dashboard-menu-user-name.title.is-4
          |{{$store.state.dashboard.user.name}}
        p.subtitle.is-6.dashboard-menu-link
          nuxt-link(to="/information")
            |ヘルプ・設定
      .dashboard-menu-clients-container
        ul.dashboard-menu-clients-legend
          li
            Client(:data="{alert: null, age: '年齢', gender: 'L', initial: '姓', address: '居住地', statuses: [{text: 'ステータス'}]}" :background="'#7a7a7a'")
        ul.dashboard-menu-clients(:style="{ height: height - 235 + 'px' }")
          li(v-for="(client, key, index) in $store.state.dashboard.clients")
            Client(:data="client" :background="client.id === $store.state.dashboard.client.id ? '#bbd4f5' : (index % 2 != 0 ? '#cacaca' : '#e8e8e8')")
            nuxt-link(:to="'/clients/' + client.uid")
      button.title.is-6.dashboard-menu-client-new(@click="$emit('clientModal')")
        |患者を追加する＋
</template>

<script>
import Client from './client'
export default {
  components: {
    Client
  },
  data () {
    return {
      height: 0
    }
  },
  mounted () {
    this.height = window.innerHeight
  }
}
</script>

<style lang="sass">
.dashboard-menu
  width: 250px

.dashboard-menu-inner
  position: fixed
  width: 250px
  border-right: 2px solid lightgrey
  background-color: #eaeaea
  @include mediaQuery-down(sm)
    display: none
    width: 100%
    border-right: none
    .is-menu-active &
      display: block

.dashboard-menu-user-info
  background-color: $brand-primary
  padding: 10px
  p, a
    color: white
  .dashboard-menu-link
    text-align: right
  a
    &:hover
      color: lightgray

.dashboard-menu-user-name
  height: 27px
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis

.dashboard-menu-clients
  overflow: auto
  li
    cursor: pointer
    position: relative
  a
    position: absolute
    width: 100%
    height: 100%
    left: 0
    top: 0

.dashboard-menu-client-new
  background-color: $brand-secondary
  display: block
  padding: 20px 0
  text-align: center
  color: white
  width: 100%
  border: none
  cursor: pointer
</style>
