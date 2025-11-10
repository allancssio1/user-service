import { beforeEach, describe, expect, it } from 'vitest'
import { findUserByIdUseCase } from '../../../../../tests/factory/make-use-factoreis'
import { UserRepository } from '../../../../domain/repositories/user-repository'
import { UserRepositoryInMemory } from '../../../../../tests/repositories/user-repository-in-memory'
import { User } from '../../../../domain/entities/user'
import { FindUserByIdService } from '../find-user-by-id-service'

describe('Find User By Id Service', () => {
  let user1: User
  let user2: User
  let repo: UserRepository
  let service: FindUserByIdService
  beforeEach(async () => {
    service = new FindUserByIdService(findUserByIdUseCase)
    repo = new UserRepositoryInMemory()
  })
  it('should be able to  find user by id', async () => {
    user1 = new User('John Doe 1')
    user2 = new User('John Doe 2')
    await repo.create(user1)
    await repo.create(user2)
    expect(await service.execute({ id: user1.id })).toMatchObject(
      expect.objectContaining(user1),
    )
  })

  it('should be able not find user by id other user', async () => {
    await expect(service.execute({ id: '123' })).rejects.toThrow(
      'User not found',
    )
  })
})
