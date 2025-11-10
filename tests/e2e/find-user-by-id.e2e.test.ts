import { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { cleanDatabase, runMigrations } from './helpers/run-migrations'
import { createApp } from './helpers/create-app'
import { UserRepository } from '../../src/domain/repositories/user-repository'
import { UserRepositoryDrizzle } from '../../src/infra/database/repositories/user-repository-drizzle'
import { User } from '../../src/domain/entities/user'
import { randomUUID } from 'node:crypto'
import { UserMapper } from '../../src/infra/database/mappers/user-mapper'

describe('GET /users - Find User By Id (E2E)', () => {
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

  it('Shoude be find a user using id successfully', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/users/${user.id}`,
    })

    expect(response.json()).toMatchObject(
      expect.objectContaining({ id: expect.any(String), name: 'John Doe' }),
    )
  })

  it('should return 404 when user is not found', async () => {
    const id = randomUUID()
    const response = await app.inject({
      method: 'GET',
      url: `/users/${id}`,
    })

    expect(response.statusCode).toBe(404)
  })
  it('should return 400 when user id is invalid', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/users/uuid-invalid',
    })

    expect(response.statusCode).toBe(400)
  })
})
