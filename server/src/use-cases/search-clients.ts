import { ClientsRepository } from '@/repositories/clients-repository'
import { Client } from '@prisma/client'

interface SearchClientsUseCaseRequest {
  query: string | undefined
  page: number
}

interface SearchClientsUseCaseResponse {
  clients: Client[]
}

export class SearchClientsUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    query,
    page,
  }: SearchClientsUseCaseRequest): Promise<SearchClientsUseCaseResponse> {
    const clients = await this.clientsRepository.searchMany(query, page)

    return {
      clients,
    }
  }
}
