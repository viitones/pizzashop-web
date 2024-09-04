/* eslint-disable @stylistic/max-len */
import { getManageRestaurant, GetManageRestaurantResponse } from '@/api/get-manage-restaurant'
import { updateProfile } from '@/api/update-profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogClose, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import { DialogFooter, DialogHeader } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string(),
  description: z.string(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const {
    data: manageRestaurant,
  } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManageRestaurant,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
    },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: manageRestaurant?.name ?? '',
      description: manageRestaurant?.description ?? '',
    },
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_, { description, name }) {
      const cached = queryClient.getQueryData<GetManageRestaurantResponse>(['managed-restaurant'])

      if (cached) {
        queryClient.setQueryData<GetManageRestaurantResponse>(
          ['managed-restaurant'],

          {
            ...cached,
            name,
            description,
          })
      }
    },

  })

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Perfil atualizado com sucesso')
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente!')
    }
  }

  return (
    <DialogHeader>
      <DialogTitle>Perfil da loja</DialogTitle>
      <DialogDescription>
        Atualize as informações do seu estabelecimento ao seu cliente
      </DialogDescription>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input
              className="col-span-3"
              id="name"
              {...register('name')}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="ghost"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="success"
            disabled={isSubmitting}
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogHeader>
  )
}
