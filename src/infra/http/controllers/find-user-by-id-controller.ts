import { FastifyReply, FastifyRequest } from 'fastify'
import { findUserByIdService } from '../factories/make-find-user-by-id'
import { FindUserByIdParams } from '../types/users-types'

class FindUserByIdController {
  async handle(
    request: FastifyRequest<{
      Params: FindUserByIdParams
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params

    const user = await findUserByIdService.execute({
      id,
    })

    return reply.status(201).send(user)
  }
}
export const findUserByIdController = new FindUserByIdController().handle.bind(
  new FindUserByIdController(),
)
