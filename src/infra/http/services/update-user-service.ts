import { UpdateUserUseCase } from '../../../domain/usecases/update-user-use-case'
import { z } from '../../config/zod-v4'

const updateUserSchema = z.object({
  name: z.string().min(2).max(100),
  id: z.uuid(),
})

type UpdateUserServiceRequest = z.infer<typeof updateUserSchema>

export class UpdateUserService {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}
  async execute({ name, id }: UpdateUserServiceRequest) {
    const user = await this.updateUserUseCase.execute({ id, name })
    return user
  }
}
