export const state = () => ({
  logedin: false
})

export const mutations = {
  setLogedIn (state) {
    state.logedin = true
  },
  setLogedOut (state) {
    state.logedin = false
  }
}
