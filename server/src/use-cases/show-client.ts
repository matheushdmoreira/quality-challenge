import { Client } from '@prisma/client'

import { ClientsRepository } from '@/repositories/clients-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ShowClientUseCaseRequest {
  client_id: number
}

interface ShowClientUseCaseResponse {
  client: Client
}

export class ShowClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    client_id,
  }: ShowClientUseCaseRequest): Promise<ShowClientUseCaseResponse> {
    const client = await this.clientsRepository.findById(client_id)

    if (!client) {
      throw new ResourceNotFoundError()
    }

    return {
      client,
    }
  }
}
