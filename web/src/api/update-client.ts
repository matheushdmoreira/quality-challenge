import { api } from '@/lib/axios'

export interface UpdateClientRequest {
  client_id: string
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
}

export async function updateClient({
  client_id,
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
}: UpdateClientRequest) {
  await api.put(`/clients/${client_id}`, {
    user_id: 1,
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
  })
}
