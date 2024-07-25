import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import {
  // jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createAccount } from './routes/auth/create-account'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// transformação entrada e saída
app.setSerializerCompiler(serializerCompiler)
// como a validação será feita
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors)
app.register(createAccount)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP SERVER RUNNING :)')
})
