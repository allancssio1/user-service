import { User } from '../entities/user'

export interface UserRepository {
  create(user: User): Promise<User>
  findById(id: string): Promise<User | null>
  findAll(): Promise<User[]>
  update(user: User): Promise<void>
  delete(id: string): Promise<void>
}
