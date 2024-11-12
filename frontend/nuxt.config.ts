// frontend/nuxt.config.ts
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
  router: {
    middleware: ["auth"],
  },
});