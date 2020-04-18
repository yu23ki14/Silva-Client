<template lang="pug">
  .dashboard-status-history
    .dashboard-status-history-header
      p.title.is-5
        |ステータス履歴
      .dashboard-status-history-buttons
        button.button(@click="toggleList()")
          span(v-if="list")
            |リストを閉じる
          span(v-else)
            |リストを開く

    table.table.dashboard-status-history-table.is-striped
      thead
        tr
          th
            |ステータス
          th
            |更新日時
      tbody(v-if="list")
        tr(v-for="status in $store.state.dashboard.statuses")
          td
            |{{status.text}}
          td
            |{{dateFormatter(status.created_at, 'YYYY/MM/DD (WW)')}}
            br
            |{{dateFormatter(status.created_at, 'hh時mm分')}}
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
.dashboard-status-history
  margin-top: 40px
.dashboard-status-history-header
  display: flex
  align-items: center
  justify-content: space-between
  p.title:not(:last-child)
    margin: 0
  .button
    font-size: 14px
    margin-left: 10px
.dashboard-status-history-table
  width: 100%
  margin-top: 20px
  border: 1px solid #dbdbdb
  thead
    th
      &:nth-child(2)
        width: 140px
  tbody
    td
      padding: .9em .75em
      font-size: 1rem
      line-height: 1.2rem
</style>
