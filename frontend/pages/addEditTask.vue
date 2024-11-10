<template>
  <div class="task-form-container">
    <h1>{{ isEditing ? "Editar Tarefa" : "Adicionar Nova Tarefa" }}</h1>
    <form @submit.prevent="handleSubmit" class="task-form">
      <div class="form-group">
        <label for="title">Título</label>
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
        <textarea
          id="description"
          v-model="taskData.description"
          class="textarea-field"
        ></textarea>
      </div>
      <button type="submit" class="save-button">Salvar</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Configuração da rota e roteador
const route = useRoute();
const router = useRouter();

// Estado para dados da tarefa e verificação de edição
const taskData = ref({
  title: "",
  description: "",
});
const isEditing = ref(false);

// Função para buscar dados da tarefa para edição
const fetchTaskData = async (taskId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.ok) {
      taskData.value = await response.json();
    } else {
      console.error("Erro ao carregar a tarefa.");
    }
  } catch (error) {
    console.error("Erro ao carregar a tarefa:", error);
  }
};

// Função para criar ou atualizar a tarefa
const handleSubmit = async () => {
  const url = isEditing.value
    ? `http://localhost:8000/api/tasks/${route.query.id}`
    : "http://localhost:8000/api/tasks";
  const method = isEditing.value ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(taskData.value),
    });

    if (response.ok) {
      router.push("/tasks");
    } else {
      console.error("Erro ao salvar a tarefa.");
    }
  } catch (error) {
    console.error("Erro ao salvar a tarefa:", error);
  }
};

// Detecta se é uma edição e carrega dados da tarefa
onMounted(() => {
  if (route.query.id) {
    isEditing.value = true;
    fetchTaskData(route.query.id);
  }
});
</script>

<style scoped>
/* Container principal do formulário */
.task-form-container {
  max-width: 600px;
  margin: 2em auto;
  padding: 2em;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Estilo do título */
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

.input-field:focus,
.textarea-field:focus {
  border-color: #007bff;
  outline: none;
}

/* Área de texto */
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

.save-button:hover {
  background-color: #0056b3;
}

/* Efeito de foco para o campo de entrada */
.input-field:focus,
.textarea-field:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}
</style>
