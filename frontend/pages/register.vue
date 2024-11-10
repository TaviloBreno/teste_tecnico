<template>
  <div class="register-container">
    <h1>Registro</h1>
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label for="username">Nome de Usuário</label>
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
        <input
          type="password"
          id="confirmPassword"
          v-model="registrationData.confirmPassword"
          class="input-field"
          required
        />
      </div>
      <button type="submit" class="submit-button">Cadastrar</button>
    </form>
    <p class="message error" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="message success" v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Dados do formulário e mensagens de feedback
const registrationData = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errorMessage = ref("");
const successMessage = ref("");

// Função de registro
const handleRegister = async () => {
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

    if (!response.ok) {
      // Verifica o status da resposta e exibe mensagens de erro específicas
      if (response.status === 400) {
        errorMessage.value =
          "Dados inválidos. Verifique as informações e tente novamente.";
      } else if (response.status === 409) {
        errorMessage.value = "O e-mail ou nome de usuário já estão em uso.";
      } else {
        errorMessage.value = "Erro ao registrar. Tente novamente mais tarde.";
      }
      successMessage.value = "";
      return;
    }

    const result = await response.json();
    successMessage.value = "Usuário registrado com sucesso!";
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value = error.message || "Erro ao registrar o usuário.";
    successMessage.value = "";
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

/* Título */
.register-container h1 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 1em;
}

/* Grupo de formulário */
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

/* Botão de cadastro */
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
