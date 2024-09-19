import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { SearchClientsUseCase } from '../search-clients'

export function makeSearchClientsUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const useCase = new SearchClientsUseCase(clientsRepository)

  return useCase
}
