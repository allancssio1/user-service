import fastify, { type FastifyInstance } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { userRoutes } from '../../../src/infra/http/routes/user-routes'
import { env } from '../../../src/infra/config/env'
import { fromZodError } from 'zod-validation-error'
import { ZodError } from '../../../src/infra/config/zod-v4'
import { AppError } from '../../../src/core/errors/app-error'

export async function createApp(): Promise<FastifyInstance> {
  const app = fastify({
    logger: false,
  }).withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.setErrorHandler((error, _request, reply) => {
    if (error.code === 'FST_ERR_VALIDATION') {
      return reply.status(400).send({
        message: 'Validation error.',
        errors: error,
      })
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: 'Validation error.',
        errors: error,
      })
    }

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        errors: fromZodError(error),
      })
    }

    if (env.NODE_ENV !== 'production') {
      // biome-ignore lint/suspicious/noConsole: <console to dev>
      console.error(error)
    } else {
      // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' })
  })

  await app.register(userRoutes, { prefix: '/users' })

  await app.ready()

  return app
}
