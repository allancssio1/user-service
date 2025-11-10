import { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { cleanDatabase, runMigrations } from './helpers/run-migrations'
import { createApp } from './helpers/create-app'
import { UserRepository } from '../../src/domain/repositories/user-repository'
import { UserRepositoryDrizzle } from '../../src/infra/database/repositories/user-repository-drizzle'
import { User } from '../../src/domain/entities/user'
import { UserMapper } from '../../src/infra/database/mappers/user-mapper'

describe('GET /users - Find User By Id (E2E)', () => {
  let app: FastifyInstance
  let user1: User
  let user2: User
  let user3: User
  let repo: UserRepository

  beforeAll(async () => {
    await runMigrations()
    app = await createApp()
    repo = new UserRepositoryDrizzle()
    user1 = new User('John Doe 1')
    user2 = new User('John Doe 2')
    user3 = new User('John Doe 3')
  })

  beforeEach(async () => {
    await cleanDatabase()
    await repo.create(UserMapper.toDatabase(user1))
    await repo.create(UserMapper.toDatabase(user2))
    await repo.create(UserMapper.toDatabase(user3))
  })

  afterAll(async () => {
    await app.close()
  })

  it('Shoude be list all users successfully', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/users`,
    })

    expect(response.json()).toMatchObject([
      expect.objectContaining({ id: user1.id, name: user1.name }),
      expect.objectContaining({ id: user2.id, name: user2.name }),
      expect.objectContaining({ id: user3.id, name: user3.name }),
    ])
  })
})
