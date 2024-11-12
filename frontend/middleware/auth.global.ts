// frontend/middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  // Verifica se estamos no lado do cliente antes de acessar o localStorage
  if (process.client) {
    const token = localStorage.getItem("authToken");

    // Verifica se a rota atual é pública
    if (to.path === "/login" || to.path === "/register") {
      return;
    }

    // Redireciona para a página de login se o token não estiver presente
    if (!token) {
      // Redireciona para a página de login para a rota raiz
      if (to.path === "/") {
        return navigateTo("/login");
      }
      
      // Redireciona para a página de login para outras rotas privadas
      return navigateTo("/login");
    }

    // Redireciona automaticamente `/` para `/login` se o usuário não estiver autenticado
    if (!token && to.path === "/") {
      return navigateTo("/login");
    }
  }
});