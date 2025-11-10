import { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { cleanDatabase, runMigrations } from './helpers/run-migrations'
import { createApp } from './helpers/create-app'

describe('POST /users - Create User (E2E)', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    await runMigrations()
    app = await createApp()
  })

  beforeEach(async () => {
    await cleanDatabase()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Shoude be create a new user successfully', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      body: {
        name: 'John Doe',
      },
    })

    expect(response.json()).toMatchObject(
      expect.objectContaining({ id: expect.any(String), name: 'John Doe' }),
    )
  })

  it('should return 400 when name is missing', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/users',
    })

    expect(response.statusCode).toBe(400)
  })

  it('should return 400 when name is too long', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'A'.repeat(101), // Maior que 100 caracteres
      },
    })

    expect(response.statusCode).toBe(400)
  })
})
