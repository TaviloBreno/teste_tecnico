<template>
  <div class="task-form-container">
    <h1>{{ isEditing ? "Editar Tarefa" : "Adicionar Nova Tarefa" }}</h1>
    <form @submit.prevent="saveTask" class="task-form">
      <div class="form-group">
        <label for="title">Título</label>
        <input
          type="text"
          id="title"
          v-model="task.title"
          required
          class="input-field"
        />
      </div>
      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea
          id="description"
          v-model="task.description"
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

const route = useRoute();
const router = useRouter();
const task = ref({
  title: "",
  description: "",
});
const isEditing = ref(false);

const fetchTask = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.ok) {
      task.value = await response.json();
    } else {
      console.error("Erro ao carregar tarefa.");
    }
  } catch (error) {
    console.error("Erro ao carregar tarefa:", error);
  }
};

const saveTask = async () => {
  try {
    const url = isEditing.value
      ? `http://localhost:8000/api/tasks/${route.query.id}`
      : "http://localhost:8000/api/tasks";
    const method = isEditing.value ? "PUT" : "POST";
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(task.value),
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

// Verifica se estamos editando uma tarefa existente
onMounted(() => {
  if (route.query.id) {
    isEditing.value = true;
    fetchTask(route.query.id);
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
