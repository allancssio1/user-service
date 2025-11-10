import postgres from 'postgres'
import { env } from '../../../src/infra/config/env'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { schema } from '../../../src/infra/database/drizzle/schemas'

function sqlConfig() {
  const sql = postgres(
    `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
    {
      max: 1,
    },
  )
  return sql
}

export async function runMigrations() {
  const sql = sqlConfig()
  const db = drizzle(sql, { schema, casing: 'snake_case' })

  try {
    await migrate(db, {
      migrationsFolder: './src/infra/database/drizzle/migrations',
    })
  } finally {
    await sql.end()
  }
}

export async function cleanDatabase() {
  const sql = sqlConfig()

  try {
    await sql`TRUNCATE TABLE "user" CASCADE`
  } finally {
    await sql.end()
  }
}
