#!/bin/sh
set -e

# Validação de variáveis de ambiente obrigatórias
echo "Validando configurações..."
if [ -z "$POSTGRES_HOST" ] || [ -z "$POSTGRES_PORT" ] || [ -z "$POSTGRES_USER" ] || [ -z "$POSTGRES_DB" ]; then
  echo "ERRO: Variáveis de ambiente do PostgreSQL não configuradas"
  echo "Necessário: POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_DB"
  exit 1
fi

echo "Aguardando PostgreSQL estar pronto..."
echo "Conectando em: $POSTGRES_HOST:$POSTGRES_PORT (database: $POSTGRES_DB)"

# Configurações de retry
MAX_RETRIES=30
RETRY_COUNT=0
SLEEP_TIME=2

# Aguarda o PostgreSQL estar disponível com timeout
until [ $RETRY_COUNT -ge $MAX_RETRIES ]; do
  RETRY_COUNT=$((RETRY_COUNT+1))

  # Tenta conectar usando pg_isready (mais leve) ou fallback para node
  if command -v pg_isready >/dev/null 2>&1; then
    if pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" >/dev/null 2>&1; then
      echo "PostgreSQL está pronto!"
      break
    fi
  else
    # Fallback para verificação com Node.js
    if node -e "
const { Client } = require('pg');
const client = new Client({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
});
client.connect()
  .then(() => {
    console.log('PostgreSQL está pronto!');
    client.end();
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
" 2>/dev/null; then
      break
    fi
  fi

  echo "PostgreSQL não está pronto ainda - tentativa $RETRY_COUNT/$MAX_RETRIES"

  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "ERRO: Timeout ao aguardar PostgreSQL ficar disponível após $((MAX_RETRIES * SLEEP_TIME)) segundos"
    exit 1
  fi

  sleep $SLEEP_TIME
done

echo "Executando migrations..."
if ! pnpm migrate; then
  echo "ERRO: Falha ao executar migrations"
  exit 1
fi
echo "Migrations executadas com sucesso!"

echo "Iniciando aplicação..."
exec "$@"