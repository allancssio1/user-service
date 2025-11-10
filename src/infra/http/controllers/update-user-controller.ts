import { FastifyReply, FastifyRequest } from 'fastify'
import { UpdateUserBody, UpdateUserParams } from '../types/users-types'
import { updateUserService } from '../factories/make-update-user'

class UpdateUserController {
  async handler(
    request: FastifyRequest<{
      Params: UpdateUserParams
      Body: UpdateUserBody
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params
    const { name } = request.body

    const user = await updateUserService.execute({
      id,
      name,
    })

    return reply.status(200).send(user)
  }
}
export const updateUserController = new UpdateUserController().handler.bind(
  new UpdateUserController(),
)
