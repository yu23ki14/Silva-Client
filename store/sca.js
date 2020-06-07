export const state = () => ({
  data: { client_id: null }
})

export const mutations = {
  setData (state, { clientId }) {
    state.data.client_id = clientId
  }
}
