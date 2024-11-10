<template>
  <div>
    <!-- Cabeçalho da aplicação (exibido apenas se não estiver na página de login) -->
    <header v-if="!isLoginPage">
      <h1>Minha Aplicação Nuxt</h1>
      <nav>
        <ul>
          <li><NuxtLink to="/">Início</NuxtLink></li>
          <li><NuxtLink to="/about">Sobre</NuxtLink></li>
          <li><NuxtLink to="/contact">Contato</NuxtLink></li>
        </ul>
      </nav>
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
import { useRoute } from "vue-router";

const route = useRoute();
const isLoginPage = route.path === "/login"; // Verifica se a rota atual é '/login'
</script>

<style>
/* Adicione estilos globais ou específicos para o layout principal */
header,
footer {
  background-color: #f0f0f0;
  padding: 1em;
  text-align: center;
}

main {
  padding: 2em;
}
</style>
