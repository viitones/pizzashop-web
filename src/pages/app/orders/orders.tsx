/* eslint-disable @stylistic/max-len */
import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'

export function Orders() {
  const { data: result } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  })

  return (
    <>
      <Helmet title="Pedidos" />
      <div className="fle flex-col gap-4">
        <h1 className=" text-3xl font-bold tracking-tight">Pedidos</h1>
      </div>
      <div className=" space-y-2.5 ">

        <OrderTableFilters />

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]" />
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do Pedido</TableHead>
                <TableHead className="w-[164px]" />
                <TableHead className="w-[132px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {result && result.orders.map(order => {
                return <OrderTableRow key={order.orderId} order={order} />
              })}
            </TableBody>
          </Table>
        </div>

        <Pagination pageIndex={0} totalCount={105} perPage={10} />
      </div>
    </>
  )
}
