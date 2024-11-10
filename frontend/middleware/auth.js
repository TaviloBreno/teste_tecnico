// middleware/auth.js
export default function ({ route, redirect }) {
  const isAuthenticated = localStorage.getItem("authToken");

  // Permite o acesso direto às rotas públicas
  if (route.path === "/login" || route.path === "/register") {
    return;
  }

  // Redireciona para login se o usuário não estiver autenticado
  if (!isAuthenticated) {
    return redirect("/login");
  }
}
