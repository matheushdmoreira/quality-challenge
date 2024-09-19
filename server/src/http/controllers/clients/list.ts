import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchClientsUseCase } from '@/use-cases/factories/make-search-clients-use-case'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const searchClientsQuerySchema = z.object({
    q: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchClientsQuerySchema.parse(request.query)

  const searchClientsUseCase = makeSearchClientsUseCase()

  const clients = await searchClientsUseCase.execute({
    query: q,
    page,
  })

  return reply.status(200).send(clients)
}
