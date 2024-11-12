# Projeto Backend - Sistema de Autenticação e CRUD de Tarefas

Este projeto é uma API backend construída com Laravel que implementa um sistema de autenticação usando JWT e um CRUD de tarefas. A API permite registrar e autenticar usuários, criar, listar, atualizar e excluir tarefas associadas ao usuário autenticado.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/) instalados no computador
- Conta no [GitHub](https://github.com/) para clonar o repositório
- [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar a API (opcional)

## Tecnologias Usadas

- Laravel
- MySQL
- JWT para autenticação
- Docker e Docker Compose

---

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
### 3. Configure o Arquivo .env
Crie o arquivo .env com base no exemplo:

```bash
cp .env.example .env
```
### 4. No arquivo .env, configure as seguintes variáveis de ambiente para conexão com o banco de dados:

```bash
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=todo_db
DB_USERNAME=root
DB_PASSWORD=root
```
Nota: Esses valores devem coincidir com os definidos no docker-compose.yml para o banco de dados MySQL.

### 5. Inicialize o Ambiente com Docker Compose
Use o Docker Compose para criar e iniciar os containers (Laravel, MySQL, etc.):

```bash
docker-compose up -d
```

### 6. Instale as Dependências do Composer no Container Laravel
Entre no container do backend Laravel e instale as dependências:

```bash
docker exec -it laravel_backend bash
composer install
```

### 7. Gere a Chave JWT para Autenticação
Ainda dentro do container, execute o seguinte comando para gerar a chave JWT:

```bash
php artisan jwt:secret
```
### 7.1. Criação do Banco de Dados

Entre no container do MySQL para criar o banco de dados `todo_db`:

```bash
docker exec -it mysql_db mysql -u root -p
```

Digite a senha `root` quando solicitado e, em seguida, execute o comando SQL para criar o banco de dados:

```sql
CREATE DATABASE todo_db;
```

### 8. Execute as Migrações e os Seeders
Execute as migrações para criar as tabelas e o seeder para criar um usuário admin:

```bash
php artisan migrate
php artisan db:seed --class=AdminUserSeeder
```
### 9. Verificar o Usuário Admin
O seeder criará um usuário admin com as seguintes credenciais:

```bash
Email: admin@example.com
Senha: password123
```
Use essas credenciais para fazer login e testar a API.

### Acesso a URL

Obs.: Ao acessar a url http://localhost:3000 adicionar http://localhost:3000/login na url

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
  - Requer Token JWT no cabeçalho `Authorization: Bearer <token>`

- **Atualizar Tarefa**: `PUT /api/tasks/{id}`
  - Requer Token JWT no cabeçalho `Authorization: Bearer <token>`
  - Campos: `title`, `description` (opcional), `status`

- **Excluir Tarefa**: `DELETE /api/tasks/{id}`
  - Requer Token JWT no cabeçalho `Authorization: Bearer <token>`

### Testando com Insomnia ou Postman

Para testar os endpoints, você pode usar o Insomnia ou Postman:

1. Através do usuário admin faça o login para obter o Token JWT.
2. Faça login com o usuário registrado e obtenha o token JWT.
3. Inclua o token JWT no cabeçalho `Authorization` para acessar os endpoints de tarefas.

### Rodando Testes

Para executar os testes com PestPHP, execute o comando abaixo dentro do container Laravel:

```bash
./vendor/bin/pest
```

# Projeto Front-end: Sistema de Autenticação e CRUD de Tarefas

Este projeto é uma aplicação front-end desenvolvida em Vue.js que implementa um sistema de autenticação de usuários e operações CRUD (Criar, Ler, Atualizar e Deletar) para gerenciamento de tarefas.

## Requisitos

Antes de iniciar, certifique-se de ter instalado em seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)
- [Git](https://git-scm.com/) para clonar o repositório

### 1. Navegar até o Diretório do Projeto
Entre no diretório do projeto clonado:

```bash
cd teste_tecnico/frontend
```
### 2. Entrar no Container Docker

Para executar comandos dentro do container do frontend, entre no container usando o seguinte comando:

```bash
docker exec -it nuxt_frontend /bin/sh
```

### 3. Instalar as Dependências
Instale todas as dependências do projeto usando o comando abaixo:

```bash
npm install
```

### 4. Configurar Variáveis de Ambiente (se necessário)
Se o projeto requer variáveis de ambiente para configurar a API de backend, crie um arquivo .env na raiz do projeto e defina as variáveis conforme necessário. Exemplo:

```plaintext
VUE_APP_API_URL=http://localhost:8000/api
```

Verifique se o backend está configurado para rodar localmente e conectá-lo ao frontend.

### 5. Executar o Servidor de Desenvolvimento
Para iniciar o servidor de desenvolvimento e visualizar o projeto em seu navegador:

```bash
npm run serve
```

O projeto estará disponível em http://localhost:8080.

### Executando os Testes
Para rodar os testes unitários utilizando o Jest, execute:

```bash
npm run test:unit
```

Certifique-se de que os testes estejam configurados corretamente no arquivo jest.config.js.

### Estrutura do Projeto
A estrutura de diretórios e arquivos principais do projeto é a seguinte:

```plaintext
teste_tecnico/
├── src/
│   ├── components/
│   ├── views/
│   ├── App.vue
│   └── main.js
├── tests/
│   └── unit/
│       └── exemplo.spec.js
├── package.json
├── jest.config.js
└── README.md
```

### API Endpoints

#### Autenticação

- **Login**: `POST /api/login`
  - Campos: `email`, `password`

- **Registro**: `POST /api/register`
  - Campos: `username`, `email`, `password`, `confirmPassword`

- **Logout**: `POST /api/logout`
  - Requer Token JWT no cabeçalho `Authorization: Bearer <token>`

#### CRUD de Tarefas

- **Criar Tarefa**: `POST /api/tasks`
  - Requer Token JWT no cabeçalho `Authorization: Bearer <token>`
  - Campos: `title`, `description` (opcional)

- **Listar Tarefas do Usuário Autenticado**: `GET /api/tasks`
  - Requer Token JWT no cabeçalho `Authorization: Bearer <token>`

- **Editar Tarefa**: `PUT /api/tasks/{id}`
  - Requer Token JWT no cabeçalho `Authorization: Bearer <token>`
  - Campos: `title`, `description` (opcional)

- **Excluir Tarefa**: `DELETE /api/tasks/{id}`
  - Requer Token JWT no cabeçalho `Authorization: Bearer <token>`

### Tecnologias Utilizadas

- Vue.js 3
- Jest
- Vue Test Utils
