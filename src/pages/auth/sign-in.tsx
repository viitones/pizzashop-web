/* eslint-disable @stylistic/max-len */
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      console.log(data)

      await authenticate({ email: data.email })

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('Credencias inválidas')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">

        <Button asChild variant="ghost" className="absolute right-8 top-8">
          <Link to="/sign-up">
            Novo estabelecimento
          </Link>
        </Button>

        <div className="w-[340px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className=" text-2xl font-semibold tracking-tighter">Acessar painel</h1>
            <p className=" text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do parceiro</p>
          </div>

          <form className=" space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className=" space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">Acessar Painel</Button>
          </form>
        </div>
      </div>
    </>
  )
}
