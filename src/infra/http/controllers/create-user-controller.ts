import { FastifyReply, FastifyRequest } from 'fastify'
import { createUserService } from '../factories/make-create-user'
import { CreateUserBody } from '../types/users-types'

class CreateUserController {
  async handle(
    request: FastifyRequest<{
      Body: CreateUserBody
    }>,
    reply: FastifyReply,
  ) {
    const { name } = request.body

    const user = await createUserService.execute({
      name,
    })

    return reply.status(200).send(user)
  }
}
export const createUserController = new CreateUserController().handle.bind(
  new CreateUserController(),
)
