import { getManageRestaurant } from '@/api/get-manage-restaurant'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
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
  const {
    data: manageRestaurant,
  } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManageRestaurant,
  })

  const {
    register,
    handleSubmit,
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: manageRestaurant?.name ?? '',
      description: manageRestaurant?.description ?? '',
    },
  })

  return (
    <DialogHeader>
      <DialogTitle>Perfil da loja</DialogTitle>
      <DialogDescription>
        Atualize as informações do seu estabelecimento ao seu cliente
      </DialogDescription>

      <form action="">
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
          <Button variant="ghost">Cancelar</Button>
          <Button type="submit" variant="success">Salvar</Button>
        </DialogFooter>
      </form>
    </DialogHeader>
  )
}
