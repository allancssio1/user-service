import fastify from 'fastify'
import { fastifyCors } from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { userRoutes } from './routes/user-routes'
import { AppError } from '../../core/errors/app-error'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'
import { env } from '../config/env'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/', () => {
  return { status: 'ok' }
})

app.register(userRoutes, {
  prefix: '/users',
})

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

export { app }
