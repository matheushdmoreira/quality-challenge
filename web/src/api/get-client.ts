import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { api } from '@/lib/axios'

export interface GetClientResponse {
  client: {
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
  }
}

export async function getClient(client_id: string | undefined) {
  const response = await api.get<GetClientResponse>(`/clients/${client_id}`)

  const newClient = {
    ...response.data.client,
    valid: format(response.data.client.valid, 'yyyy-MM-dd', {
      locale: ptBR,
    }),
  }

  return newClient
}
