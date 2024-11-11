<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskAccessTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_requires_authentication_to_access_task_creation()
    {
        // Tenta acessar a rota de criação de tarefas sem autenticação
        $response = $this->postJson('/api/tasks', [
            'title' => 'New Task',
            'description' => 'Task description'
        ]);

        // Verifica se o acesso foi negado
        $response->assertStatus(401);
    }

    /** @test */
    public function it_allows_authenticated_user_to_create_task()
    {
        // Cria um usuário de teste
        $user = User::factory()->create();

        // Autentica o usuário e obtém um token
        $this->actingAs($user, 'api');

        // Tenta criar uma nova tarefa autenticado
        $response = $this->postJson('/api/tasks', [
            'title' => 'New Task',
            'description' => 'Task description'
        ]);

        // Verifica se a criação foi bem-sucedida
        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'New Task']);

        // Verifica se a tarefa foi criada no banco de dados
        $this->assertDatabaseHas('tasks', [
            'title' => 'New Task',
            'description' => 'Task description',
            'user_id' => $user->id,
        ]);
    }
}
