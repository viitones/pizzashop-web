import { http, HttpResponse } from 'msw'
import { GetOrderDetailsParams, GetOrderDetailsResponse } from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '(11) 99999-9999',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 'item1',
        priceInCents: 1000,
        quantity: 1,
        product: {
          name: 'Pizza Margherita',
        },
      },
      {
        id: 'item2',
        priceInCents: 2000,
        quantity: 2,
        product: {
          name: 'Pizza Peperoni',
        },
      },
    ],
    totalInCents: 5000,
  })
})
