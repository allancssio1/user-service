import { User } from '../../../domain/entities/user'
import { UserRepository } from '../../../domain/repositories/user-repository'
import { UserMapper } from '../mappers/user-mapper'
import { db } from '../drizzle/config'
import { schema } from '../drizzle/schemas'
import { eq } from 'drizzle-orm'

export class UserRepositoryDrizzle implements UserRepository {
  async create(user: User): Promise<User> {
    const newUser = await db
      .insert(schema.user)
      .values(UserMapper.toDatabase(user))
      .returning()
    return UserMapper.toDomain(newUser[0])
  }
  async findById(id: string): Promise<User | null> {
    const user = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, id))
    return user && user.length > 0 ? UserMapper.toDomain(user[0]) : null
  }
  async findAll(): Promise<User[]> {
    const users = await db
      .select()
      .from(schema.user)
      .then((users) => users.map(UserMapper.toDomain))
    return users
  }
  async update(user: User): Promise<void> {
    await db
      .update(schema.user)
      .set(UserMapper.toDatabase(user))
      .where(eq(schema.user.id, user.id))
  }
  async delete(id: string): Promise<void> {
    await db.delete(schema.user).where(eq(schema.user.id, id))
  }
}
