export const state = () => ({
  user: {},
  clients: {},
  team: null,
  client: {},
  statuses: [],
  actions: []
})

export const mutations = {
  setUser (state, { data }) {
    state.user = data
  },
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
  removeStatus (state, data) {
    const n = [...state.statuses]
    const x = n.splice(data, 1)
    console.log(x)
    console.log(n)
    state.statuses = n
  },
  setActions (state, { data }) {
    state.actions = data
  },
  removeAction (state, data) {
    const n = [...state.actions]
    n.splice(data, 1)
    state.actions = n
  }
}
