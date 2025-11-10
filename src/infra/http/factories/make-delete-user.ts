import { DeleteUserUseCase } from '../../../domain/usecases/delete-user-use-case'
import { UserRepositoryDrizzle } from '../../database/repositories/user-repository-drizzle'
import { DeleteUserService } from '../services/delete-user-service'

const repo = new UserRepositoryDrizzle()
const useCase = new DeleteUserUseCase(repo)
export const deleteUserService = new DeleteUserService(useCase)
