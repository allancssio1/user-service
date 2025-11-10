import { z } from '../../config/zod-v4'

export const createUserSchema = z.object({
  name: z.string().max(100),
})

export const findUserByIdSchema = z.object({
  id: z.uuid(),
})

export const updateUserBodySchema = createUserSchema
export const updateUserParamsSchema = findUserByIdSchema
export const deleteUserParamsSchema = findUserByIdSchema
