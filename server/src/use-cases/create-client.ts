import { ClientsRepository } from '@/repositories/clients-repository'
import { Client } from '@prisma/client'

interface CreateClientUseCaseRequest {
  user_id: number
  code: string
  name: string
  document: string
  zipcode: number
  address: string
  number: string
  district: string
  city: string
  uf: string
  complement: string
  phone: string
  credit_limit: number
  valid: string
}

interface CreateClientUseCaseResponse {
  client: Client
}

export class CreateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
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
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const client = await this.clientsRepository.create({
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
      valid: new Date(valid),
    })

    return {
      client,
    }
  }
}
