import { User } from '../../src/domain/entities/user'
import { UserRepository } from '../../src/domain/repositories/user-repository'

export const users: User[] = []
export class UserRepositoryInMemory implements UserRepository {
  create(user: User): Promise<User> {
    users.push(user)
    return Promise.resolve(user)
  }

  findById(id: string): Promise<User | null> {
    const user = users.find((user) => user.id === id)
    return Promise.resolve(user || null)
  }
  findAll(): Promise<User[]> {
    return Promise.resolve(users)
  }
  update(user: User): Promise<void> {
    const index = users.findIndex((u) => u.id === user.id)

    if (index === -1) {
      throw new Error('User not found')
    }
    users[index] = user
    return Promise.resolve()
  }
  delete(id: string): Promise<void> {
    const index = users.findIndex((u) => u.id === id)

    if (index === -1) {
      throw new Error('User not found')
    }
    users.splice(index, 1)
    return Promise.resolve()
  }
}
