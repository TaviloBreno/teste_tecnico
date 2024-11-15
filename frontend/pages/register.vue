<template>
  <div class="register-container">
    <h1>Registro</h1>
    <!-- Formulário de registro com envio bloqueado por @submit.prevent para controle manual -->
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="username">Nome de Usuário</label>
        <!-- Campo de entrada para nome de usuário, ligado a registrationData.username -->
        <input
          type="text"
          id="username"
          v-model="registrationData.username"
          class="input-field"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <!-- Campo de entrada para o e-mail, ligado a registrationData.email -->
        <input
          type="email"
          id="email"
          v-model="registrationData.email"
          class="input-field"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <!-- Campo de entrada para a senha, ligado a registrationData.password -->
        <input
          type="password"
          id="password"
          v-model="registrationData.password"
          class="input-field"
          required
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirme a Senha</label>
        <!-- Campo de entrada para confirmação de senha, ligado a registrationData.confirmPassword -->
        <input
          type="password"
          id="confirmPassword"
          v-model="registrationData.confirmPassword"
          class="input-field"
          required
        />
      </div>
      <!-- Botão de envio do formulário -->
      <button type="submit" class="submit-button">Cadastrar</button>
    </form>
    <!-- Exibe mensagens de erro ou sucesso conforme o estado -->
    <p class="message error" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="message success" v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Estado dos dados do formulário e mensagens de feedback
const registrationData = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errorMessage = ref(""); // Armazena a mensagem de erro
const successMessage = ref(""); // Armazena a mensagem de sucesso

// Função para manipular o registro
const handleRegister = async () => {
  // Verifica se as senhas coincidem antes de enviar a requisição
  if (
    registrationData.value.password !== registrationData.value.confirmPassword
  ) {
    errorMessage.value = "As senhas não coincidem.";
    successMessage.value = "";
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registrationData.value.username,
        email: registrationData.value.email,
        password: registrationData.value.password,
      }),
    });

    // Verifica se a resposta não foi bem-sucedida
    if (!response.ok) {
      // Status 400 indica dados inválidos ou campo obrigatório ausente
      if (response.status === 400) {
        errorMessage.value =
          "Dados inválidos. Verifique as informações e tente novamente.";
      }
      // Status 409 indica conflito (por exemplo, email ou nome de usuário já em uso)
      else if (response.status === 409) {
        errorMessage.value = "O e-mail ou nome de usuário já estão em uso.";
      }
      // Outros erros de servidor
      else if (response.status >= 500) {
        errorMessage.value = "Erro no servidor. Tente novamente mais tarde.";
      }
      // Outros erros
      else {
        errorMessage.value = "Erro ao registrar. Tente novamente.";
      }
      successMessage.value = ""; // Limpa a mensagem de sucesso, se houver
      return;
    }

    // Converte a resposta para JSON e exibe mensagem de sucesso
    const result = await response.json();
    successMessage.value = "Usuário registrado com sucesso!";
    errorMessage.value = ""; // Limpa qualquer mensagem de erro

    // Redirecionamento ou outra ação pode ser feita aqui
    // Exemplo: router.push("/login");
  } catch (error) {
    // Trata erros de rede ou conexão
    errorMessage.value =
      "Erro de conexão com o servidor. Verifique sua internet.";
    successMessage.value = "";
  } finally {
    // Limpa mensagens após 5 segundos, se necessário
    setTimeout(() => {
      errorMessage.value = "";
      successMessage.value = "";
    }, 5000);
  }
};
</script>

<style scoped>
/* Container principal do formulário de registro */
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Título do formulário */
.register-container h1 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 1em;
}

/* Estilo dos grupos de formulário */
.form-group label {
  font-size: 1em;
  color: #555;
  margin-bottom: 0.5em;
  display: inline-block;
  font-weight: 600;
}

/* Campos de entrada */
.input-field {
  width: 100%;
  padding: 0.75em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Botão de envio */
.submit-button {
  width: 100%;
  padding: 0.75em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

/* Mensagens de feedback */
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
