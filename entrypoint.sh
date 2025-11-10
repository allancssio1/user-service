#!/bin/sh
set -e

echo "Aguardando PostgreSQL estar pronto..."

# Aguarda o PostgreSQL estar disponível
until node -e "
const { Client } = require('pg');
const client = new Client({ connectionString: process.env.DATABASE_URL });
client.connect()
  .then(() => {
    console.log('PostgreSQL está pronto!');
    client.end();
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
" 2>/dev/null; do
  echo "PostgreSQL não está pronto ainda - aguardando..."
  sleep 2
done

echo "Executando migrations..."
pnpm db:migrate

echo "Iniciando aplicação..."
exec "$@"