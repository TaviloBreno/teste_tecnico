// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    server: {
      hmr: {
        host: "localhost",
        port: 3000,
      },
      watch: {
        usePolling: true,
      },
    },
  },
});
