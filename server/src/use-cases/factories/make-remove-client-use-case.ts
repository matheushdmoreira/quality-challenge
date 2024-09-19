import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { RemoveClientUseCase } from '../remove-client'

export function makeRemoveClientUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const useCase = new RemoveClientUseCase(clientsRepository)

  return useCase
}
