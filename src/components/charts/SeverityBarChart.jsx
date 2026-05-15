import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'
import { severityData } from '../../data/mockThreats.js'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-lg p-3">
      <p className="font-mono text-xs text-sentinel-dim">{payload[0].payload.category}</p>
      <p className="font-mono text-sm font-bold" style={{ color: payload[0].payload.fill }}>
        {payload[0].value} events
      </p>
    </div>
  )
}

export default function SeverityBarChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={severityData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(168,85,247,0.08)" vertical={false} />
        <XAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 9, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="count" radius={[3, 3, 0, 0]}>
          {severityData.map((entry, index) => (
            <Cell key={index} fill={entry.fill} fillOpacity={0.8} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}