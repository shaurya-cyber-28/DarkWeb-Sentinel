import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertOctagon, Mail, Lock, Key, Globe, Wallet, FileText, Shield, TrendingUp } from 'lucide-react'
import GlowCard from '../components/ui/GlowCard.jsx'
import ThreatBadge from '../components/ui/ThreatBadge.jsx'
import AnimatedCounter from '../components/ui/AnimatedCounter.jsx'
import { leakCategories, recentLeaks } from '../data/mockLeaks.js'

const ICON_MAP = { Mail, Lock, Key, Globe, Wallet, FileText }

function LeakCategoryCard({ cat, index }) {
  const Icon = ICON_MAP[cat.icon] || Shield
  const severityPct = { CRITICAL: 95, HIGH: 75, MEDIUM: 50, LOW: 25 }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08 }}
    >
      <GlowCard
        glow={cat.severity === 'CRITICAL' ? 'red' : cat.severity === 'HIGH' ? 'magenta' : 'purple'}
        className="text-center"
      >
        <div className="w-10 h-10 rounded-xl bg-black/40 border flex items-center justify-center mx-auto mb-3"
          style={{ borderColor: cat.color + '40' }}>
          <Icon size={18} style={{ color: cat.color }} />
        </div>
        <div className="font-mono text-2xl font-black mb-1" style={{ color: cat.color }}>
          <AnimatedCounter value={cat.count} delay={index * 100} />
        </div>
        <div className="font-mono text-xs text-sentinel-muted mb-3">{cat.label}</div>
        <ThreatBadge severity={cat.severity} />
        <div className="mt-3 h-1.5 bg-sentinel-border rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${severityPct[cat.severity]}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.08 }}
            className="h-full rounded-full"
            style={{ backgroundColor: cat.color }}
          />
        </div>
      </GlowCard>
    </motion.div>
  )
}

function LeakCard({ leak, index }) {
  const scoreColor = leak.riskScore >= 90 ? 'text-red-400' : leak.riskScore >= 70 ? 'text-amber-400' : 'text-purple-400'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
    >
      <GlowCard
        glow={leak.severity === 'CRITICAL' ? 'red' : 'purple'}
        className="relative overflow-hidden"
      >
        {/* Classified tape */}
        {leak.verified && (
          <div className="absolute top-3 right-3">
            <span className="font-mono text-xs bg-red-950/60 border border-red-500/40 text-red-400 px-2 py-0.5 rounded">
              VERIFIED
            </span>
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Risk score ring */}
          <div className="flex-shrink-0 relative w-14 h-14">
            <svg viewBox="0 0 56 56" className="w-14 h-14 -rotate-90">
              <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="4" />
              <circle
                cx="28" cy="28" r="22"
                fill="none"
                stroke={leak.riskScore >= 90 ? '#ef4444' : leak.riskScore >= 70 ? '#f59e0b' : '#a855f7'}
                strokeWidth="4"
                strokeDasharray={`${(leak.riskScore / 100) * 138} 138`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`font-mono text-xs font-black ${scoreColor}`}>{leak.riskScore}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <ThreatBadge severity={leak.severity} pulse={leak.severity === 'CRITICAL'} />
              <span className="font-mono text-xs text-sentinel-muted">{leak.age}</span>
            </div>
            <h3 className="font-mono text-sm font-bold text-sentinel-text mb-1">{leak.title}</h3>
            <div className="font-mono text-xs text-sentinel-muted mb-2">
              Source: <span className="text-sentinel-purple">{leak.source}</span> •
              Type: <span className="text-sentinel-dim">{leak.type}</span> •
              Records: <span className="text-amber-400 font-bold">{leak.records.toLocaleString()}</span>
            </div>

            {/* AI recommendation */}
            <div className="p-2.5 rounded-lg bg-black/40 border border-sentinel-purple/15">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp size={10} className="text-sentinel-purple" />
                <span className="font-mono text-xs text-sentinel-purple font-bold">AI RECOMMENDATION</span>
              </div>
              <p className="font-mono text-xs text-sentinel-dim leading-relaxed">{leak.aiRecommendation}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-2">
              {leak.tags.map(tag => (
                <span key={tag} className="font-mono text-xs px-1.5 py-0.5 bg-black/30 border border-sentinel-border rounded text-sentinel-muted">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}

export default function LeakMonitoring() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-xl font-bold text-white flex items-center gap-2">
            <AlertOctagon size={20} className="text-red-400" />
            LEAK MONITORING SYSTEM
          </h1>
          <p className="font-mono text-xs text-sentinel-muted mt-1">
            Credential, document & data breach detection across dark web marketplaces
          </p>
        </div>
        <div className="font-mono text-xs text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg bg-red-950/20">
          ⚠ 23 ACTIVE BREACHES
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {leakCategories.map((cat, i) => (
          <LeakCategoryCard key={cat.id} cat={cat} index={i} />
        ))}
      </div>

      {/* Recent leaks */}
      <div>
        <h2 className="font-mono text-sm font-bold text-sentinel-text mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 status-live" />
          RECENT LEAK DETECTIONS
        </h2>
        <div className="space-y-4">
          {recentLeaks.map((leak, i) => (
            <LeakCard key={leak.id} leak={leak} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}