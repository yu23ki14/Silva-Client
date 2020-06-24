require('dotenv').config();

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'silva',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'silvaは、診断未確定の発熱者や有症者を⽀援する在宅医療・介護従事者が、診療やケアを継続していくために必要な感染ステータスに関わる情報を瞬時に共有することで、チームの感染を防ぎ、地域での感染拡⼤防⽌を図ることをサポートします。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' }
    ]
  },
  env: {
    SILVA_API_URL: process.env.SILVA_API_URL,
    SCA_API_URL: process.env.SCA_API_URL
  },
  router: {
    middleware: ['reset_message', 'authenticate']
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    'nuxt-fontawesome'
  ],
  /*
  ** Global CSS
  */
  css: [
    '~/assets/stylesheets/reset.css',
    '~/assets/stylesheets/bulma.min.css',
    '~/assets/stylesheets/common.sass',
    '~/assets/stylesheets/modal.sass',
    '~/assets/stylesheets/table.sass',
    '~/assets/stylesheets/button.sass'
  ],

  styleResources: {
    sass: [
      '~assets/stylesheets/_variables.sass'
    ]
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/html_element',
    '~plugins/formatter',
    '~plugins/endpoint',
    {src: '~plugins/axios', ssr: false},
    { src: '~/plugins/vue_datepicker', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.SILVA_API_URL
  },
  /*
  ** Build configuration
  */
  build: {
  }
}
