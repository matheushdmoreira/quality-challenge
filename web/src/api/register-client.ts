import { api } from '@/lib/axios'

export interface RegisterClientRequest {
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

export async function registerClient({
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
}: RegisterClientRequest) {
  await api.post('/clients', {
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
