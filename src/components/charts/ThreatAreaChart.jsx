import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { threatTimeline } from '../../data/mockThreats.js'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-lg p-3 border-sentinel-purple/30">
      <p className="font-mono text-xs text-sentinel-purple mb-2">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="font-mono text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  )
}

export default function ThreatAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={threatTimeline} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gradThreats" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}   />
          </linearGradient>
          <linearGradient id="gradBreaches" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}   />
          </linearGradient>
          <linearGradient id="gradLeaks" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#d946ef" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#d946ef" stopOpacity={0}   />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(168,85,247,0.08)" />
        <XAxis dataKey="time" tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="threats" name="Threats" stroke="#a855f7" fill="url(#gradThreats)" strokeWidth={2} />
        <Area type="monotone" dataKey="breaches" name="Breaches" stroke="#ef4444" fill="url(#gradBreaches)" strokeWidth={2} />
        <Area type="monotone" dataKey="leaks" name="Leaks" stroke="#d946ef" fill="url(#gradLeaks)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}