import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateClientUseCase } from '@/use-cases/factories/make-update-client-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateClientParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const updateClientBodySchema = z.object({
    user_id: z.number().optional(),
    code: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    document: z.string().min(1).optional(),
    zipcode: z.number().min(1).optional(),
    place: z.string().optional(),
    address: z.string().min(1).optional(),
    number: z.string().min(1).optional(),
    district: z.string().min(1).optional(),
    city: z.string().min(1).optional(),
    uf: z.string().min(2).optional(),
    complement: z.string().optional(),
    phone: z.string().min(1).optional(),
    credit_limit: z.number().min(1).optional(),
    valid: z.string().min(1).optional(),
  })

  const { id } = updateClientParamsSchema.parse(request.params)
  const {
    user_id,
    code,
    name,
    document,
    zipcode,
    place,
    address,
    number,
    district,
    city,
    uf,
    complement,
    phone,
    credit_limit,
    valid,
  } = updateClientBodySchema.parse(request.body)

  try {
    const updateClientUseCase = makeUpdateClientUseCase()

    await updateClientUseCase.execute({
      client_id: id,
      user_id,
      code,
      name,
      document,
      zipcode,
      place,
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
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
