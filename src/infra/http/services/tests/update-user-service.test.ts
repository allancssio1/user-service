import { beforeAll, describe, expect, it } from 'vitest'
import { updateUserUseCase } from '../../../../../tests/factory/make-use-factoreis'
import { UserRepository } from '../../../../domain/repositories/user-repository'
import { UserRepositoryInMemory } from '../../../../../tests/repositories/user-repository-in-memory'
import { User } from '../../../../domain/entities/user'
import { UpdateUserService } from '../update-user-service'

describe('Update User Service', () => {
  let user: User
  let repo: UserRepository
  let service: UpdateUserService
  beforeAll(async () => {
    service = new UpdateUserService(updateUserUseCase)
    repo = new UserRepositoryInMemory()
    user = new User('John Doe')
    await repo.create(user)
  })
  it('should be able to update a user', async () => {
    expect(
      await service.execute({ id: user.id, name: 'John Done' }),
    ).toMatchObject(
      expect.objectContaining({
        id: user.id,
        name: 'John Done',
      }),
    )
  })
})
