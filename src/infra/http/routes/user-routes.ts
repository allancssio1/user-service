import { FastifyInstance } from 'fastify'
import { createUserController } from '../controllers/create-user-controller'
import { z } from '../../config/zod-v4'
import { User } from '../../../domain/entities/user'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  createUserSchema,
  deleteUserParamsSchema,
  findUserByIdSchema,
  updateUserBodySchema,
  updateUserParamsSchema,
} from '../validations/users-validations'
import { findUserByIdController } from '../controllers/find-user-by-id-controller'
import { listUserController } from '../controllers/list-user-controller'
import { updateUserController } from '../controllers/update-user-controller'
import { deleteUserController } from '../controllers/delete-user-controller'

export async function userRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>()
  app.post(
    '/',
    {
      schema: {
        body: createUserSchema,
      },
    },
    createUserController,
  )

  app.put(
    '/:id',
    {
      schema: {
        params: updateUserParamsSchema,
        body: updateUserBodySchema,
      },
    },
    updateUserController,
  )

  app.get(
    '/:id',
    {
      schema: {
        params: findUserByIdSchema,
      },
    },
    findUserByIdController,
  )

  app.get('/', listUserController)

  app.delete(
    '/:id',
    {
      schema: {
        params: deleteUserParamsSchema,
      },
    },
    deleteUserController,
  )
}
