import { beforeAll, describe, expect, it } from 'vitest'
import { deleteUserUseCase } from '../../../../../tests/factory/make-use-factoreis'
import { UserRepository } from '../../../../domain/repositories/user-repository'
import { UserRepositoryInMemory } from '../../../../../tests/repositories/user-repository-in-memory'
import { User } from '../../../../domain/entities/user'
import { DeleteUserService } from '../delete-user-service'

describe('Delete User Service', () => {
  let user: User
  let repo: UserRepository
  let service: DeleteUserService
  beforeAll(async () => {
    service = new DeleteUserService(deleteUserUseCase)
    repo = new UserRepositoryInMemory()
    user = new User('John Doe')
    await repo.create(user)
  })
  it('should be able to delete a user', async () => {
    expect(await repo.findById(user.id)).toMatchObject(
      expect.objectContaining({ id: user.id, name: user.name }),
    )
    await service.execute({ id: user.id })
    expect(await repo.findById(user.id)).toMatchObject({})
  })
})
