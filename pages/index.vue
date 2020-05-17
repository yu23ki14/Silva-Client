<template lang="pug">
  .dashboard-container.columns.dashboard-columns(:class="{'is-menu-active': isMenuActive}")
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
import DashboardHeader from '../components/dashboard/header'
import DashboardMain from '../components/dashboard/main'
import DashboardMenu from '../components/dashboard/menu'
import AddUserModal from '../components/dashboard/modal/add_user'
import AddClientModal from '../components/dashboard/modal/add_client'
import AddStatusModal from '../components/dashboard/modal/add_status'
import AddActionModal from '../components/dashboard/modal/add_action'
import SetMyRoleModal from '../components/dashboard/modal/set_my_role'
import InvitationModal from '../components/dashboard/modal/invitations'

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
      isMenuActive: true,
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
      if (this.$store.state.dashboard.user.name === undefined || Object.keys(this.$store.state.dashboard.clients).length < 1) {
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
      }
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
  margin: 0 !important
.dashboard-main-container
  .is-menu-active &
    @include mediaQuery-down(sm)
      display: none
.dashboard-column
  padding: 0
  margin: 0
</style>
