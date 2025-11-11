# User Service

Microserviço de gerenciamento de usuários construído com Fastify, Drizzle ORM e PostgreSQL.

## Tecnologias

- **Node.js** v22
- **TypeScript** 5.9+
- **Fastify** 5.6 - Framework web
- **Drizzle ORM** - ORM SQL type-safe
- **PostgreSQL** 16 - Banco de dados
- **Vitest** - Framework de testes
- **Zod** - Validação de schemas
- **pnpm** - Gerenciador de pacotes

## Pré-requisitos

### Para execução local:
- Node.js v22 ou superior
- pnpm v10.14.0 ou superior
- PostgreSQL 16 instalado e rodando

### Para execução com Docker:
- Docker
- Docker Compose

## Instalação

### Opção 1: Execução Local

#### 1. Instale as dependências

```bash
pnpm install
```

#### 2. Configure as variáveis de ambiente

Copie o arquivo de exemplo e configure conforme necessário:

```bash
cp .env.exemple .env
```

**⚠️ IMPORTANTE:** Para execução local, certifique-se de que `POSTGRES_HOST` está configurado como `localhost`:

```env
PORT=3333
POSTGRES_PASSWORD='docker'
POSTGRES_PORT=5432
POSTGRES_HOST='localhost'  # ← DEVE ser localhost para execução local
POSTGRES_USER='docker'
POSTGRES_DB='user_db'
NODE_ENV='dev'
```

#### 3. Inicie o PostgreSQL

Certifique-se de que o PostgreSQL está rodando na sua máquina e crie o banco de dados:

```bash
# Exemplo usando psql
psql -U postgres
CREATE DATABASE user_db;
CREATE USER docker WITH PASSWORD 'docker';
GRANT ALL PRIVILEGES ON DATABASE user_db TO docker;
```

Ou use apenas o banco de dados do Docker Compose:

```bash
docker-compose up user_db -d
```

#### 4. Execute as migrations

```bash
pnpm migrate
```

#### 5. Inicie a aplicação em modo desenvolvimento

```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3333`

---

### Opção 2: Execução com Docker

#### 1. Configure as variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.exemple .env
```

**⚠️ IMPORTANTE:** Para execução com Docker, certifique-se de que `POSTGRES_HOST` está configurado como `user_db` (nome do serviço do banco de dados):

```env
PORT=3333
POSTGRES_PASSWORD='docker'
POSTGRES_PORT=5432
POSTGRES_HOST='user_db'  # ← DEVE ser user_db para execução com Docker
POSTGRES_USER='docker'
POSTGRES_DB='user_db'
NODE_ENV='dev'
```

#### 2. Inicie os containers

```bash
docker-compose up -d
```

Isso irá:
- Criar e iniciar o container do PostgreSQL (`user_db`)
- Criar e iniciar o container da aplicação (`api_user`)
- Executar automaticamente as migrations através do script [entrypoint.sh](entrypoint.sh)

#### 3. Verifique os logs

```bash
docker-compose logs -f app
```

A aplicação estará disponível em `http://localhost:3333`

#### 4. Parar os containers

```bash
docker-compose down
```

Para remover também os volumes (dados do banco):

```bash
docker-compose down -v
```

---

## Diferenças nas Variáveis de Ambiente

### 🔑 Variável Crítica: `POSTGRES_HOST`

A principal diferença entre execução local e Docker está na variável `POSTGRES_HOST`:

| Ambiente | POSTGRES_HOST | Motivo |
|----------|---------------|--------|
| **Local** | `localhost` | A aplicação roda diretamente na máquina e conecta ao PostgreSQL via localhost |
| **Docker** | `user_db` | A aplicação roda em container e usa a rede Docker para conectar ao container do banco |

### Arquivo [.env](.env) para execução LOCAL:
```env
POSTGRES_HOST='localhost'  # ← localhost para execução local
```

### Arquivo [.env](.env) para execução DOCKER:
```env
POSTGRES_HOST='user_db'  # ← user_db (nome do serviço) para Docker
```

## Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia em modo watch com hot-reload

# Build e produção
pnpm build           # Compila TypeScript para ESM
pnpm start           # Inicia aplicação compilada

# Testes
pnpm test            # Executa testes unitários
pnpm test:watch      # Testes unitários em modo watch
pnpm test:e2e        # Executa testes end-to-end
pnpm test:e2e:watch  # Testes e2e em modo watch
pnpm test:all        # Executa todos os testes

# Banco de dados
pnpm generate        # Gera migrations do Drizzle
pnpm migrate         # Executa migrations pendentes
```

## Documentação da API

Após iniciar a aplicação, a documentação Swagger estará disponível em:

```
http://localhost:3333/docs
```

## Estrutura do Projeto

```
user-service/
├── src/
│   └── infra/
│       └── http/
│           └── server.ts    # Entrada da aplicação
├── .env                     # Variáveis de ambiente (não versionado)
├── .env.exemple             # Exemplo de variáveis de ambiente
├── docker-compose.yml       # Orquestração dos containers
├── Dockerfile               # Imagem da aplicação
├── entrypoint.sh            # Script de inicialização Docker
└── package.json             # Dependências e scripts
```

## Healthcheck

O container do PostgreSQL possui healthcheck configurado que verifica a disponibilidade do banco antes de iniciar a aplicação.

O script [entrypoint.sh](entrypoint.sh) aguarda o PostgreSQL estar pronto e executa as migrations automaticamente.

## Troubleshooting

### Erro de conexão com o banco de dados

**Problema:** `ECONNREFUSED` ao tentar conectar ao PostgreSQL

**Solução:** Verifique se:
1. O PostgreSQL está rodando
2. A variável `POSTGRES_HOST` está correta para seu ambiente:
   - `localhost` para execução local
   - `user_db` para execução Docker
3. As credenciais no [.env](.env) estão corretas

### Migrations não executam

**Problema:** Erro ao executar `pnpm migrate`

**Solução:**
1. Verifique se o banco de dados existe
2. Verifique as permissões do usuário do PostgreSQL
3. Para Docker, as migrations são executadas automaticamente via [entrypoint.sh](entrypoint.sh)

### Porta 3333 ou 5432 já em uso

**Problema:** `EADDRINUSE` - porta já está sendo utilizada

**Solução:**
1. Pare outros serviços usando essas portas
2. Ou altere as portas no [.env](.env) e [docker-compose.yml](docker-compose.yml)

## Licença

ISC