import { z } from '../../config/zod-v4'
import { FindUserByIdUseCase } from '../../../domain/usecases/find-user-by-id-use-case'

const findUserByIdSchema = z.object({
  id: z.uuid(),
})

type FindUserByIdServiceRequest = z.infer<typeof findUserByIdSchema>

export class FindUserByIdService {
  constructor(private readonly findUserByIdUserUseCase: FindUserByIdUseCase) {}
  async execute({ id }: FindUserByIdServiceRequest) {
    const user = await this.findUserByIdUserUseCase.execute({ id })
    return user
  }
}
