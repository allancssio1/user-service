import { UserNotFoundError } from '../../core/errors/user-not-found-error'
import { User } from '../entities/user'
import { UserRepository } from '../repositories/user-repository'

interface UpdateeUserUseCaseRequest {
  id: string
  name: string
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id, name }: UpdateeUserUseCaseRequest) {
    const userFounded = await this.userRepository.findById(id)

    if (!userFounded) {
      throw new UserNotFoundError('User not found')
    }

    const user = new User(
      name,
      id,
      userFounded.createdAt,
      userFounded.updatedAt,
    )

    await this.userRepository.update(user)

    return user
  }
}
