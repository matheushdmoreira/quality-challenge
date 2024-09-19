import { useQuery } from '@tanstack/react-query'
import { Users } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { getClients } from '@/api/get-clients'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Dashboard() {
  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients({ q: '' }),
  })

  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold">
                Clientes
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-1">
              <span className="text-2xl font-bold tracking-tight">
                {clients?.length}
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
