<template>
  <div class="login-container">
    <h1>Login</h1>
    <!-- Formulário de login com submit bloqueado por @submit.prevent para gerenciar o envio manualmente -->
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">E-mail</label>
        <!-- Campo de entrada para o e-mail, vinculado ao estado loginData.email -->
        <input
          type="email"
          id="email"
          v-model="loginData.email"
          required
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <!-- Campo de entrada para a senha, vinculado ao estado loginData.password -->
        <input
          type="password"
          id="password"
          v-model="loginData.password"
          required
          class="input-field"
        />
      </div>
      <!-- Botão para enviar o formulário de login -->
      <button type="submit" class="submit-button">Entrar</button>
    </form>
    <!-- Exibe mensagens de erro ou sucesso conforme o estado -->
    <p class="message error" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="message success" v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Estado de entrada do formulário de login e mensagens de feedback
const loginData = ref({
  email: "",
  password: "",
});

const errorMessage = ref(""); // Armazena a mensagem de erro, se houver
const successMessage = ref(""); // Armazena a mensagem de sucesso, se houver
const router = useRouter(); // Instância do router para redirecionamento

// Função para realizar o login e manipular a resposta da API
const handleLogin = async () => {
  try {
    // Envia uma requisição POST para a API de login com o e-mail e senha fornecidos
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginData.value.email,
        password: loginData.value.password,
      }),
    });

    // Lógica de tratamento para resposta com erro
    if (!response.ok) {
      // Verifica o status de erro; 401 indica credenciais inválidas
      errorMessage.value =
        response.status === 401
          ? "Credenciais inválidas. Por favor, tente novamente."
          : "Erro ao fazer login. Tente novamente mais tarde.";
      successMessage.value = ""; // Limpa qualquer mensagem de sucesso anterior
      return;
    }

    // Converte a resposta da API para JSON
    const result = await response.json();

    // Se a resposta inclui um token JWT, armazena-o no localStorage
    if (result.token) {
      localStorage.setItem("authToken", result.token); // Salva o token de autenticação
      successMessage.value = "Login realizado com sucesso!";
      errorMessage.value = ""; // Limpa qualquer mensagem de erro anterior
      router.push("/tasks"); // Redireciona o usuário para a página de tarefas após o login bem-sucedido
    } else {
      // Caso o token não seja recebido, exibe um erro de autenticação
      errorMessage.value = "Erro ao receber o token de autenticação.";
      successMessage.value = "";
    }
  } catch (error) {
    // Captura e exibe qualquer erro na tentativa de login
    errorMessage.value = error.message || "Erro ao fazer login.";
    successMessage.value = "";
  }
};
</script>

<style scoped>
/* Estilização do container do formulário de login */
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Estilo do título */
.login-container h1 {
  text-align: center;
  margin-bottom: 1.5em;
  color: #333;
  font-size: 1.8em;
}

/* Estilo para os grupos de formulário */
.form-group {
  margin-bottom: 1em;
}

/* Estilo para campos de entrada */
.input-field {
  width: 91%;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

/* Estilo para o botão de envio */
.submit-button {
  width: 100%;
  padding: 0.75em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3; /* Cor ao passar o mouse no botão */
}

/* Estilos para mensagens de erro e sucesso */
.message {
  margin-top: 1em;
  text-align: center;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>
