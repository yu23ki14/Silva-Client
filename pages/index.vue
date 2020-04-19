<template lang="pug">
  .dashboard-container.columns.dashboard-column
    .dashboard-menu.dashboard-column.column.is-narrow
      .dashboard-menu-user-info
        p.subtitle.is-6
          |ログイン中
        p.dashboard-menu-user-name.title.is-4
          |{{user.name}}
        p.subtitle.is-6.dashboard-menu-link
          nuxt-link(to="/information")
            |ヘルプ・設定
      .dashboard-menu-clients-container
        ul.dashboard-menu-clients-legend
          li
            Client(:data="{grade: 'クラス', age: '年齢', gender: '性別', initial: '姓', address: '居住地', statuses: [{text: 'ステータス'}]}" :background="'#7a7a7a'")
        ul.dashboard-menu-clients
          li(v-for="(client, index) in $store.state.dashboard.clients" @click="getClient(client.id)")
            Client(:data="client" :background="client.id === $store.state.dashboard.client.id ? '#bbd4f5' : (index % 2 != 0 ? '#cacaca' : '#e8e8e8')")
      button.title.is-6.dashboard-menu-client-new(@click="clientModal")
        |患者を追加する＋
    .dashboard.dashboard-column.column
      DashboardHeader(v-on:updateAddModal="updateAddClient")
      .dashboard-main-container
        .dashboard-main-inner
          div(v-if="$store.state.dashboard.team != null")
            DashboardTeam
            DashboardStatusHistory
            DashboardActionHistory
          p.title.is-5(v-else-if="Object.keys($store.state.dashboard.clients).length > 0")
            |リストから詳細を見る患者を選択してください。
          p.title.is-5(v-else)
            |患者を追加する＋ボタンから患者を追加してください。
    AddUserModal
    AddClientModal(:data="add_client")
    AddStatusModal
    AddActionModal
    SetMyRoleModal
    InvitationModal(:data="invitations")
</template>

<script>
import Client from '../components/dashboard/client'
import DashboardHeader from '../components/dashboard/header'
import DashboardTeam from '../components/dashboard/team'
import DashboardStatusHistory from '../components/dashboard/status_history'
import DashboardActionHistory from '../components/dashboard/action_history'
import AddUserModal from '../components/dashboard/modal/add_user'
import AddClientModal from '../components/dashboard/modal/add_client'
import AddStatusModal from '../components/dashboard/modal/add_status'
import AddActionModal from '../components/dashboard/modal/add_action'
import SetMyRoleModal from '../components/dashboard/modal/set_my_role'
import InvitationModal from '../components/dashboard/modal/invitations'

export default {
  components: {
    Client,
    DashboardHeader,
    DashboardTeam,
    DashboardStatusHistory,
    DashboardActionHistory,
    AddUserModal,
    AddClientModal,
    AddStatusModal,
    AddActionModal,
    SetMyRoleModal,
    InvitationModal
  },
  data () {
    return {
      user: [],
      invitations: [],
      statuses: [],
      actions: [],
      add_client: {
        grade: null,
        age: null,
        gender: null,
        initial: null,
        address: null,
        underlying_illnesses: []
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      await this.$axios.get('/api/v1/dashboard')
        .then((res) => {
          this.user = res.data.user
          this.$store.commit('dashboard/setClients', { data: res.data.clients })
          this.invitations = res.data.invitations
          if (res.data.invitations.length > 0) {
            this.$store.commit('modal/toggleInvitations')
          }
        }).catch(() => {
          this.$store.commit('message/setMessage', { message: 'エラーが発生しました。ブラウザをリロードしてみてください。', messageType: 'danger' })
        })
    },
    async getClient (clientId) {
      await this.$axios.get('/api/v1/clients/' + clientId)
        .then((res) => {
          const team = res.data.team
          const client = res.data.client
          const statuses = res.data.statuses
          const actions = res.data.actions
          const tmpTeam = { care_manager: { user: {}, action: {} }, clinic: { user: {}, action: {} }, nurse: { user: {}, action: {} }, care: { user: {}, action: {} }, rehabilitation: { user: {}, action: {} }, medicine: { user: {}, action: {} }, day_service: { user: {}, action: {} }, dentistry: { user: {}, action: {} }, other: { user: {}, action: {} } }
          console.log(team)
          team.forEach(member =>
            (tmpTeam[member.role] = { user: member.user, action: member.action[0] || {} })
          )
          this.$store.commit('dashboard/setTeam', { data: tmpTeam })
          this.$store.commit('dashboard/setClient', { data: client })
          this.$store.commit('dashboard/setStatuses', { data: statuses })
          this.$store.commit('dashboard/setActions', { data: actions })
          if (team[0].role === null) {
            this.$store.commit('modal/toggleSetMyRole', { clientId: client.id })
          }
        }).catch(() => {
          this.$store.commit('message/setMessage', { message: 'エラーが発生しました。もう一度お試しください。', messageType: 'danger' })
        })
    },
    clientModal () {
      this.$store.commit('modal/toggleAddClient')
      this.add_client = {
        grade: null,
        age: null,
        gender: null,
        initial: null,
        address: null,
        underlying_illnesses: []
      }
    },
    updateAddClient () {
      this.add_client = { ...this.$store.state.dashboard.client }
    }
  }
}
</script>

<style lang="sass">
.dashboard-column
  padding: 0
  margin: 0

.dashboard-menu
  width: 250px
  height: 100vh
  border-right: 2px solid lightgrey
  background-color: #eaeaea

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
  height: calc( 100vh - 230px )
  overflow: auto
  li
    cursor: pointer

.dashboard-menu-client-new
  background-color: $brand-secondary
  display: block
  padding: 20px 0
  text-align: center
  color: white
  width: 100%
  border: none
  cursor: pointer

.dashboard-main-container
  height: calc( 100vh - 97px )
  padding: 20px 0 40px
  overflow: auto

.dashboard-main-inner
  width: 90%
  margin: 0px auto
</style>
