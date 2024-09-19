import { useQuery } from '@tanstack/react-query'
import { UserPlus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'

import { getClients } from '@/api/get-clients'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ClientTableFilters } from './client-table-filters'
import { ClientTableRow } from './client-table-row'

export function Clients() {
  const [searchParams, _] = useSearchParams()

  const q = searchParams.get('q')

  const { data: clients } = useQuery({
    queryKey: ['clients', q],
    queryFn: () => getClients({ q }),
  })

  return (
    <>
      <Helmet title="Clientes" />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>

          <Button asChild>
            <Link to="/clients/create">
              <UserPlus className="mr-2 h-4 w-4" />
              Novo cliente
            </Link>
          </Button>
        </div>

        {clients && clients?.length > 0 ? (
          <div className="space-y-2.5">
            <ClientTableFilters />

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-center">
                      Código
                    </TableHead>
                    <TableHead className="w-[140px]">Documento</TableHead>
                    <TableHead className="w-[400px]">Endereço</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="w-[140px] text-center">
                      Telefone
                    </TableHead>
                    <TableHead className="w-[180px] text-center">
                      Cadastrado em
                    </TableHead>
                    <TableHead className="w-[140px] text-center">
                      Validade
                    </TableHead>

                    <TableHead className="w-[80px]"></TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients?.map((client) => (
                    <ClientTableRow key={client.id} client={client} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não existem usuários cadastrados.
          </p>
        )}
      </div>
    </>
  )
}
