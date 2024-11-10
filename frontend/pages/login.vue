<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">E-mail</label>
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
        <input
          type="password"
          id="password"
          v-model="loginData.password"
          required
          class="input-field"
        />
      </div>
      <button type="submit" class="submit-button">Entrar</button>
    </form>
    <p class="message error" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="message success" v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Estado do formulário e mensagens de feedback
const loginData = ref({
  email: "",
  password: "",
});

const errorMessage = ref("");
const successMessage = ref("");
const router = useRouter();

// Função para realizar o login
const handleLogin = async () => {
  try {
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

    if (!response.ok) {
      errorMessage.value =
        response.status === 401
          ? "Credenciais inválidas. Por favor, tente novamente."
          : "Erro ao fazer login. Tente novamente mais tarde.";
      successMessage.value = "";
      return;
    }

    const result = await response.json();

    if (result.token) {
      localStorage.setItem("authToken", result.token);
      successMessage.value = "Login realizado com sucesso!";
      errorMessage.value = "";
      router.push("/tasks");
    } else {
      errorMessage.value = "Erro ao receber o token de autenticação.";
      successMessage.value = "";
    }
  } catch (error) {
    errorMessage.value = error.message || "Erro ao fazer login.";
    successMessage.value = "";
  }
};
</script>

<style scoped>
/* Container do formulário de login */
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

/* Título */
.login-container h1 {
  text-align: center;
  margin-bottom: 1.5em;
  color: #333;
  font-size: 1.8em;
}

/* Grupo de formulário */
.form-group {
  margin-bottom: 1em;
}

/* Campos de entrada */
.input-field {
  width: 91%;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

/* Botão de envio */
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
