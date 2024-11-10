# Projeto Backend - Sistema de Autenticação e CRUD de Tarefas

Este projeto é uma API backend construída com Laravel que implementa um sistema de autenticação usando JWT e um CRUD de tarefas. A API permite registrar e autenticar usuários, criar, listar, atualizar e excluir tarefas associadas ao usuário autenticado.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/) instalados no computador
- Conta no [GitHub](https://github.com/) para clonar o repositório
- [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar a API (opcional)

# Configure o projeto no .env

```bash
cp .env.example .env
```

## Tecnologias Usadas

- Laravel
- MySQL
- JWT para autenticação
- Docker e Docker Compose

## Endpoints Principais

### Autenticação

- **Registro de Usuário**: `POST /api/register`
  - Campos: `name`, `email`, `password`, `password_confirmation`

- **Login**: `POST /api/login`
  - Campos: `email`, `password`
  - Resposta: Token JWT para autenticação

- **Logout**: `POST /api/logout`
  - Requer Token JWT no cabeçalho `Authorization: Bearer <token>`

### CRUD de Tarefas

- **Criar Tarefa**: `POST /api/tasks`
  - Requer Token JWT no cabeçalho `Authorization: Bearer <token>`
  - Campos: `title`, `description` (opcional)

- **Listar Tarefas do Usuário Autenticado**: `GET /api/tasks`
  - Requer Token JWT no cabeçalho

- **Atualizar Tarefa**: `PUT /api/tasks/{id}`
  - Requer Token JWT no cabeçalho
  - Campos: `title`, `description` (opcional), `status`

- **Excluir Tarefa**: `DELETE /api/tasks/{id}`
  - Requer Token JWT no cabeçalho

## Testando com Insomnia ou Postman

Para testar os endpoints, você pode usar o Insomnia ou Postman:

1. **Registre** um usuário para obter o Token JWT.
2. **Faça login** com o usuário registrado e obtenha o token JWT.
3. Inclua o token JWT no cabeçalho `Authorization` para acessar os endpoints de tarefas.

## Contribuições

Este projeto foi desenvolvido para fins educacionais, mas contribuições são bem-vindas. Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está sob a licença MIT.

## Instalação e Configuração

### 1. Clone o Repositório

Primeiro, clone o repositório para o seu computador:

```bash
git clone https://github.com/TaviloBreno/teste_tecnico.git
```

### 2. Navegue até o diretório do backend:

```bash
cd teste_tecnico/backend
```

### 3. Execute o container do MySQL:

```bash
docker exec -it mysql_db bash
```

### 4. Execute as migrações:

```bash
php artisan migrate
```

### 5. Execute o seeder para criar o usuário admin:

```bash
php artisan db:seed --class=AdminUserSeeder
```
### 6. Usuário Admin

O seeder criará um usuário admin com as seguintes credenciais:

- **Email**: admin@example.com
- **Senha**: password123

Use essas credenciais para fazer login e testar a API.