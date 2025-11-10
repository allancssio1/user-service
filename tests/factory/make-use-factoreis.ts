import { CreateUserUseCase } from '../../src/domain/usecases/create-user-use-case'
import { DeleteUserUseCase } from '../../src/domain/usecases/delete-user-use-case'
import { FindUserByIdUseCase } from '../../src/domain/usecases/find-user-by-id-use-case'
import { ListUserUseCase } from '../../src/domain/usecases/list-user-use-case'
import { UpdateUserUseCase } from '../../src/domain/usecases/update-user-use-case'
import { UserRepositoryInMemory } from '../repositories/user-repository-in-memory'

const repo = new UserRepositoryInMemory()
export const createUserUserCase = new CreateUserUseCase(repo)

export const updateUserUseCase = new UpdateUserUseCase(repo)

export const findUserByIdUseCase = new FindUserByIdUseCase(repo)

export const listUserUseCase = new ListUserUseCase(repo)

export const deleteUserUseCase = new DeleteUserUseCase(repo)
