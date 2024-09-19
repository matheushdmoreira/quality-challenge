import { ClientsRepository } from '@/repositories/clients-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RemoveClientUseCaseRequest {
  client_id: number
}

export class RemoveClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({ client_id }: RemoveClientUseCaseRequest): Promise<void> {
    const client = await this.clientsRepository.findById(client_id)

    if (!client) {
      throw new ResourceNotFoundError()
    }

    await this.clientsRepository.remove(client_id)
  }
}
