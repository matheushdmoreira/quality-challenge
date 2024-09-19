import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Trash, UserPen } from 'lucide-react'
import { Link } from 'react-router-dom'

import { removeClient } from '@/api/delete-client'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

interface ClientTableRowProps {
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

export function ClientTableRow({ client }: ClientTableRowProps) {
  const queryClient = useQueryClient()

  const { mutateAsync: removeClientFn } = useMutation({
    mutationFn: removeClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  return (
    <TableRow>
      <TableCell className="text-center font-mono text-xs font-medium">
        {client.code}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {client.document}
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {`${client.address}, N ${client.number}${client.complement ? `, ${client.complement}` : ''} - ${client.district} - ${client.city}/${client.uf} - CEP ${client.zipcode}`}
      </TableCell>
      <TableCell className="font-medium">{client.name}</TableCell>
      <TableCell className="text-center font-medium">{client.phone}</TableCell>
      <TableCell className="text-center text-muted-foreground">
        {format(client.created_at, 'dd/MM/yyyy')}
      </TableCell>
      <TableCell className="text-center">
        {format(client.valid, 'dd/MM/yyyy')}
      </TableCell>
      <TableCell>
        <Button variant="outline" size="xs" asChild>
          <Link to={`/clients/${client.id}`}>
            <UserPen className="mr-2 h-3 w-3" />
            Editar
          </Link>
        </Button>
      </TableCell>
      <TableCell>
        <Button
          onClick={() => removeClientFn({ clientId: client.id })}
          variant="destructive"
          size="xs"
        >
          <Trash className="mr-2 h-3 w-3" />
          Deletar
        </Button>
      </TableCell>
    </TableRow>
  )
}
