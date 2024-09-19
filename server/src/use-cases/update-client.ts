import { Client } from '@prisma/client'

import { ClientsRepository } from '@/repositories/clients-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateClientUseCaseRequest {
  client_id: number
  user_id?: number
  code?: string
  name?: string
  document?: string
  zipcode?: number
  place?: string
  address?: string
  number?: string
  district?: string
  city?: string
  uf?: string
  complement?: string
  phone?: string
  credit_limit?: number
  valid?: string
}

interface UpdateClientUseCaseResponse {
  client: Client
}

export class UpdateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    client_id,
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
  }: UpdateClientUseCaseRequest): Promise<UpdateClientUseCaseResponse> {
    const client = await this.clientsRepository.findById(client_id)

    if (!client) {
      throw new ResourceNotFoundError()
    }

    const newClient = await this.clientsRepository.update({
      id: client_id,
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

    return {
      client: newClient,
    }
  }
}
