<template>
  <div>
    <!-- Cabeçalho da aplicação -->
    <header>
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

    <!-- Rodapé da aplicação -->
    <footer>
      <p>© 2024 Minha Aplicação Nuxt. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<script setup>
// Aqui você pode definir configurações adicionais, como variáveis e importações globais
</script>

<style>
/* Adicione estilos globais ou específicos para o layout principal */
header, footer {
  background-color: #f0f0f0;
  padding: 1em;
  text-align: center;
}

main {
  padding: 2em;
}
</style>
