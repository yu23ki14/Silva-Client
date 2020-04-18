export const state = () => ({
  clients: [],
  team: null,
  client: {},
  statuses: [],
  actions: []
})

export const mutations = {
  setClients (state, { data }) {
    state.clients = data
  },
  updateClients (state, { data }) {
    state.clients = { ...state.clients, [data.id]: data }
  },
  updateClientStatus (state, { data }) {
    state.clients[data.client_id].statuses = [ ...state.clients[data.client_id].statuses, data ]
  },
  setTeam (state, { data }) {
    state.team = data
  },
  updateTeamRole (state, { data }) {
    state.team[data.role].user = data.user
  },
  updateTeamAction (state, { data }) {
    state.team[data.role].action = data
  },
  setClient (state, { data }) {
    state.client = data
  },
  setStatuses (state, { data }) {
    state.statuses = data
  },
  updateStatuses (state, { data }) {
    state.statuses = [ data, ...state.statuses ]
  },
  setActions (state, { data }) {
    state.actions = data
  }
}
