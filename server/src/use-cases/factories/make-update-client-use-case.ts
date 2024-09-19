import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { UpdateClientUseCase } from '../update-client'

export function makeUpdateClientUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const useCase = new UpdateClientUseCase(clientsRepository)

  return useCase
}
