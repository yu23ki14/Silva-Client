<template lang="pug">
  .dashboard-action-history
    .dashboard-action-history-header
      p.title.is-5
        |アクション履歴
      .dashboard-action-history-buttons
        button.button(@click="toggleList()")
          span(v-if="list")
            |リストを閉じる
          span(v-else)
            |リストを開く
    .dashboard-action-history-table
      table.table.is-striped
        thead
          tr
            th
              |役割
            th
              |アクション
            th
              |更新日時
        tbody(v-if="list")
          tr(v-for="action in $store.state.dashboard.actions")
            td
              |{{roleFormatter(action.role, true)}}
            td
              |{{action.text}}
            td
              |{{dateFormatter(action.created_at, 'YYYY/MM/DD (WW)')}}
              br
              |{{dateFormatter(action.created_at, 'hh時mm分')}}
</template>

<script>
export default {
  data () {
    return {
      list: true
    }
  },
  methods: {
    toggleList () {
      this.list = !this.list
    }
  }
}
</script>

<style lang="sass">
.dashboard-action-history
  margin-top: 40px
.dashboard-action-history-header
  display: flex
  align-items: center
  justify-content: space-between
  p.title:not(:last-child)
    margin: 0
  .button
    font-size: 14px
    margin-left: 10px
.dashboard-action-history-table
  width: 100%
  margin-top: 20px
  overflow: auto
  table
    width: 100%
    border: 1px solid #dbdbdb
    @include mediaQuery-down(sm)
      width: 500px
  thead
    th
      &:nth-child(1)
        width: 100px
      &:nth-child(3)
        width: 140px
  tbody
    td
      padding: .9em .75em
      font-size: 1rem
      line-height: 1.2rem
      word-break: break-all
</style>
