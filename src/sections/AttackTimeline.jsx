import React from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle, ChevronRight } from 'lucide-react'
import GlowCard from '../components/ui/GlowCard.jsx'
import ThreatBadge from '../components/ui/ThreatBadge.jsx'
import { timelineEvents } from '../data/mockReports.js'

const PHASE_COLORS = {
  'Initial Access': '#f59e0b',
  'Execution':      '#f97316',
  'Exfiltration':   '#ef4444',
  'Impact':         '#dc2626',
  'Extortion':      '#b91c1c',
  'Publication':    '#991b1b',
  'Intelligence':   '#a855f7',
  'Detection':      '#22c55e',
}

const SEV_COLORS = {
  critical: { bg: 'bg-red-950/60',    border: 'border-red-500/50',    icon: 'text-red-400'    },
  high:     { bg: 'bg-amber-950/60',  border: 'border-amber-500/50',  icon: 'text-amber-400'  },
  medium:   { bg: 'bg-purple-950/60', border: 'border-purple-500/50', icon: 'text-purple-400' },
  info:     { bg: 'bg-green-950/40',  border: 'border-green-500/30',  icon: 'text-green-400'  },
}

export default function AttackTimeline() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-mono text-xl font-bold text-white flex items-center gap-2">
          <Clock size={20} className="text-sentinel-purple" />
          ATTACK TIMELINE
        </h1>
        <p className="font-mono text-xs text-sentinel-muted mt-1">
          LockBit 4.0 — ManuCorp Industries Breach — Full Incident Timeline
        </p>
      </div>

      {/* Case badge */}
      <GlowCard glow="red" className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle size={18} className="text-red-400" />
          <div>
            <div className="font-mono text-sm font-bold text-red-300">CASE: INC-2025-0047 — ACTIVE</div>
            <div className="font-mono text-xs text-sentinel-muted">LockBit 4.0 • ManuCorp Industries • $12M ransom • 4.7TB exfiltrated</div>
          </div>
        </div>
        <ThreatBadge severity="CRITICAL" pulse />
      </GlowCard>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[88px] top-0 bottom-0 w-px bg-gradient-to-b from-sentinel-purple/60 via-sentinel-purple/30 to-transparent" />

        <div className="space-y-6">
          {timelineEvents.map((event, i) => {
            const sevStyles = SEV_COLORS[event.severity] || SEV_COLORS.info
            const phaseColor = PHASE_COLORS[event.phase] || '#a855f7'

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6"
              >
                {/* Date/time */}
                <div className="w-20 text-right flex-shrink-0 pt-3">
                  <div className="font-mono text-xs font-bold text-sentinel-purple">{event.date}</div>
                  <div className="font-mono text-xs text-sentinel-muted">{event.time}</div>
                </div>

                {/* Node */}
                <div className="flex-shrink-0 pt-3 relative z-10">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sevStyles.border}`}
                    style={{ backgroundColor: phaseColor + '33', borderColor: phaseColor }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: phaseColor }} />
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-xl p-4 border ${sevStyles.bg} ${sevStyles.border}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                          style={{ color: phaseColor, backgroundColor: phaseColor + '20', border: `1px solid ${phaseColor}40` }}
                        >
                          {event.phase}
                        </span>
                      </div>
                      <h3 className="font-mono text-sm font-bold text-sentinel-text">{event.title}</h3>
                    </div>
                    <ThreatBadge severity={event.severity.toUpperCase()} />
                  </div>
                  <p className="font-mono text-xs text-sentinel-dim leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Attack phase summary */}
      <GlowCard>
        <h3 className="font-mono text-sm font-bold text-sentinel-text mb-4">MITRE ATT&CK PHASES DETECTED</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { phase: 'Initial Access',  count: 2, tactic: 'T1078 — Valid Accounts'         },
            { phase: 'Execution',       count: 3, tactic: 'T1059 — Command & Scripting'    },
            { phase: 'Exfiltration',    count: 4, tactic: 'T1048 — Exfil Over Alt Channel' },
            { phase: 'Impact',          count: 5, tactic: 'T1486 — Data Encrypted'         },
          ].map((p, i) => (
            <div key={i} className="p-3 rounded-lg bg-black/30 border border-sentinel-border">
              <div className="font-mono text-xs font-bold text-sentinel-purple mb-1">{p.phase}</div>
              <div className="font-mono text-lg font-black text-sentinel-text">{p.count}</div>
              <div className="font-mono text-xs text-sentinel-muted mt-1">{p.tactic}</div>
            </div>
          ))}
        </div>
      </GlowCard>
    </div>
  )
}