// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxt/eslint',
  ],
  primevue: {
    components: {
      exclude: ['Form', 'FormField'],
    },
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
    'assets/css/static.css',
    'primeflex/primeflex.css',
    'primeicons/primeicons.css',
  ],
})