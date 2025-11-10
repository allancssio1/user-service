import { FindUserByIdUseCase } from '../../../domain/usecases/find-user-by-id-use-case'
import { UserRepositoryDrizzle } from '../../database/repositories/user-repository-drizzle'
import { FindUserByIdService } from '../services/find-user-by-id-service'

const repo = new UserRepositoryDrizzle()
const useCase = new FindUserByIdUseCase(repo)
export const findUserByIdService = new FindUserByIdService(useCase)
