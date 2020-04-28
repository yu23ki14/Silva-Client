export const state = () => ({
  requesting: false
})

export const mutations = {
  requesting (state) {
    state.requesting = true
  },
  responded (state) {
    state.requesting = false
  }
}
