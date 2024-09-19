import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRemoveClientUseCase } from '@/use-cases/factories/make-remove-client-use-case'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const updateClientParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = updateClientParamsSchema.parse(request.params)

  try {
    const removeClientUseCase = makeRemoveClientUseCase()

    await removeClientUseCase.execute({
      client_id: id,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
