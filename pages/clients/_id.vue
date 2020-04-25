<template lang="pug">
  .dashboard-container.columns.dashboard-columns
    .dashboard-column.column.is-narrow
      DashboardMenu(v-on:toggleMenu="toggleMenu" v-on:clientModal="clientModal")
    .dashboard.dashboard-column.column.dashboard-main-container
      DashboardHeader(v-on:updateAddModal="setUpdateClientModal" v-on:toggleMenu="toggleMenu")
      DashboardMain
    AddUserModal
    AddClientModal(:data="add_client")
    AddStatusModal
    AddActionModal
    SetMyRoleModal
    InvitationModal(:data="invitations")
</template>

<script>
import DashboardHeader from '../../components/dashboard/header'
import DashboardMain from '../../components/dashboard/main'
import DashboardMenu from '../../components/dashboard/menu'
import AddUserModal from '../../components/dashboard/modal/add_user'
import AddClientModal from '../../components/dashboard/modal/add_client'
import AddStatusModal from '../../components/dashboard/modal/add_status'
import AddActionModal from '../../components/dashboard/modal/add_action'
import SetMyRoleModal from '../../components/dashboard/modal/set_my_role'
import InvitationModal from '../../components/dashboard/modal/invitations'

export default {
  components: {
    DashboardHeader,
    DashboardMain,
    DashboardMenu,
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
    getData () {
      if (this.$store.state.dashboard.user.name === undefined || Object.keys(this.$store.state.dashboard.clients).length < 1) {
        this.getMenuData()
        this.getClient()
      } else {
        this.getClient()
      }
    },
    async getMenuData () {
      await this.$axios.get('/api/v1/dashboard')
        .then((res) => {
          this.$store.commit('dashboard/setUser', { data: res.data.user })
          this.$store.commit('dashboard/setClients', { data: res.data.clients })
          this.invitations = res.data.invitations
          if (res.data.invitations.length > 0) {
            this.$store.commit('modal/toggleInvitations')
          }
        }).catch(() => {
          this.$store.commit('message/setMessage', { message: 'エラーが発生しました。ブラウザをリロードしてみてください。', messageType: 'danger' })
        })
    },
    async getClient () {
      await this.$axios.get('/api/v1/clients/' + this.$route.params.id)
        .then((res) => {
          const team = res.data.team
          const client = res.data.client
          const statuses = res.data.statuses
          const actions = res.data.actions
          const tmpTeam = { care_manager: { user: {}, action: {} }, clinic: { user: {}, action: {} }, nurse: { user: {}, action: {} }, care: { user: {}, action: {} }, rehabilitation: { user: {}, action: {} }, medicine: { user: {}, action: {} }, day_service: { user: {}, action: {} }, dentistry: { user: {}, action: {} }, other: { user: {}, action: {} } }
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
          this.toggleMenu()
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
    setUpdateClientModal () {
      this.add_client = { ...this.$store.state.dashboard.client }
    },
    toggleMenu () {
      this.isMenuActive = !this.isMenuActive
    }
  }
}
</script>

<style lang="sass">
.dashboard-container
  margin: 0
.dashboard-column
  padding: 0
  margin: 0
</style>
