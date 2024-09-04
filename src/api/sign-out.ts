import { api } from '@/lib/axios'

export async function SignOut() {
  await api.post('/sign-out')
}
