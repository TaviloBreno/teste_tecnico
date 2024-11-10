<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        // Valida os campos necessários
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Associa automaticamente o user_id do usuário autenticado
        $data['user_id'] = auth()->id();
        $data['status'] = 'pending'; // Define o status inicial da tarefa

        // Cria a tarefa com os dados validados e o user_id do usuário autenticado
        $task = Task::create($data);

        return response()->json($task, 201);
    }

    public function index()
    {
        // Retorna todas as tarefas do usuário autenticado
        return response()->json(auth()->user()->tasks);
    }

    public function show($id)
    {
        // Busca a tarefa do usuário autenticado pelo id
        $task = auth()->user()->tasks()->find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        // Busca a tarefa do usuário autenticado pelo id
        $task = auth()->user()->tasks()->find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        // Valida os campos necessários
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,completed',
        ]);

        // Atualiza a tarefa com os dados validados
        $task->update($data);

        return response()->json($task);
    }

    public function destroy($id)
    {
        // Busca a tarefa do usuário autenticado pelo id
        $task = auth()->user()->tasks()->find($id);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        // Deleta a tarefa
        $task->delete();

        return response()->json(['message' => 'Task deleted']);
    }
}
