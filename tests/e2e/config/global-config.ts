import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql'

let container: StartedPostgreSqlContainer

export async function setup() {
  container = await new PostgreSqlContainer('postgres:16-alpine')
    .withDatabase('user_service_test')
    .withUsername('test')
    .withPassword('test')
    .withExposedPorts(5432)
    .start()

  const connectionUri = container.getConnectionUri()

  // Define todas as variáveis de ambiente necessárias
  process.env.DATABASE_URL = connectionUri
  process.env.POSTGRES_PASSWORD = 'test'
  process.env.POSTGRES_HOST = container.getHost()
  process.env.POSTGRES_PORT = container.getMappedPort(5432).toString()
  process.env.POSTGRES_USER = 'test'
  process.env.POSTGRES_DB = 'user_service_test'

  // return async () => {
  //   await container.stop()
  // }
}

export async function teardown() {
  if (container) {
    await container.stop()
    console.log('✅ Container parado e removido com sucesso!')
  }
}
