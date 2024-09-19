import { Client, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { ClientsRepository } from '../clients-repository'

export class PrismaClientsRepository implements ClientsRepository {
  async findById(id: number): Promise<Client | null> {
    const client = await prisma.client.findFirst({
      where: {
        id,
      },
    })

    return client
  }

  async searchMany(query: string): Promise<Client[]> {
    let clients = []

    if (query) {
      const queryIsOnlyNumber = /^\d+$/.test(query)
      let newWhere = []

      if (queryIsOnlyNumber) {
        newWhere = [
          {
            code: {
              contains: query,
            },
          },
          {
            name: {
              contains: query,
            },
          },
          {
            city: {
              contains: query,
            },
          },
          {
            zipcode: Number(query),
          },
        ]
      } else {
        newWhere = [
          {
            code: {
              contains: query,
            },
          },
          {
            name: {
              contains: query,
            },
          },
          {
            city: {
              contains: query,
            },
          },
        ]
      }

      clients = await prisma.client.findMany({
        where: {
          OR: newWhere,
        },
      })
    } else {
      clients = await prisma.client.findMany()
    }

    return clients
  }

  async show(id: number): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: {
        id: Number(id),
      },
    })

    return client
  }

  async update({
    id,
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
  }: Prisma.ClientUpdateInput): Promise<Client> {
    const client = await prisma.client.update({
      where: {
        id: Number(id),
      },
      data: {
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
      },
    })

    return client
  }

  async remove(id: number): Promise<void> {
    await prisma.client.delete({
      where: {
        id: Number(id),
      },
    })
  }

  async create({
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
  }: Prisma.ClientCreateInput): Promise<Client> {
    const client = await prisma.client.create({
      data: {
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
      },
    })

    return client
  }
}
