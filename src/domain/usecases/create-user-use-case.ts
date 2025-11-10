import { UserAlreadyExistsError } from '../../core/errors/user-already-exists-error'
import { User } from '../entities/user'
import { UserRepository } from '../repositories/user-repository'

interface CreateUserUseCaseRequest {
  id?: string
  name: string
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id, name }: CreateUserUseCaseRequest) {
    if (id) {
      const userExists = await this.userRepository.findById(id)

      if (userExists) {
        throw new UserAlreadyExistsError('User already exists')
      }
    }

    const user = new User(name, id)

    await this.userRepository.create(user)

    return user
  }
}
