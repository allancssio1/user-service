import { FastifyReply, FastifyRequest } from 'fastify'
import { listUserService } from '../factories/make-list-user'

class ListUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const user = await listUserService.execute()

    return reply.status(200).send(user)
  }
}
export const listUserController = new ListUserController().handle.bind(
  new ListUserController(),
)
