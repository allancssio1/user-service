import { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { cleanDatabase, runMigrations } from './helpers/run-migrations'
import { createApp } from './helpers/create-app'
import { UserRepository } from '../../src/domain/repositories/user-repository'
import { UserRepositoryDrizzle } from '../../src/infra/database/repositories/user-repository-drizzle'
import { User } from '../../src/domain/entities/user'
import { randomUUID } from 'node:crypto'
import { UserMapper } from '../../src/infra/database/mappers/user-mapper'

describe('DELETE /users - Delete A User (E2E)', () => {
  let app: FastifyInstance
  let user: User
  let repo: UserRepository

  beforeAll(async () => {
    await runMigrations()
    app = await createApp()
    repo = new UserRepositoryDrizzle()
    user = new User('John Doe')
  })

  beforeEach(async () => {
    await cleanDatabase()
    await repo.create(UserMapper.toDatabase(user))
  })

  afterAll(async () => {
    await app.close()
  })

  it('Shoude be delete a user using id successfully', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/users/${user.id}`,
    })

    expect(response.statusCode).toBe(204)
  })

  it('should return 404 when user is not found on delete', async () => {
    const id = randomUUID()
    const response = await app.inject({
      method: 'DELETE',
      url: `/users/${id}`,
    })

    expect(response.statusCode).toBe(404)
  })
  it('should return 400 when user id is invalid on delete', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/users/uuid-invalid',
      body: {
        name: 'John Doe Kloe',
      },
    })

    expect(response.statusCode).toBe(400)
  })
})
