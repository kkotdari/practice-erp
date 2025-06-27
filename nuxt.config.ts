// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@nuxt/eslint',
  ],
  primevue: {
    components: {
      exclude: ['Form', 'FormField']
    }
  },
  components: {
    dirs: [
      {
        path: '~/components',
        extensions: [ 'vue' ],
        pathPrefix: false,
        prefix: 'My',
      },
    ],
  },
  css: [
    'primeflex/primeflex.css',
    'primeicons/primeicons.css',
  ]
})