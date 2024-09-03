import { api } from '@/lib/axios'

interface GetManageRestaurantResponse {
  name: string;
  id: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
}
export async function getManageRestaurant() {
  const response = await api.get<GetManageRestaurantResponse>('/managed-restaurant')

  return response.data
}
