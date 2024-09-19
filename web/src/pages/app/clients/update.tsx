import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getClient } from '@/api/get-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { queryClient } from '@/lib/react-query'
import { updateClient } from '@/api/update-client'
import { formatISO } from 'date-fns'

const updateClientSchema = z.object({
  code: z.string().min(1, {
    message: 'Código é obrigatório.',
  }),
  name: z.string().min(1, {
    message: 'Nome é obrigatório.',
  }),
  document: z.string().min(1, {
    message: 'Documento é obrigatório.',
  }),
  zipcode: z.string().min(1, {
    message: 'CEP é obrigatório.',
  }),
  address: z.string().min(1, {
    message: 'Endereço é obrigatório.',
  }),
  number: z.string().min(1, {
    message: 'Número é obrigatório.',
  }),
  district: z.string().min(1, {
    message: 'Bairro é obrigatório.',
  }),
  city: z.string().min(1, {
    message: 'Cidade é obrigatória.',
  }),
  uf: z
    .string()
    .min(2, {
      message: 'UF é obrigatório.',
    })
    .max(2, {
      message: 'UF é somente 2 letras.',
    }),
  complement: z.string(),
  phone: z.string().min(1, {
    message: 'Telefone é obrigatório.',
  }),
  credit_limit: z.string().min(1, {
    message: 'Limite de crédito é obrigatório.',
  }),
  valid: z.string().min(1, {
    message: 'Validade é obrigatória.',
  }),
})

type UpdateClientSchema = z.infer<typeof updateClientSchema>

export function UpdateClient() {
  const params = useParams()
  const {id: client_id} = params

  if(!client_id){
    return
  }

  const { data: client } = useQuery({
    queryKey: ['client', client_id],
    queryFn: () => getClient(client_id),
  })

  const form = useForm<UpdateClientSchema>({
    resolver: zodResolver(updateClientSchema),
    values: {
      name: client?.name!,
      code: client?.code!,
      document: client?.document!,
      phone: client?.phone!,
      zipcode: String(client?.zipcode!),
      address: client?.address!,
      number: client?.number!,
      complement: client?.complement ?? '',
      district: client?.district!,
      city: client?.city!,
      uf: client?.uf!,
      credit_limit: String(client?.credit_limit!),
      valid: client?.valid!,
    }
  })
  const navigate = useNavigate()

  async function handleGetAddress(zipcode: string) {
    fetch(`https://viacep.com.br/ws/${zipcode}/json/`, { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        form.setValue('address', data.logradouro)
        form.setValue('district', data.bairro)
        form.setValue('complement', data.complemento)
        form.setValue('city', data.localidade)
        form.setValue('uf', data.uf)
        form.setFocus('number')
      })
  }

  async function handleUpdateClient({
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
  }: UpdateClientSchema) {
    try {
      await updateClient({
        client_id: client_id!,
        code,
        name,
        document,
        zipcode: Number(zipcode),
        address,
        number,
        district,
        city,
        uf,
        complement,
        phone,
        credit_limit: Number(credit_limit),
        valid: formatISO(valid).toString(),
      })

      queryClient.invalidateQueries({ queryKey: ['clients'] })

      toast.success('Cliente atualizado com sucesso.')
      navigate('/clients')
    } catch (error) {
      toast.error('Erro ao atualizar cliente.')
    }
  }

  if(client){
  return (
    <>
      <Helmet title="Clientes" />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Editar cliente: {client?.name}</h1>

          <Button variant="link" asChild>
            <Link to="/clients">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateClient)}
            className="flex flex-col gap-4"
          >
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código</FormLabel>
                      <FormControl>
                        <Input placeholder="Código" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documento</FormLabel>
                      <FormControl>
                        <Input placeholder="CPF ou CNPJ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="Telefone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="CEP"
                        {...field}
                        onBlur={(e) => handleGetAddress(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da Rua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="Número" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input placeholder="Complemento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF</FormLabel>
                    <FormControl>
                      <Input placeholder="UF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="credit_limit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limite de Crédito</FormLabel>
                    <FormControl>
                      <Input placeholder="Limite de Crédito" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="valid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Validade</FormLabel>
                    <FormControl>
                      <Input placeholder="Validade" type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button disabled={form.formState.isSubmitting} type="submit">
                Cadastrar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )}

  return <p>Loading...</p>
}
