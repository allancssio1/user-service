import { createUserController } from '../controllers/create-user-controller'
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
import { FastifyInstanceType } from '../types/fastify'

export async function userRoutes(fastify: FastifyInstanceType) {
  const app = fastify.withTypeProvider<ZodTypeProvider>()
  app.post(
    '/',
    {
      schema: {
        body: createUserSchema,
        description: 'Create a new user',
        tags: ['Users'],
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
        description: 'Update a user',
        tags: ['Users'],
      },
    },
    updateUserController,
  )

  app.get(
    '/:id',
    {
      schema: {
        params: findUserByIdSchema,
        description: 'Find a user by id',
        tags: ['Users'],
      },
    },
    findUserByIdController,
  )

  app.get(
    '/',
    {
      schema: {
        description: 'List all users',
        tags: ['Users'],
      },
    },
    listUserController,
  )

  app.delete(
    '/:id',
    {
      schema: {
        params: deleteUserParamsSchema,
        description: 'Delete a user',
        tags: ['Users'],
      },
    },
    deleteUserController,
  )
}
