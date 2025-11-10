import { ListUserUseCase } from '../../../domain/usecases/list-user-use-case'

export class ListUsersService {
  constructor(private readonly listUserUseCase: ListUserUseCase) {}
  async execute() {
    const user = await this.listUserUseCase.execute()
    return user
  }
}
