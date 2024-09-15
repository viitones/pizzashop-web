/* eslint-disable @stylistic/max-len */
import { getMonthCanceledAmount } from '@/api/get-month-canceled-orders-amounth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'
import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryFn: getMonthCanceledAmount,
    queryKey: ['metrics', 'monthCanceledOrdersAmount'],
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Cancelamentos (mês)</CardTitle>
        <DollarSign className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount
          ? (
            <>
              <span className=" text-2xl font-bold tracking-tight">
                {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
              </span>
              <p className="text-xs text-muted-foreground">
                {monthCanceledOrdersAmount.diffFromLastMonth < 0
                  ? (
                    <>
                      <span className=" text-emerald-500 dark:text-emerald-400">{monthCanceledOrdersAmount.diffFromLastMonth}%</span> em relação o mês passado
                    </>
                    )
                  : (
                    <>
                      <span className=" text-rose-500 dark:text-rose-400">+{monthCanceledOrdersAmount.diffFromLastMonth}%</span> em relação ao mês passado
                    </>
                    )}
              </p>
            </>
            )
          : <MetricCardSkeleton />}
      </CardContent>
    </Card>
  )
}
