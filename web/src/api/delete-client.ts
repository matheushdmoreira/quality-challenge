import { api } from '@/lib/axios'

interface RemoveClientParams {
  clientId: number
}

export async function removeClient({ clientId }: RemoveClientParams) {
  await api.delete(`/clients/${clientId}`)
}
