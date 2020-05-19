<template lang="pug">
.dashboard-menu-client(:style="{ backgroundColor: background }")
  .dashboard-menu-client-attributes
    p.dashboard-menu-client-alert.is-alert(v-if="data.alert === true")
      font-awesome-icon(:icon="['fas', 'exclamation-triangle']")
    p.dashboard-menu-client-alert.is-safe(v-if="data.alert === false")
      font-awesome-icon(:icon="['fas', 'circle']")
    p
      |{{data.initial}}
    p
      |{{data.age}}
    p
      |{{genderFormatter(data.gender)}}
  .dashboard-menu-client-address
    p
      |{{data.address}}
  .dashboard-menu-client-status
    p
      |{{data.statuses.length > 0 ? data.statuses.slice(-1)[0].text : '未入力'}}
</template>

<script>
export default {
  props: ['data', 'background']
}
</script>

<style lang="sass">
.dashboard-menu-client
  padding: 5px 10px
  border-bottom: lightgray solid 2px
.dashboard-menu-client-attributes
  display: flex
  flex-wrap: wrap
  align-items: center
  p
    color: black
    width: 25%
    font-weight: bold
  .dashboard-menu-client-alert
    color: #ff4646
    &.is-safe
      color: #1dbd00
.dashboard-menu-client-address
  p
    color: black
    width: 100%
    font-size: 13px
    font-weight: normal
    padding: 5px 0
.dashboard-menu-client-status
  p
    color: black
    font-size: 13px
</style>
