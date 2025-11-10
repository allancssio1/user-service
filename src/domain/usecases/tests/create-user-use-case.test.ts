import { test, expect, describe, beforeAll } from 'vitest'
import { CreateUserUseCase } from '../create-user-use-case'
import { UserRepositoryInMemory } from '../../../../tests/repositories/user-repository-in-memory'
import { UserRepository } from '../../repositories/user-repository'
import { User } from '../../entities/user'

describe('Create User Use Case', () => {
  let sut: CreateUserUseCase
  let repo: UserRepository
  let userAlreadyExists: User

  beforeAll(async () => {
    repo = new UserRepositoryInMemory()
    sut = new CreateUserUseCase(repo)
    userAlreadyExists = new User('John Joe')

    await repo.create(userAlreadyExists)
  })
  test('Create User Success', async () => {
    const user = await sut.execute({
      name: 'allan',
    })

    expect(user).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
        name: 'allan',
      }),
    )
  })

  test('User Id Already Exists', async () => {
    await expect(
      sut.execute({
        id: userAlreadyExists.id,
        name: 'allan',
      }),
    ).rejects.toThrowError('User already exists')
  })
})
