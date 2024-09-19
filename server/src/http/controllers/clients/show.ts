import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeShowClientUseCase } from '@/use-cases/factories/make-show-client-use-case'

export async function show(request: FastifyRequest, reply: FastifyReply) {
  const updateClientParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = updateClientParamsSchema.parse(request.params)

  try {
    const showClientUseCase = makeShowClientUseCase()

    const client = await showClientUseCase.execute({
      client_id: id,
    })

    return reply.status(200).send(client)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
