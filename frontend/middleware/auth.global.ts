// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  // Verifica se estamos no lado do cliente antes de acessar o localStorage
  if (process.client) {
    const token = localStorage.getItem("authToken");

    // Verifica se a rota atual é pública
    if (to.path === "/login" || to.path === "/register") {
      return;
    }

    // Se o token não estiver presente, redireciona para a página de login
    if (!token) {
      return navigateTo("/login");
    }
  }
});
