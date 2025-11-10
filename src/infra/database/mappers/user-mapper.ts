import { InferSelectModel } from 'drizzle-orm'
import { schema } from '../drizzle/schemas'
import { User } from '../../../domain/entities/user'

export abstract class UserMapper {
  static toDomain(user: InferSelectModel<typeof schema.user>): User {
    return {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
  static toDatabase(user: User): InferSelectModel<typeof schema.user> {
    return {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
