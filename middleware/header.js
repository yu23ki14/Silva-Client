export default function ({ route, store }) {
  if (route.path === '/') {
    store.dispatch('header/toFalse')
  } else {
    store.dispatch('header/toTrue')
  }
}
