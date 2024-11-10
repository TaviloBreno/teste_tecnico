<template>
  <div>
    <!-- Cabeçalho da aplicação (exibido apenas se não estiver na página de login) -->
    <header v-if="!isLoginPage">
      <div class="header-content">
        <h1>Minha Aplicação Nuxt</h1>
        <nav>
          <ul>
            <li><NuxtLink to="/tasks">Tarefas</NuxtLink></li>
            <li>
              <button @click="logout" class="logout-button">Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Conteúdo dinâmico da página -->
    <main>
      <NuxtPage />
    </main>

    <!-- Rodapé da aplicação (exibido apenas se não estiver na página de login) -->
    <footer v-if="!isLoginPage">
      <p>© 2024 Minha Aplicação Nuxt. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();

// Verifica se a rota atual é a página de login
const isLoginPage = computed(() => route.path === "/login");

// Função de logout
const logout = () => {
  // Remove o token de autenticação
  localStorage.removeItem("authToken");

  // Redireciona para a página de login
  router.push("/login");
};
</script>

<style scoped>
* {
  border: 0;
  margin: 0;
  box-sizing: border-box;
}

header,
footer {
  background-color: #f0f0f0;
  padding: 1em;
  text-align: center;
  width: 100%;
  position: fixed;
  left: 0;
}

header {
  top: 0;
}

footer {
  bottom: 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 1em;
}

nav ul li {
  margin: 0;
}

nav ul li a {
  text-decoration: none;
  color: #007bff;
}

nav ul li a:hover {
  color: #0056b3;
}

.logout-button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.logout-button:hover {
  color: #0056b3;
}

main {
  padding: 5em 2em 3em; /* Ajuste o padding para evitar sobreposição */
}
</style>
