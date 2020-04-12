export const state = () => ({
  solid: false,
  menuActive: false
})

export const mutations = {
  toSolidTrue (state) {
    state.solid = true
  },
  toSolidFalse (state) {
    state.solid = false
  },
  toggleMenuActive (state) {
    state.menuActive = !state.menuActive
  }
}

export const actions = {
  toSolidTrue (context) {
    context.commit('toSolidTrue')
  },
  toSolidFalse (context) {
    context.commit('toSolidFalse')
  },
  toggleMenuActive (context) {
    context.commit('toggleMenuActive')
  }
}
