export default function ({ store }) {
  if (!process.server) {
    store.commit('message/setMessage', { message: null })
  }
}
