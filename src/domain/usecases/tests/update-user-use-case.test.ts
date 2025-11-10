import { beforeAll, describe, expect, test } from 'vitest'
import { UserRepository } from '../../repositories/user-repository'
import { UserRepositoryInMemory } from '../../../../tests/repositories/user-repository-in-memory'
import { User } from '../../entities/user'
import { UpdateUserUseCase } from '../update-user-use-case'

describe('Unit Test Update User', () => {
  let repo: UserRepository
  let user: User
  let sut: UpdateUserUseCase

  beforeAll(() => {
    repo = new UserRepositoryInMemory()
    sut = new UpdateUserUseCase(repo)
    user = new User('allan')

    repo.create(user)
  })
  test('Update success', async () => {
    expect(
      await sut.execute({
        id: user.id,
        name: 'cassio',
      }),
    ).toMatchObject(
      expect.objectContaining({
        id: user.id,
        name: 'cassio',
      }),
    )
  })

  test('User not found', async () => {
    await expect(
      sut.execute({ id: 'e', name: user.name }),
    ).rejects.toThrowError('User not found')
  })
})
