import { beforeAll, describe, expect, test } from 'vitest'
import { UserRepository } from '../../repositories/user-repository'
import { UserRepositoryInMemory } from '../../../../tests/repositories/user-repository-in-memory'
import { User } from '../../entities/user'
import { FindUserByIdUseCase } from '../find-user-by-id-use-case'

describe('Unit Test Find User', () => {
  let repo: UserRepository
  let user: User
  let sut: FindUserByIdUseCase

  beforeAll(() => {
    repo = new UserRepositoryInMemory()
    sut = new FindUserByIdUseCase(repo)
    user = new User('allan')

    repo.create(user)
  })
  test('Find success', async () => {
    expect(
      await sut.execute({
        id: user.id,
      }),
    ).toMatchObject(
      expect.objectContaining({
        id: user.id,
      }),
    )
  })

  test('User not found', async () => {
    await expect(sut.execute({ id: 'e' })).rejects.toThrowError(
      'User not found',
    )
  })
})
