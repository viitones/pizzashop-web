import { api } from '@/lib/axios'

export type GetPopularProductsAmountResponse = {
  product: string
  amount: number
}[]

export async function getPopularProductsAmount() {
  const response = await api.get<GetPopularProductsAmountResponse>(
    '/metrics/popular-products',
  )

  return response.data
}
