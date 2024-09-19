/* eslint-disable @stylistic/max-len */
export type OrderStatusT =
  'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatusT
}

// record é a prop para objeto
const orderStatusMap: Record<OrderStatusT, string> = {
  pending: 'Pendente',
  canceled: 'Cancelado',
  delivered: 'Entregue',
  delivering: 'Em entrega',
  processing: 'Em preparo',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span data-testid="badge" className="h-2 w-2 rounded-full bg-slate-400" />
      )}
      {status === 'canceled' && (
        <span data-testid="badge" className="h-2 w-2 rounded-full bg-rose-500" />
      )}
      {status === 'delivered' && (
        <span data-testid="badge" className="h-2 w-2 rounded-full bg-emerald-500" />
      )}
      {['processing', 'delivering'].includes(status) && (
        <span data-testid="badge" className="h-2 w-2 rounded-full bg-amber-400" />
      )}

      <span className=" font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>

    </div>
  )
}

  <div className="flex items-center gap-2">
    <span className="h-2 w-2 rounded-full bg-slate-400" />

  </div>
