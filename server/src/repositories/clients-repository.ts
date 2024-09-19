import { Client, Prisma } from '@prisma/client'

export interface ClientsRepository {
  findById(id: number): Promise<Client | null>
  searchMany(query: string | undefined, page: number): Promise<Client[]>
  show(id: number): Promise<Client | null>
  update(data: Prisma.ClientUpdateInput): Promise<Client>
  remove(id: number): Promise<void>
  create(data: Prisma.ClientCreateInput): Promise<Client>
}
