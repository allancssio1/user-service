import { beforeEach, describe, expect, test } from 'vitest'
import { UserRepository } from '../../repositories/user-repository'
import { UserRepositoryInMemory } from '../../../../tests/repositories/user-repository-in-memory'
import { User } from '../../entities/user'
import { DeleteUserUseCase } from '../delete-user-use-case'

describe('Unit Test Delete User', () => {
  let repo: UserRepository
  let user: User
  let sut: DeleteUserUseCase

  beforeEach(() => {
    repo = new UserRepositoryInMemory()
    sut = new DeleteUserUseCase(repo)
    user = new User('allan')

    repo.create(user)
  })
  test('Delete success', async () => {
    await sut.execute(user)
    expect(await repo.findById(user.id)).toBeNullable()
  })

  test('User not found', async () => {
    await expect(
      sut.execute({ id: 'e', name: user.name }),
    ).rejects.toThrowError('User not found')
  })
})
