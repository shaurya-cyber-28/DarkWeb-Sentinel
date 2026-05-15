import React from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle, Shield, Database, Activity,
  TrendingUp, Lock, Brain, Target, Crosshair, Flame
} from 'lucide-react'
import GlowCard from '../components/ui/GlowCard.jsx'
import ThreatBadge from '../components/ui/ThreatBadge.jsx'
import AnimatedCounter from '../components/ui/AnimatedCounter.jsx'
import ThreatAreaChart from '../components/charts/ThreatAreaChart.jsx'
import SeverityBarChart from '../components/charts/SeverityBarChart.jsx'
import { threatStats, ransomwareGroups } from '../data/mockThreats.js'

const STAT_CARDS = [
  { label: 'Global Threat Score',      value: threatStats.globalThreatScore,     suffix: '/100', icon: Target,    color: 'text-red-400',    glow: 'red',    severity: 'CRITICAL' },
  { label: 'Active Breach Alerts',     value: threatStats.activeBreaches,         suffix: '',     icon: AlertTriangle, color: 'text-amber-400', glow: 'magenta', severity: 'HIGH' },
  { label: 'Monitored Sources',        value: threatStats.monitoredSources,       suffix: '',     icon: Database,  color: 'text-purple-400', glow: 'purple', severity: null       },
  { label: 'Compromised Organizations',value: threatStats.compromisedOrgs,        suffix: '',     icon: Shield,    color: 'text-red-400',    glow: 'red',    severity: 'HIGH'     },
  { label: 'Leaked Credentials',       value: threatStats.leakedCredentials,      suffix: '',     icon: Lock,      color: 'text-amber-400',  glow: 'magenta',severity: 'CRITICAL' },
  { label: 'Active Campaigns',         value: threatStats.activeCampaigns,        suffix: '',     icon: Crosshair, color: 'text-red-400',    glow: 'red',    severity: 'HIGH'     },
  { label: 'Ransomware Groups Active', value: threatStats.ransomwareGroups,       suffix: '',     icon: Flame,     color: 'text-orange-400', glow: 'red',    severity: 'HIGH'     },
  { label: 'AI Confidence',            value: threatStats.aiConfidence,           suffix: '%',    icon: Brain,     color: 'text-green-400',  glow: 'green',  severity: null       },
]

function AIConfidenceMeter({ value }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-xs text-sentinel-muted">AI Confidence</span>
        <span className="font-mono text-xs font-bold text-green-400">{value}%</span>
      </div>
      <div className="h-2 bg-sentinel-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #22c55e, #86efac)' }}
        />
      </div>
    </div>
  )
}

export default function Overview() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-xl font-bold text-white flex items-center gap-2">
            <Activity size={20} className="text-sentinel-purple" />
            OVERVIEW DASHBOARD
          </h1>
          <p className="font-mono text-xs text-sentinel-muted mt-1">
            Real-time threat intelligence summary — AUTO-REFRESH: 30s
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-950/30 border border-red-500/30 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-red-500 status-live" />
          <span className="font-mono text-xs text-red-400 font-bold">THREAT LEVEL: CRITICAL</span>
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STAT_CARDS.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <GlowCard glow={stat.glow} className="h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-black/40 border border-sentinel-border flex items-center justify-center">
                    <Icon size={15} className={stat.color} />
                  </div>
                  {stat.severity && <ThreatBadge severity={stat.severity} pulse={stat.severity === 'CRITICAL'} />}
                </div>
                <div className={`font-mono text-2xl font-black ${stat.color}`}>
                  <AnimatedCounter value={stat.value} delay={i * 100} />
                  <span className="text-sm ml-0.5 font-medium opacity-70">{stat.suffix}</span>
                </div>
                <div className="font-mono text-xs text-sentinel-muted mt-1 leading-tight">{stat.label}</div>
              </GlowCard>
            </motion.div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <GlowCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-mono text-sm font-bold text-sentinel-text">24h Threat Activity</h3>
                <p className="font-mono text-xs text-sentinel-muted">Threats / Breaches / Leaks over time</p>
              </div>
              <TrendingUp size={16} className="text-sentinel-purple" />
            </div>
            <ThreatAreaChart />
          </GlowCard>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <GlowCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-mono text-sm font-bold text-sentinel-text">Event Severity Distribution</h3>
                <p className="font-mono text-xs text-sentinel-muted">Classified by risk level</p>
              </div>
              <Target size={16} className="text-sentinel-purple" />
            </div>
            <SeverityBarChart />
          </GlowCard>
        </motion.div>
      </div>

      {/* Ransomware + AI meter */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Ransomware groups */}
        <div className="lg:col-span-2">
          <GlowCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-sm font-bold text-sentinel-text flex items-center gap-2">
                <Flame size={15} className="text-red-400" />
                Active Ransomware Groups
              </h3>
              <span className="font-mono text-xs text-red-400 border border-red-500/30 px-2 py-0.5 rounded">{ransomwareGroups.length} TRACKED</span>
            </div>
            <div className="space-y-3">
              {ransomwareGroups.map((group, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="font-mono text-xs text-sentinel-dim w-28 truncate">{group.name}</div>
                  <div className="flex-1 h-2 bg-sentinel-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${group.activity}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: group.color, opacity: 0.8 }}
                    />
                  </div>
                  <div className="font-mono text-xs w-8 text-right" style={{ color: group.color }}>
                    {group.activity}%
                  </div>
                  <div className={`font-mono text-xs w-16 text-right ${
                    group.status === 'ACTIVE' ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {group.status}
                  </div>
                  <div className="font-mono text-xs text-sentinel-muted w-12 text-right">
                    {group.targets} tgts
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* AI Status */}
        <GlowCard glow="green">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={16} className="text-green-400" />
            <h3 className="font-mono text-sm font-bold text-sentinel-text">AI Engine Status</h3>
          </div>
          <div className="space-y-4">
            <AIConfidenceMeter value={94.2} />
            {[
              { label: 'NLP Processing',     value: 98, color: '#22c55e' },
              { label: 'IOC Detection',       value: 91, color: '#a855f7' },
              { label: 'Actor Attribution',   value: 87, color: '#f59e0b' },
              { label: 'Pattern Matching',    value: 95, color: '#06b6d4' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="font-mono text-xs text-sentinel-muted">{item.label}</span>
                  <span className="font-mono text-xs font-bold" style={{ color: item.color }}>{item.value}%</span>
                </div>
                <div className="h-1.5 bg-sentinel-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color, opacity: 0.7 }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-sentinel-border space-y-2">
              {[
                { label: 'Sources Processed', value: '1,847' },
                { label: 'Models Active',      value: '7' },
                { label: 'Last Updated',       value: '12s ago' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="font-mono text-xs text-sentinel-muted">{item.label}</span>
                  <span className="font-mono text-xs text-sentinel-text">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  )
}