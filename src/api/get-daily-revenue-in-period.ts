/* eslint-disable @stylistic/max-len */
import { api } from '@/lib/axios'

export interface getDailyRevenueInPeriodQuery {
  from ?: Date
  to ?: Date
}

export type GetDailyRevenuePeriodResponse = {
  date: string
  receipt: number
}[]

export async function getDailyRevenueInPeriod({ from, to }: getDailyRevenueInPeriodQuery) {
  const response = await api.get<GetDailyRevenuePeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
