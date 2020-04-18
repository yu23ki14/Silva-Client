export default function ({ route, store, redirect }) {
  if (!process.server) {
    if (store.state.auth.logedin !== true) {
      if (route.path !== '/auth/login' && route.path !== '/auth/sign_up') {
        console.log(route.path)
        redirect('/auth/login')
      }
    } else if (route.path === '/auth/login' || route.path === '/auth/sign_up') {
      store.commit('message/setMessage', { message: 'ログイン済みです。' })
      redirect('/')
    }
  }
}
