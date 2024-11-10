<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">E-mail</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="input-field"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          class="input-field"
          required
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
import { useRouter } from "vue-router"; // Importa o router

const form = ref({
  email: "",
  password: "",
});

const errorMessage = ref("");
const successMessage = ref("");
const router = useRouter(); // Inicializa o router

const login = async () => {
  try {
    // Requisição para a API de login
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.value.email,
        password: form.value.password,
      }),
    });

    if (!response.ok) {
      // Exibe uma mensagem de erro específica se as credenciais forem inválidas
      if (response.status === 401) {
        errorMessage.value =
          "Credenciais inválidas. Por favor, tente novamente.";
      } else {
        errorMessage.value = "Erro ao fazer login. Tente novamente mais tarde.";
      }
      successMessage.value = "";
      return;
    }

    const result = await response.json();

    // Verifica se o token JWT foi retornado
    if (result.token) {
      // Armazena o token JWT no localStorage
      localStorage.setItem("authToken", result.token);
      successMessage.value = "Login realizado com sucesso!";
      errorMessage.value = "";

      // Redireciona para a rota inicial
      router.push("/");
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
.login-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form-group {
  margin-bottom: 1em;
}

.input-field {
  width: 93%;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  width: 100%;
  padding: 0.75em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

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
