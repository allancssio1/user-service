import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { listUserUseCase } from '../../../../../tests/factory/make-use-factoreis'
import { UserRepository } from '../../../../domain/repositories/user-repository'
import { UserRepositoryInMemory } from '../../../../../tests/repositories/user-repository-in-memory'
import { User } from '../../../../domain/entities/user'
import { ListUsersService } from '../list-users-service'

describe('List User Service', () => {
  let user1: User
  let user2: User
  let user3: User
  let repo: UserRepository
  let service: ListUsersService
  beforeEach(async () => {
    service = new ListUsersService(listUserUseCase)
    repo = new UserRepositoryInMemory()
  })
  it('should be able to list all users', async () => {
    user1 = new User('John Doe 1')
    user2 = new User('John Doe 2')
    user3 = new User('John Doe 3')
    await repo.create(user1)
    await repo.create(user2)
    await repo.create(user3)
    expect(await service.execute()).toMatchObject([
      expect.objectContaining(user1),
      expect.objectContaining(user2),
      expect.objectContaining(user3),
    ])
  })

  it('should be able to list empty users', async () => {
    expect(await service.execute()).toMatchObject(expect.arrayContaining([]))
  })
})
