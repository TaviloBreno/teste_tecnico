<template>
  <div>
    <!-- Cabeçalho da aplicação (exibido apenas se não estiver na página de login) -->
    <header v-if="!isLoginPage" class="header">
      <div class="header-content">
        <h1>Minha Aplicação Nuxt</h1>
        <nav>
          <ul>
            <!-- Link para a página de tarefas -->
            <li><NuxtLink to="/tasks">Tarefas</NuxtLink></li>
            <!-- Botão de logout, acionando a função handleLogout ao clicar -->
            <li>
              <button @click="handleLogout" class="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Conteúdo dinâmico da página, renderizado pelo Nuxt -->
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

// Configuração das variáveis de rota e router para navegação e verificação de rota
const route = useRoute();
const router = useRouter();

// Computed para verificar se a rota atual é a página de login
// O cabeçalho e o rodapé não são exibidos na página de login
const isLoginPage = computed(() => route.path === "/login");

// Função de logout
const handleLogout = () => {
  // Remove o token de autenticação do localStorage
  localStorage.removeItem("authToken");
  // Redireciona o usuário para a página de login
  router.push("/login");
};
</script>

<style scoped>
/* Reset básico para remover margens e padding padrão */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Estilo base para o cabeçalho e rodapé fixos */
.header,
.footer {
  background-color: #f0f0f0;
  padding: 1em;
  text-align: center;
  width: 100%;
  position: fixed;
  left: 0;
  z-index: 10; /* Garante que o cabeçalho e o rodapé estejam sempre sobrepostos */
}

.header {
  top: 0; /* Define o cabeçalho no topo da página */
}

.footer {
  bottom: 0; /* Define o rodapé na parte inferior da página */
}

/* Estilo do conteúdo do cabeçalho */
.header-content {
  max-width: 1200px; /* Centraliza o conteúdo em larguras maiores */
  margin: 0 auto;
  display: flex;
  justify-content: space-between; /* Espaça o título e a navegação */
  align-items: center;
}

/* Navegação no cabeçalho */
nav ul {
  list-style: none;
  display: flex;
  gap: 1em; /* Espaçamento entre itens de navegação */
}

nav ul li a {
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
  transition: color 0.3s ease; /* Transição suave para o hover */
}

nav ul li a:hover {
  color: #0056b3; /* Cor alterada ao passar o mouse */
}

/* Estilo do botão de logout */
.logout-button {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1em;
  transition: color 0.3s ease; /* Transição de cor para o hover */
}

.logout-button:hover {
  color: #0056b3; /* Cor alterada ao passar o mouse */
}

/* Estilo do conteúdo principal, compensando a altura do cabeçalho e rodapé fixos */
.main-content {
  padding: 5em 2em 3em; /* Compensação para evitar sobreposição com cabeçalho e rodapé */
  max-width: 1200px;
  margin: 0 auto;
}
</style>
