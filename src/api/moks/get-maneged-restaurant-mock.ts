import { http, HttpResponse } from 'msw'
import { GetManageRestaurantResponse } from '../get-manage-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManageRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'custom-restaurant-id',
    name: 'Pizza Shop',
    description: 'A lovely and stylish restaurant',
    managerId: 'custom-user-id',
    createdAt: new Date(),
    updatedAt: null,
  })
})
