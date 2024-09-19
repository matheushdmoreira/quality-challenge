import { api } from '@/lib/axios'

interface GetClientsQuery {
  q?: string | null
}

export interface GetClientsResponse {
  clients: {
    id: number
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
    created_at: string
  }[]
}

export async function getClients({ q = undefined }: GetClientsQuery) {
  const response = await api.get<GetClientsResponse>('/clients', {
    params: {
      q,
    },
  })

  return response.data.clients
}
