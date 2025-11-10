import { beforeAll, describe, expect, test } from 'vitest'
import { UserRepository } from '../../repositories/user-repository'
import { UserRepositoryInMemory } from '../../../../tests/repositories/user-repository-in-memory'
import { User } from '../../entities/user'
import { ListUserUseCase } from '../list-user-use-case'

describe('Unit Test Find User', () => {
  let repo: UserRepository
  let user1: User
  let user2: User
  let user3: User
  let sut: ListUserUseCase

  beforeAll(() => {
    repo = new UserRepositoryInMemory()
    sut = new ListUserUseCase(repo)
    user1 = new User('allan')
    user2 = new User('allan')
    user3 = new User('allan')

    repo.create(user1)
    repo.create(user2)
    repo.create(user3)
  })
  test('Find success', async () => {
    expect(await sut.execute()).toEqual(
      expect.arrayContaining([user1, user2, user3]),
    )
  })

  test('User not found', async () => {
    expect(sut.execute()).toEqual(expect.arrayContaining([]))
  })
})
