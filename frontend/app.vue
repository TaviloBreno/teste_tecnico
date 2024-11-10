<template>
  <div>
    <!-- Cabeçalho da aplicação (exibido apenas se não estiver na página de login) -->
    <header v-if="!isLoginPage" class="header">
      <div class="header-content">
        <h1>Minha Aplicação Nuxt</h1>
        <nav>
          <ul>
            <li><NuxtLink to="/tasks">Tarefas</NuxtLink></li>
            <li>
              <button @click="handleLogout" class="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Conteúdo dinâmico da página -->
    <main class="main-content">
      <NuxtPage />
    </main>

    <!-- Rodapé da aplicação (exibido apenas se não estiver na página de login) -->
    <footer v-if="!isLoginPage" class="footer">
      <p>© 2024 Minha Aplicação Nuxt. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

// Configuração de rota e router
const route = useRoute();
const router = useRouter();

// Computed para verificar se a rota atual é a página de login
const isLoginPage = computed(() => route.path === "/login");

// Função de logout
const handleLogout = () => {
  localStorage.removeItem("authToken"); // Remove o token de autenticação
  router.push("/login"); // Redireciona para a página de login
};
</script>

<style scoped>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Cabeçalho e rodapé fixos */
.header,
.footer {
  background-color: #f0f0f0;
  padding: 1em;
  text-align: center;
  width: 100%;
  position: fixed;
  left: 0;
  z-index: 10;
}

.header {
  top: 0;
}

.footer {
  bottom: 0;
}

/* Estilo do conteúdo do cabeçalho */
.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Navegação */
nav ul {
  list-style: none;
  display: flex;
  gap: 1em;
}

nav ul li a {
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #0056b3;
}

/* Botão de logout */
.logout-button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1em;
  transition: color 0.3s ease;
}

.logout-button:hover {
  color: #0056b3;
}

/* Conteúdo principal */
.main-content {
  padding: 5em 2em 3em; /* Compensação para cabeçalho e rodapé fixos */
  max-width: 1200px;
  margin: 0 auto;
}
</style>
