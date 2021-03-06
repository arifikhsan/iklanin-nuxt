import axios from 'axios'
require('dotenv').config()

export default {
  // mode: 'universal',
  // target: 'static',
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
        content: 'arif.ikhsanudin.id@gmail.com',
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
  plugins: ['~/plugins/typeface.js', '~/plugins/social-share.js'],
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
    '@nuxtjs/apollo',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    // '@nuxtjs/sitemap',
    'vue-social-sharing/nuxt',
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
    transpile: ['typeface-inter', 'typeface-metropolis'],
  },
  server: {
    port: process.env.PORT || 8000,
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
  // sitemap: {
  //   hostname: process.env.FRONTEND_BASE_URL,
  //   routes: async () => {
  //     const res = await axios.get(`${process.env.REST_URL}v1/items/sitemap`)
  //     return res.data.data.map((item) => `/item/${item.slug}`)
  //   },
  // },
}
