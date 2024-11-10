<template>
  <div class="task-form-container">
    <!-- Título dinâmico que muda conforme o modo (edição ou criação) -->
    <h1>{{ isEditing ? "Editar Tarefa" : "Adicionar Nova Tarefa" }}</h1>
    <!-- Formulário de tarefa com ação de envio bloqueada pelo @submit.prevent -->
    <form @submit.prevent="handleSubmit" class="task-form">
      <div class="form-group">
        <label for="title">Título</label>
        <!-- Campo de entrada do título da tarefa, com v-model para ligação bidirecional -->
        <input
          type="text"
          id="title"
          v-model="taskData.title"
          required
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="description">Descrição</label>
        <!-- Campo de texto para a descrição da tarefa -->
        <textarea
          id="description"
          v-model="taskData.description"
          class="textarea-field"
        ></textarea>
      </div>
      <!-- Botão de submissão do formulário -->
      <button type="submit" class="save-button">Salvar</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Configuração das instâncias de rota e router para navegação e verificação de URL
const route = useRoute();
const router = useRouter();

// Estado para dados da tarefa; title e description são ligados aos campos do formulário
const taskData = ref({
  title: "",
  description: "",
});

// Verifica se estamos no modo de edição
const isEditing = ref(false);

// Função para buscar os dados de uma tarefa específica para edição
const fetchTaskData = async (taskId) => {
  try {
    // Requisição à API para obter os dados da tarefa pelo ID
    const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Autorização com token JWT
      },
    });
    if (response.ok) {
      taskData.value = await response.json(); // Preenche taskData com os dados retornados
    } else {
      console.error("Erro ao carregar a tarefa.");
    }
  } catch (error) {
    console.error("Erro ao carregar a tarefa:", error);
  }
};

// Função para criar uma nova tarefa ou atualizar uma existente
const handleSubmit = async () => {
  // Define a URL e o método de requisição com base no estado de edição
  const url = isEditing.value
    ? `http://localhost:8000/api/tasks/${route.query.id}`
    : "http://localhost:8000/api/tasks";
  const method = isEditing.value ? "PUT" : "POST";

  try {
    // Envia a requisição para criar ou atualizar a tarefa
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(taskData.value), // Converte os dados da tarefa para JSON
    });

    if (response.ok) {
      router.push("/tasks"); // Redireciona para a lista de tarefas após salvar
    } else {
      console.error("Erro ao salvar a tarefa.");
    }
  } catch (error) {
    console.error("Erro ao salvar a tarefa:", error);
  }
};

// Ao montar o componente, verifica se existe um ID na URL para determinar o modo de edição
onMounted(() => {
  if (route.query.id) {
    isEditing.value = true; // Define o estado como edição
    fetchTaskData(route.query.id); // Busca os dados da tarefa para edição
  }
});
</script>

<style scoped>
/* Container principal do formulário de tarefa */
.task-form-container {
  max-width: 600px;
  margin: 2em auto;
  padding: 2em;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Estilo do título dinâmico */
.task-form-container h1 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 1em;
  font-weight: bold;
}

/* Estilo do formulário */
.task-form {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

/* Grupos de formulário */
.form-group label {
  font-size: 1em;
  color: #555;
  margin-bottom: 0.5em;
  display: inline-block;
  font-weight: 600;
}

/* Campos de entrada */
.input-field,
.textarea-field {
  width: 94%;
  padding: 0.8em;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

/* Estilo de foco para campos de entrada */
.input-field:focus,
.textarea-field:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

/* Área de texto com ajuste de altura e redimensionamento vertical */
.textarea-field {
  height: 100px;
  resize: vertical;
}

/* Botão de salvar */
.save-button {
  background-color: #007bff;
  color: white;
  padding: 0.75em 1.5em;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Mudança de cor ao passar o mouse sobre o botão */
.save-button:hover {
  background-color: #0056b3;
}
</style>
