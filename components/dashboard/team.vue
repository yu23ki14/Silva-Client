<template lang="pug">
  .dashboard-team
    .dashboard-team-header
      p.title.is-5
        |チーム最新情報
      .dashboard-team-buttons
        button.button(@click="toggleList()")
          span(v-if="list")
            |リストを閉じる
          span(v-else)
            |リストを開く
        button.button.is-primary(@click="actionModal($store.state.dashboard.client.id)")
          |アクションを追加＋
    .dashboard-team-table
      table.table.is-striped
        thead
          tr
            th
              |役割
            th
              |事業者名
            th
              |アクション
            th
              |最終更新日時
        tbody(v-if="list")
          tr(v-for="role in role_list")
            td
              |{{roleFormatter(role, true)}}
            td
              span.inviting(v-if="$store.state.dashboard.team[role].user.inviting")
                |招待中
              |{{$store.state.dashboard.team[role].user.name}}
            td
              |{{$store.state.dashboard.team[role].action.text}}
            td
              span(v-if="$store.state.dashboard.team[role].user.inviting")
                button.button.is-dark.is-small.is-fullwidth(@click="deleteInvitation($store.state.dashboard.team[role].user.invitation_id)")
                  |取り消す
              span.dashoboard-team-action-date(v-else-if="$store.state.dashboard.team[role].user.name != undefined")
                |{{dateFormatter($store.state.dashboard.team[role].action.created_at, 'YYYY/MM/DD (WW)')}}
                br
                |{{dateFormatter($store.state.dashboard.team[role].action.created_at, 'hh時mm分')}}
              span(v-else)
                button.button.is-small.is-fullwidth(@click="userModal($store.state.dashboard.client.id, role)")
                  |追加する＋
</template>

<script>
export default {
  data () {
    return {
      list: true,
      role_list: ['care_manager', 'clinic', 'nurse', 'care', 'rehabilitation', 'medicine', 'day_service', 'dentistry', 'mequipment', 'wequipment', 'other']
    }
  },
  methods: {
    userModal (c, r) {
      this.$store.commit('modal/toggleAddUser', { clientId: c, role: r })
    },
    actionModal (c) {
      this.$store.commit('modal/toggleAddAction', { clientId: c })
    },
    toggleList () {
      this.list = !this.list
    },
    deleteInvitation (id) {
      const confirmation = confirm('招待を取り消しても良いですか？')
      if (confirmation) {
        this.$axios.delete('/api/v1/invitations/' + id).then((res) => {
          this.$store.commit('dashboard/updateTeamRole', { data: res.data })
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
.dashboard-team-header
  display: flex
  align-items: center
  justify-content: space-between
  flex-wrap: wrap
  p.title:not(:last-child)
    margin: 0
  .dashboard-team-buttons
    @include mediaQuery-down(sm)
      margin-top: 10px
    .button
      font-size: 14px
      margin-left: 10px
      &:first-of-type
        margin-left: 0
.dashboard-team-table
  width: 100%
  margin-top: 20px
  overflow: auto
  table
    width: 100%
    @include mediaQuery-down(sm)
      width: 100%
      min-width: 680px
  thead
    th
      &:first-child
        width: 100px
      &:nth-child(2)
        width: 160px
        @include mediaQuery-down(sm)
          width: 150px
      &:nth-child(4)
        width: 140px
  tbody
    td
      padding: .9em .75em
      font-size: 1rem
      line-height: 1.2rem
  .inviting
    padding-right: 5px
</style>
