'use client'

import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { StatsProps } from "@/types/predications"

export default function DashboardStats({ predicationsData }: StatsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Statistiques des vues</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={predicationsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR', { month: 'short' })}
            />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value} vues`, 'Vues']}
              labelFormatter={(date) => new Date(date).toLocaleDateString('fr-FR')}
            />
            <Line 
              type="monotone" 
              dataKey="vues" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}