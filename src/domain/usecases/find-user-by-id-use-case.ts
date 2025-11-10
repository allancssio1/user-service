import { UserNotFoundError } from '../../core/errors/user-not-found-error'
import { UserRepository } from '../repositories/user-repository'

interface FindUserByIdUseCaseRequest {
  id: string
}

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: FindUserByIdUseCaseRequest) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return user
  }
}
