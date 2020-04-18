export const state = () => ({
  message: null,
  message_type: 'info'
})

export const mutations = {
  setMessage (state, { message, messageType }) {
    if (messageType !== undefined) {
      state.message_type = messageType
    }
    state.message = message
  },
  removeMessage (state) {
    state.message = null
    state.message_type = 'info'
  }
}
