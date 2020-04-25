<template lang="pug">
  .dashboard-team
    .dashboard-team-header
      p.title.is-5
        |チーム情報
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
          tr
            td
              |ケアマネ
            td
              span.inviting(v-if="$store.state.dashboard.team.care_manager.user.inviting")
                |招待中
              |{{$store.state.dashboard.team.care_manager.user.name}}
            td
              |{{$store.state.dashboard.team.care_manager.action.text}}
            td
              span.dashoboard-team-action-date(v-if="$store.state.dashboard.team.care_manager.user.name != undefined")
                |{{dateFormatter($store.state.dashboard.team.care_manager.action.created_at, 'YYYY/MM/DD (WW)')}}
                br
                |{{dateFormatter($store.state.dashboard.team.care_manager.action.created_at, 'hh時mm分')}}
              span(v-else)
                button.button.is-small.is-fullwidth(@click="userModal($store.state.dashboard.client.id, 'care_manager')")
                  |追加する＋
          tr
            td
              |訪問診療
            td
              span.inviting(v-if="$store.state.dashboard.team.clinic.user.inviting")
                |招待中
              |{{$store.state.dashboard.team.clinic.user.name}}
            td
              |{{$store.state.dashboard.team.clinic.action.text}}
            td
              span.dashoboard-team-action-date(v-if="$store.state.dashboard.team.clinic.user.name != undefined")
                |{{dateFormatter($store.state.dashboard.team.clinic.action.created_at, 'YYYY/MM/DD (WW)')}}
                br
                |{{dateFormatter($store.state.dashboard.team.clinic.action.created_at, 'hh時mm分')}}
              span(v-else)
                button.button.is-small.is-fullwidth(@click="userModal($store.state.dashboard.client.id, 'clinic')")
                  |追加する＋
          tr
            td
              |訪問看護
            td
              span.inviting(v-if="$store.state.dashboard.team.nurse.user.inviting")
                |招待中
              |{{$store.state.dashboard.team.nurse.user.name}}
            td
              |{{$store.state.dashboard.team.nurse.action.text}}
            td
              span.dashoboard-team-action-date(v-if="$store.state.dashboard.team.nurse.user.name != undefined")
                |{{dateFormatter($store.state.dashboard.team.nurse.action.created_at, 'YYYY/MM/DD (WW)')}}
                br
                |{{dateFormatter($store.state.dashboard.team.nurse.action.created_at, 'hh時mm分')}}
              span(v-else)
                button.button.is-small.is-fullwidth(@click="userModal($store.state.dashboard.client.id, 'nurse')")
                  |追加する＋
          tr
            td
              |訪問介護
            td
              span.inviting(v-if="$store.state.dashboard.team.care.user.inviting")
                |招待中
              |{{$store.state.dashboard.team.care.user.name}}
            td
              |{{$store.state.dashboard.team.care.action.text}}
            td
              span.dashoboard-team-action-date(v-if="$store.state.dashboard.team.care.user.name != undefined")
                |{{dateFormatter($store.state.dashboard.team.care.action.created_at, 'YYYY/MM/DD (WW)')}}
                br
                |{{dateFormatter($store.state.dashboard.team.care.action.created_at, 'hh時mm分')}}
              span(v-else)
                button.button.is-small.is-fullwidth(@click="userModal($store.state.dashboard.client.id, 'care')")
                  |追加する＋
          tr
            td
              |訪問リハ
            td
              span.inviting(v-if="$store.state.dashboard.team.rehabilitation.user.inviting")
                |招待中
              |{{$store.state.dashboard.team.rehabilitation.user.name}}
            td
              |{{$store.state.dashboard.team.rehabilitation.action.text}}
            td
              span.dashoboard-team-action-date(v-if="$store.state.dashboard.team.rehabilitation.user.name != undefined")
                |{{dateFormatter($store.state.dashboard.team.rehabilitation.action.created_at, 'YYYY/MM/DD (WW)')}}
                br
                |{{dateFormatter($store.state.dashboard.team.rehabilitation.action.created_at, 'hh時mm分')}}
              span(v-else)
                button.button.is-small.is-fullwidth(@click="userModal($store.state.dashboard.client.id, 'rehabilitation')")
                  |追加する＋
          tr
            td
              |訪問薬剤
            td
              span.inviting(v-if="$store.state.dashboard.team.medicine.user.inviting")
                |招待中
              |{{$store.state.dashboard.team.medicine.user.name}}
            td
              |{{$store.state.dashboard.team.medicine.action.text}}
            td
              span.dashoboard-team-action-date(v-if="$store.state.dashboard.team.medicine.user.name != undefined")
                |{{dateFormatter($store.state.dashboard.team.medicine.action.created_at, 'YYYY/MM/DD (WW)')}}
                br
                |{{dateFormatter($store.state.dashboard.team.medicine.action.created_at, 'hh時mm分')}}
              span(v-else)
                button.button.is-small.is-fullwidth(@click="userModal($store.state.dashboard.client.id, 'medicine')")
                  |追加する＋
          tr
            td
              |デイ/施設
            td
              span.inviting(v-if="$store.state.dashboard.team.day_service.user.inviting")
                |招待中
              |{{$store.state.dashboard.team.day_service.user.name}}
            td
              |{{$store.state.dashboard.team.day_service.action.text}}
            td
              span.dashoboard-team-action-date(v-if="$store.state.dashboard.team.day_service.user.name != undefined")
                |{{dateFormatter($store.state.dashboard.team.day_service.action.created_at, 'YYYY/MM/DD (WW)')}}
                br
                |{{dateFormatter($store.state.dashboard.team.day_service.action.created_at, 'hh時mm分')}}
              span(v-else)
                button.button.is-small.is-fullwidth(@click="userModal($store.state.dashboard.client.id, 'day_service')")
                  |追加する＋
          tr
            td
              |訪問歯科
            td
              span.inviting(v-if="$store.state.dashboard.team.dentistry.user.inviting")
                |招待中
              |{{$store.state.dashboard.team.dentistry.user.name}}
            td
              |{{$store.state.dashboard.team.dentistry.action.text}}
            td
              span.dashoboard-team-action-date(v-if="$store.state.dashboard.team.dentistry.user.name != undefined")
                |{{dateFormatter($store.state.dashboard.team.dentistry.action.created_at, 'YYYY/MM/DD (WW)')}}
                br
                |{{dateFormatter($store.state.dashboard.team.dentistry.action.created_at, 'hh時mm分')}}
              span(v-else)
                button.button.is-small.is-fullwidth(@click="userModal($store.state.dashboard.client.id, 'dentistry')")
                  |追加する＋
          tr
            td
              |その他
            td
              span.inviting(v-if="$store.state.dashboard.team.other.user.inviting")
                |招待中
              |{{$store.state.dashboard.team.other.user.name}}
            td
              |{{$store.state.dashboard.team.other.action.text}}
            td
              span.dashoboard-team-action-date(v-if="$store.state.dashboard.team.other.user.name != undefined")
                |{{dateFormatter($store.state.dashboard.team.other.action.created_at, 'YYYY/MM/DD (WW)')}}
                br
                |{{dateFormatter($store.state.dashboard.team.other.action.created_at, 'hh時mm分')}}
              span(v-else)
                button.button.is-small.is-fullwidth(@click="userModal($store.state.dashboard.client.id, 'other')")
                  |追加する＋
</template>

<script>
export default {
  data () {
    return {
      list: true
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
    border: 1px solid #dbdbdb
    @include mediaQuery-down(sm)
      width: 700px
  thead
    th
      &:first-child
        width: 100px
      &:nth-child(2)
        width: 200px
        @include mediaQuery-down(sm)
          width: 150px
      &:nth-child(4)
        width: 140px
  tbody
    td
      padding: .9em .75em
      font-size: 1rem
      line-height: 1.2rem
  .button
    background-color: lightgray
  .inviting
    padding-right: 5px
</style>
