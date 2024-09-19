import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getClient } from '@/api/get-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { queryClient } from '@/lib/react-query'
import { updateClient } from '@/api/update-client'
import { formatISO } from 'date-fns'

const updateClientSchema = z.object({
  code: z.string().min(1, 'Código é obrigatório.'),
  name: z.string().min(1, 'Nome é obrigatório.'),
  document: z.string().min(1, 'Documento é obrigatório.'),
  zipcode: z.string().min(1, 'CEP é obrigatório.'),
  address: z.string().min(1, 'Endereço é obrigatório.'),
  number: z.string().min(1, 'Número é obrigatório.'),
  district: z.string().min(1, 'Bairro é obrigatório.'),
  city: z.string().min(1, 'Cidade é obrigatória.'),
  uf: z.string().min(2, 'UF é obrigatório.').max(2, 'UF é somente 2 letras.'),
  complement: z.string(),
  phone: z.string().min(1, 'Telefone é obrigatório.'),
  credit_limit: z.string().min(1, 'Limite de crédito é obrigatório.'),
  valid: z.date().transform((str) => new Date(str)),
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

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm<UpdateClientSchema>({
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
        setValue('address', data.logradouro)
        setValue('district', data.bairro)
        setValue('complement', data.complemento)
        setValue('city', data.localidade)
        setValue('uf', data.uf)
        setFocus('number')
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

        <form
          onSubmit={handleSubmit(handleUpdateClient)}
          className="flex flex-col gap-4"
        >
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <Label className="flex flex-col gap-3">
                <span className="text-md font-semibold">Nome</span>
                <Input
                  className={clsx(errors.name ? 'border-rose-500' : '')}
                  placeholder="Nome do cliente"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-xs text-rose-500">{errors.name.message}</p>
                )}
              </Label>

              <Label className="flex flex-col gap-3">
                <span className="text-md font-semibold">Código</span>
                <Input
                  className={clsx(errors.code ? 'border-rose-500' : '')}
                  placeholder="Código"
                  {...register('code')}
                />
                {errors.code && (
                  <p className="text-xs text-rose-500">{errors.code.message}</p>
                )}
              </Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Label className="flex flex-col gap-3">
                <span className="text-md font-semibold">Documento</span>
                <Input
                  className={clsx(errors.document ? 'border-rose-500' : '')}
                  placeholder="CPF ou CNPJ"
                  {...register('document')}
                />
                {errors.document && (
                  <p className="text-xs text-rose-500">
                    {errors.document.message}
                  </p>
                )}
              </Label>

              <Label className="flex flex-col gap-3">
                <span className="text-md font-semibold">Telefone</span>
                <Input
                  className={clsx(errors.phone ? 'border-rose-500' : '')}
                  placeholder="Telefone"
                  {...register('phone')}
                  onBlur={() => {}}
                />
                {errors.phone && (
                  <p className="text-xs text-rose-500">
                    {errors.phone.message}
                  </p>
                )}
              </Label>
            </div>

            <Label className="flex flex-col gap-3">
              <span className="text-md font-semibold">CEP</span>
              <Input
                className={clsx(errors.zipcode ? 'border-rose-500' : '')}
                placeholder="CEP"
                {...register('zipcode')}
                onBlur={(e) => handleGetAddress(e.target.value)}
              />
              {errors.zipcode && (
                <p className="text-xs text-rose-500">
                  {errors.zipcode.message}
                </p>
              )}
            </Label>

            <Label className="flex flex-col gap-3">
              <span className="text-md font-semibold">Endereço</span>
              <Input
                className={clsx(errors.address ? 'border-rose-500' : '')}
                placeholder="Nome da Rua"
                {...register('address')}
              />
              {errors.address && (
                <p className="text-xs text-rose-500">
                  {errors.address.message}
                </p>
              )}
            </Label>

            <Label className="flex flex-col gap-3">
              <span className="text-md font-semibold">Número</span>
              <Input
                className={clsx(errors.number ? 'border-rose-500' : '')}
                placeholder="Número"
                {...register('number')}
              />
              {errors.number && (
                <p className="text-xs text-rose-500">{errors.number.message}</p>
              )}
            </Label>

            <Label className="flex flex-col gap-3">
              <span className="text-md font-semibold">Complemento</span>
              <Input
                className={clsx(errors.complement ? 'border-rose-500' : '')}
                placeholder="Complemento"
                {...register('complement')}
              />
              {errors.complement && (
                <p className="text-xs text-rose-500">
                  {errors.complement.message}
                </p>
              )}
            </Label>

            <Label className="flex flex-col gap-3">
              <span className="text-md font-semibold">Bairro</span>
              <Input
                className={clsx(errors.district ? 'border-rose-500' : '')}
                placeholder="Bairro"
                {...register('district')}
              />
              {errors.district && (
                <p className="text-xs text-rose-500">
                  {errors.district.message}
                </p>
              )}
            </Label>

            <Label className="flex flex-col gap-3">
              <span className="text-md font-semibold">Cidade</span>
              <Input
                className={clsx(errors.city ? 'border-rose-500' : '')}
                placeholder="Cidade"
                {...register('city')}
              />
              {errors.city && (
                <p className="text-xs text-rose-500">{errors.city.message}</p>
              )}
            </Label>

            <Label className="flex flex-col gap-3">
              <span className="text-md font-semibold">UF</span>
              <Input
                className={clsx(errors.uf ? 'border-rose-500' : '')}
                placeholder="UF"
                {...register('uf')}
              />
              {errors.uf && (
                <p className="text-xs text-rose-500">{errors.uf.message}</p>
              )}
            </Label>

            <Label className="flex flex-col gap-3">
              <span className="text-md font-semibold">Limite de Crédito</span>
              <Input
                className={clsx(errors.credit_limit ? 'border-rose-500' : '')}
                placeholder="Limite de Crédito"
                {...register('credit_limit')}
              />
              {errors.credit_limit && (
                <p className="text-xs text-rose-500">
                  {errors.credit_limit.message}
                </p>
              )}
            </Label>

            <Label className="flex flex-col gap-3">
              <span className="text-md font-semibold">Validade</span>
              <Input
                className={clsx(errors.valid ? 'border-rose-500' : '')}
                placeholder="Validade"
                type="date"
                {...register('valid', {
                  valueAsDate: true,
                })}
              />
              {errors.valid && (
                <p className="text-xs text-rose-500">{errors.valid.message}</p>
              )}
            </Label>
          </div>

          <div className="flex justify-end">
            <Button disabled={isSubmitting} type="submit">
              Atualizar
            </Button>
          </div>
        </form>
      </div>
    </>
  )}

  return <p>Loading...</p>
}
