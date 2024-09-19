import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { ShowClientUseCase } from '../show-client'

export function makeShowClientUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const useCase = new ShowClientUseCase(clientsRepository)

  return useCase
}
