import { http, HttpResponse } from 'msw'
import { GetMonthRevenueAmountResponse } from '../get-month-revenue'
export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueAmountResponse
>('/metrics/month-receipt', () => {
  return HttpResponse.json({
    receipt: 20000,
    diffFromLastMonth: 10,
  })
})
