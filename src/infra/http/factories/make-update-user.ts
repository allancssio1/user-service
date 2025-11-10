import { UpdateUserUseCase } from '../../../domain/usecases/update-user-use-case'
import { UserRepositoryDrizzle } from '../../database/repositories/user-repository-drizzle'
import { UpdateUserService } from '../services/update-user-service'

const repo = new UserRepositoryDrizzle()
const useCase = new UpdateUserUseCase(repo)
export const updateUserService = new UpdateUserService(useCase)
