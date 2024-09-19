import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const clientFilterSchema = z.object({
  q: z.string().optional(),
})

type OrderFilterSchema = z.infer<typeof clientFilterSchema>

export function ClientTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const q = searchParams.get('q')

  const { register, handleSubmit, reset } = useForm<OrderFilterSchema>({
    resolver: zodResolver(clientFilterSchema),
    defaultValues: {
      q: q ?? '',
    },
  })

  function handleFilter({ q }: OrderFilterSchema) {
    setSearchParams((state) => {
      if (q) {
        state.set('q', q)
      } else {
        state.delete('q')
      }

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('q')

      return state
    })

    reset({
      q: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros:</span>

      <Input
        placeholder="Código, nome, cidade ou CEP"
        className="h-8 w-[420px]"
        {...register('q')}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button
        onClick={handleClearFilters}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="mr-2 h-4 w-4" />
        Limpar filtro
      </Button>
    </form>
  )
}
