/* eslint-disable @stylistic/max-len */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import colors from 'tailwindcss/colors'

const data = [
  { date: '10/12', revenue: 900 },
  { date: '12/12', revenue: 120 },
  { date: '13/12', revenue: 400 },
  { date: '14/12', revenue: 700 },
  { date: '15/12', revenue: 1500 },
  { date: '16/12', revenue: 100 },
  { date: '17/12', revenue: 1500 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita no período</CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <XAxis tickLine={false} axisLine={false} dy={16} dataKey="date" />
            <YAxis
              stroke="#888" axisLine={false} tickLine={false} width={80} tickFormatter={(value:number) => value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            />

            <CartesianGrid vertical={false} className="stroke-muted" />

            <Line type="linear" strokeWidth={2} dataKey="revenue" stroke={colors.violet['500']} />

          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
