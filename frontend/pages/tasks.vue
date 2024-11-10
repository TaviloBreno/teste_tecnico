<template>
  <div class="tasks-container">
    <h1>Minhas Tarefas</h1>
    <button @click="addTask" class="add-button">Adicionar Nova Tarefa</button>

    <table class="task-table">
      <thead>
        <tr>
          <th>Concluída</th>
          <th>Tarefa</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" class="task-row">
          <td>
            <input
              type="checkbox"
              v-model="task.completed"
              @change="toggleComplete(task)"
            />
          </td>
          <td :class="{ completed: task.completed }">{{ task.title }}</td>
          <td>
            <button @click="editTask(task)" class="edit-button">Editar</button>
            <button @click="deleteTask(task.id)" class="delete-button">
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="tasks.length === 0">Nenhuma tarefa encontrada.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const tasks = ref([]);
const router = useRouter();

const fetchTasks = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/tasks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.ok) {
      tasks.value = await response.json();
    } else {
      console.error("Erro ao carregar tarefas.");
    }
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
};

const addTask = () => {
  router.push("/addEditTask");
};

const editTask = (task) => {
  router.push({ path: "/addEditTask", query: { id: task.id } });
};

const deleteTask = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (response.ok) {
      tasks.value = tasks.value.filter((task) => task.id !== id);
    } else {
      console.error("Erro ao excluir a tarefa.");
    }
  } catch (error) {
    console.error("Erro ao excluir a tarefa:", error);
  }
};

const toggleComplete = async (task) => {
  try {
    const response = await fetch(`http://localhost:8000/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ completed: task.completed }),
    });
    if (!response.ok) {
      console.error("Erro ao atualizar a tarefa.");
    }
  } catch (error) {
    console.error("Erro ao atualizar a tarefa:", error);
  }
};

onMounted(fetchTasks);
</script>

<style scoped>
.tasks-container {
  max-width: 800px;
  margin: 0 auto;
}

.add-button {
  margin-bottom: 1em;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
}

.task-table th,
.task-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.task-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.task-table .completed {
  text-decoration: line-through;
  color: gray;
}

.edit-button,
.delete-button {
  margin: 0 5px;
}

.delete-button {
  color: #ff4d4d;
}

.delete-button:hover {
  color: #ff1a1a;
}
</style>
