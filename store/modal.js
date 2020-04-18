export const state = () => ({
  add_user: { display: false, client_id: null, role: null },
  add_client: { display: false },
  add_status: { display: false, client_id: null },
  add_action: { display: false, client_id: null },
  set_my_role: { display: false, client_id: null }
})

export const mutations = {
  toggleAddUser (state, { clientId, role }) {
    state.add_user.display = !state.add_user.display
    state.add_user.client_id = clientId
    state.add_user.role = role
  },
  toggleAddClient (state) {
    state.add_client.display = !state.add_client.display
  },
  toggleAddStatus (state, { clientId }) {
    state.add_status.display = !state.add_status.display
    state.add_status.client_id = clientId
  },
  toggleAddAction (state, { clientId }) {
    state.add_action.display = !state.add_action.display
    state.add_action.client_id = clientId
  },
  toggleSetMyRole (state, { clientId }) {
    state.set_my_role.display = !state.set_my_role.display
    state.set_my_role.client_id = clientId
  }
}
