import { CreateUserUseCase } from '../../../domain/usecases/create-user-use-case'
import { UserRepositoryDrizzle } from '../../database/repositories/user-repository-drizzle'
import { CreateUserService } from '../services/create-user-service'

const repo = new UserRepositoryDrizzle()
const useCase = new CreateUserUseCase(repo)
export const createUserService = new CreateUserService(useCase)
