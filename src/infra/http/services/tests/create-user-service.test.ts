import { beforeAll, describe, expect, it } from 'vitest'
import { CreateUserService } from '../create-user-service'
import { createUserUserCase } from '../../../../../tests/factory/make-use-factoreis'

describe('Create User Service', () => {
  let service: CreateUserService
  beforeAll(() => {
    service = new CreateUserService(createUserUserCase)
  })
  it('should be able to create a new user', async () => {
    const user = await service.execute({
      name: 'John Doe',
    })
    expect(user).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
      }),
    )
  })
})
