import { z } from '../../config/zod-v4'
import {
  createUserSchema,
  deleteUserParamsSchema,
  findUserByIdSchema,
  updateUserBodySchema,
  updateUserParamsSchema,
} from '../validations/users-validations'

export type CreateUserBody = z.infer<typeof createUserSchema>
export type FindUserByIdParams = z.infer<typeof findUserByIdSchema>
export type UpdateUserBody = z.infer<typeof updateUserBodySchema>
export type UpdateUserParams = z.infer<typeof updateUserParamsSchema>
export type DeleteUserParams = z.infer<typeof deleteUserParamsSchema>
