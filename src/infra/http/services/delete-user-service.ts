import { DeleteUserUseCase } from '../../../domain/usecases/delete-user-use-case'
import { z } from '../../config/zod-v4'

const deleteUserSchema = z.object({
  id: z.uuid(),
})

type DeleteUserServiceRequest = z.infer<typeof deleteUserSchema>

export class DeleteUserService {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}
  async execute({ id }: DeleteUserServiceRequest) {
    const user = await this.deleteUserUseCase.execute({ id })
    return user
  }
}
