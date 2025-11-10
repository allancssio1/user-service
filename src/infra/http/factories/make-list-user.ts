import { ListUserUseCase } from '../../../domain/usecases/list-user-use-case'
import { UserRepositoryDrizzle } from '../../database/repositories/user-repository-drizzle'
import { ListUsersService } from '../services/list-users-service'

const repo = new UserRepositoryDrizzle()
const useCase = new ListUserUseCase(repo)
export const listUserService = new ListUsersService(useCase)
