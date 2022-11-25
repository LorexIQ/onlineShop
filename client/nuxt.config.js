export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  server: {
    port: 3009
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/googleFonts/css/fonts.css',
    '@assets/styles/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/globalComponents.js',
    '@plugins/fontawesome.js',
    '@plugins/eventBus.js',
    '@plugins/fileManager.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
    'ctoast'
  ],

  proxy: {
    '/api/': { target: process.env.API_URL ? process.env.API_URL : 'http://localhost:3000'  }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL
  },
  layoutTransition: {
    name: 'page-transition'
  },
  pageTransition: {
    name: 'page-transition'
  },

  auth: {
    proxy: true,
    redirect: {
      login: false,
      logout: '/auth'
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          maxAge: 60 * 60 * 24
        },
        user: {
          property: ''
        },
        endpoints: {
          login: {
            url: '/api/auth/signin',
            method: 'post'
          },
          logout: false,
          user: {
            url: '/api/users/me',
            method: 'get'
          }
        },
        tokenType: 'Bearer',
        tokenName: 'Authorization',
        autoFetchUser: false
      }
    }
  },

  googleFonts: {
    download: true,
    outputDir: '~assets/googleFonts',
    fontsPath: '~assets/googleFonts/fonts',
    families: {
      Roboto: [100, 300, 400, 500, 700, 900],
      Saira: [700]
    }
  },

  // router: {
  //   middleware: 'auth'
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  buildModules: [
    '@nuxtjs/google-fonts'
  ]
}
