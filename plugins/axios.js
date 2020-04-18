export default function ({ $axios, store, route, redirect }) {
  $axios.onRequest((config) => {
    config.headers.client = window.localStorage.getItem('client')
    config.headers['access-token'] = window.localStorage.getItem('access-token')
    config.headers.uid = window.localStorage.getItem('uid')
    config.headers['token-type'] = window.localStorage.getItem('token-type')
  })

  $axios.onResponse((response) => {
    if (response.headers.client) {
      localStorage.setItem('access-token', response.headers['access-token'])
      localStorage.setItem('client', response.headers.client)
      localStorage.setItem('uid', response.headers.uid)
      localStorage.setItem('token-type', response.headers['token-type'])
    }
  })

  if (localStorage.getItem('access-token') !== null) {
    $axios.get('/api/v1/auth/validate_token')
      .then(() => {
        if (route.path !== '/auth/login' && route.path !== '/auth/sign_up') {
          store.commit('auth/setLogedIn')
        } else {
          store.commit('auth/setLogedIn')
          store.commit('message/setMessage', { message: 'ログイン済みです。' })
          redirect('/')
        }
      })
      .catch(() => {
        localStorage.removeItem('access-token')
        localStorage.removeItem('client')
        localStorage.removeItem('uid')
        localStorage.removeItem('token-type')
        store.commit('auth/setLogedOut')
        store.commit('message/setMessage', { message: 'ログインしてください。' })
        window.location.href = ('/auth/login')
      })
  } else if (route.path !== '/auth/login' && route.path !== '/auth/sign_up') {
    window.location.href = ('/auth/login')
  }
}
