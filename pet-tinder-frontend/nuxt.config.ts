// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // This is the crucial part.
  // We are adding the Pinia module to the project.
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  // This tells Pinia where to find your store files
  pinia: {
    storesDirs: ['./store/**'],
  },

  // This part remains the same
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lobster&family=Nunito:wght@400;700&display=swap' }
      ]
    }
  },
  compatibilityDate: '2024-04-03'
})