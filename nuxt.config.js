require('dotenv').config();

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Silva',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Travelers Hub is a tourist information center supported by locals. At the center, you can not only learn about popular tourist destinations, but also hidden gems that only locals know. We want to connect international visitors to the undiscovered parts of Japan, so that they can have an authentic cultural experience. We are awaiting your visit!' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' }
    ]
  },
  env: {
    API_URL: process.env.API_URL
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
    {src: 'bulma/bulma.sass', lang: 'sass'},
    '~/assets/stylesheets/reset.css',
    '~/assets/stylesheets/common.sass',
    '~/assets/stylesheets/modal.sass'
  ],

  styleResources: {
    sass: [
      '~assets/stylesheets/_variables.sass',
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
    {src: '~plugins/axios', ssr: false}
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
    baseURL: process.env.API_URL
  },
  /*
  ** Build configuration
  */
  build: {
  }
}
