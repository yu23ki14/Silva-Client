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
          th
            |
      tbody(v-if="list")
        tr(v-for="(status, index) in $store.state.dashboard.statuses")
          td
            |{{status.text}}
          td
            |{{dateFormatter(status.created_at, 'YYYY/MM/DD (WW)')}}
            br
            |{{dateFormatter(status.created_at, 'hh時mm分')}}
          td
            button.button.is-dark.is-small(@click="deleteStatus(status.id, status.text, index)")
              |削除
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
    },
    deleteStatus (id, t, index) {
      const confirmation = confirm(t + '\nこのステータスを削除してもよろしいですか？\n削除すると元に戻せません。\n誤入力意外の理由で削除することはおすすめしておりません。')
      if (confirmation) {
        this.$axios.delete('/api/v1/statuses/' + id).then(() => {
          this.$store.commit('dashboard/removeStatus', index)
        },
        () => {
          this.$store.commit('message/setMessage', { message: 'エラーが発生しました。', messageType: 'danger' })
        })
      } else {

      }
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
  thead
    th
      &:nth-child(2)
        width: 140px
      &:nth-child(3)
        width: 74px
  tbody
    td
      padding: .9em .75em
      font-size: 1rem
      line-height: 1.2rem
      word-break: break-all
</style>
