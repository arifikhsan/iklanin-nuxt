import axios from 'axios'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        hid: 'dicoding:email',
        name: 'dicoding:email',
        content: 'arif.ikhsanudin.developer@gmail.com',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#4299e1' }, // blue-500
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    'nuxt-webfontloader',
    '@nuxtjs/apollo',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    '@nuxtjs/sitemap',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.REST_URL,
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  webfontloader: {
    google: {
      families: [
        'Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap',
      ],
    },
  },
  server: {
    port: 8000,
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL,
      },
    },
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'access_token' },
          logout: { url: 'logout', method: 'delete' },
          user: { url: 'user', method: 'get', propertyName: 'user' },
        },
        // tokenRequired: true,
        tokenType: 'Bearer',
        // globalToken: true,
        // autoFetchUser: true
      },
    },
  },
  moment: {
    defaultLocale: 'id',
    locales: ['id'],
  },
  sitemap: {
    hostname: process.env.BASE_URL,
    routes: async () => {
      const res = await axios.get(`${process.env.REST_URL}v1/items/sitemap`)
      return res.data.data.map((item) => `/item/${item.slug}`)
    },
  },
}
