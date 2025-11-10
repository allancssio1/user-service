import { CreateUserUseCase } from '../../../domain/usecases/create-user-use-case'
import { z } from '../../config/zod-v4'

const createUserSchema = z.object({
  name: z.string().min(2).max(100),
})

type CreateUserServiceRequest = z.infer<typeof createUserSchema>

export class CreateUserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}
  async execute({ name }: CreateUserServiceRequest) {
    const user = await this.createUserUseCase.execute({ name })
    return user
  }
}
