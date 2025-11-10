import { FastifyReply, FastifyRequest } from 'fastify'
import { deleteUserService } from '../factories/make-delete-user'
import { DeleteUserParams } from '../types/users-types'

class DeleteUserController {
  async handle(
    request: FastifyRequest<{
      Params: DeleteUserParams
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params

    await deleteUserService.execute({ id })
    return reply.status(204).send()
  }
}
export const deleteUserController = new DeleteUserController().handle.bind(
  new DeleteUserController(),
)
