import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateClientUseCase } from '@/use-cases/factories/make-create-client-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createClientBodySchema = z.object({
    user_id: z.number(),
    code: z.string().min(1),
    name: z.string().min(1),
    document: z.string().min(1),
    zipcode: z.number().min(1),
    address: z.string().min(1),
    number: z.string().min(1),
    district: z.string().min(1),
    city: z.string().min(1),
    uf: z.string().min(2),
    complement: z.string(),
    phone: z.string().min(1),
    credit_limit: z.number().min(1),
    valid: z.string().min(1),
  })

  const {
    user_id,
    code,
    name,
    document,
    zipcode,
    address,
    number,
    district,
    city,
    uf,
    complement,
    phone,
    credit_limit,
    valid,
  } = createClientBodySchema.parse(request.body)

  const createClientUseCase = makeCreateClientUseCase()

  await createClientUseCase.execute({
    user_id,
    code,
    name,
    document,
    zipcode,
    address,
    number,
    district,
    city,
    uf,
    complement,
    phone,
    credit_limit,
    valid,
  })

  return reply.status(201).send()
}
