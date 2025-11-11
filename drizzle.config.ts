import { defineConfig } from 'drizzle-kit'
import { env } from './src/infra/config/env'

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './src/infra/database/drizzle/schemas/**.ts',
  out: './src/infra/database/drizzle/migrations',
  dbCredentials: {
    url: `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
  },
})
