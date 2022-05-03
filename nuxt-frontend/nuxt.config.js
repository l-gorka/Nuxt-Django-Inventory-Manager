import { RefreshController } from "@nuxtjs/auth-next";
import colors from 'vuetify/es5/util/colors';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  server: {
    host: '0.0.0.0',
    port: 3001
  },

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // titleTemplate: '%s - inventory-frontend',
    title: 'Pen stash',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://127.0.0.1:8000/',
    baseURL: 'https://inventory112.herokuapp.com/',
  },

  auth: {
    strategies: {
      local: {
        //scheme: 'token',
        token: {
          prefix: 'data',
          property: 'auth_token',
          type: 'Token',
          maxAge: 86400 * 30,
        },
        user: {
          prefix: 'data',
          property: 'username',
        },
        endpoints: {
          login: {
            url: '/auth/token/login/',
            method: 'post',
            propertyName: 'auth_token',
            //altProperty: 'refresh'
          },
          logout: {
            url: '/auth/token/logout/',
            method: 'post',
          },
          user: {
            url: '/user/me/',
            method: 'get',
          }
        }
      }
    },
    redirect: {
      login: '/',
      logout: '/login'
    },
  },
  // router: {
  //   middleware: ['auth']
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
