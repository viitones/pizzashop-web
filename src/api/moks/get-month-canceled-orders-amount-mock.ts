import { http, HttpResponse } from 'msw'
import { GetMonthCanceledAmountResponse } from '../get-month-canceled-orders-amounth'
export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledAmountResponse
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  })
})
