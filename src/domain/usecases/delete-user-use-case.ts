import { UserNotFoundError } from '../../core/errors/user-not-found-error'
import { UserRepository } from '../repositories/user-repository'

interface DeleteeUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: DeleteeUserUseCaseRequest) {
    const userFounded = await this.userRepository.findById(id)

    if (!userFounded) {
      throw new UserNotFoundError('User not found')
    }

    await this.userRepository.delete(id)
  }
}
