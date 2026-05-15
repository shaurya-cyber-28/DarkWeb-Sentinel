import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio, ChevronDown, ChevronUp, Filter, RefreshCw, Globe, ExternalLink } from 'lucide-react'
import GlowCard from '../components/ui/GlowCard.jsx'
import ThreatBadge from '../components/ui/ThreatBadge.jsx'
import { intelligenceItems } from '../data/mockIntelligence.js'

const TLP_COLORS = {
  'RED':   'bg-red-950/60 text-red-400 border-red-500/40',
  'AMBER': 'bg-amber-950/60 text-amber-400 border-amber-500/40',
  'GREEN': 'bg-green-950/60 text-green-400 border-green-500/40',
}

const SOURCE_COLORS = {
  'Ransomware Blog':    'text-red-400',
  'Exploit Forum':      'text-orange-400',
  'Malware Marketplace':'text-amber-400',
  'Credential Market':  'text-yellow-400',
  'HUMINT / OSINT':     'text-purple-400',
}

function IntelCard({ item, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <GlowCard
        glow={item.severity === 'CRITICAL' ? 'red' : item.severity === 'HIGH' ? 'magenta' : 'purple'}
        padding={false}
        className="overflow-hidden"
      >
        <div className="p-4">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <ThreatBadge severity={item.severity} pulse={item.severity === 'CRITICAL'} />
                <span className={`font-mono text-xs border px-2 py-0.5 rounded ${TLP_COLORS[item.tlp]}`}>
                  TLP:{item.tlp}
                </span>
                <span className={`font-mono text-xs ${SOURCE_COLORS[item.sourceType] || 'text-sentinel-muted'}`}>
                  {item.sourceType}
                </span>
              </div>
              <h3 className="font-mono text-sm font-bold text-sentinel-text leading-snug">{item.title}</h3>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-right">
                <div className="font-mono text-xs text-sentinel-muted">{item.timestamp}</div>
                <div className="font-mono text-xs font-bold text-sentinel-purple text-right">
                  RISK: {item.riskScore}
                </div>
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1.5 rounded-lg bg-black/30 text-sentinel-muted hover:text-sentinel-purple transition-colors"
              >
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          </div>

          {/* Source */}
          <div className="flex items-center gap-1.5 mb-3">
            <Globe size={11} className="text-sentinel-muted" />
            <span className="font-mono text-xs text-sentinel-muted">Source: </span>
            <span className="font-mono text-xs text-sentinel-purple">{item.source}</span>
            <span className="ml-1 font-mono text-xs text-sentinel-muted">• {item.language}</span>
          </div>

          {/* AI Summary */}
          <div className="p-3 rounded-lg bg-black/40 border border-sentinel-purple/10 mb-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sentinel-purple" />
              <span className="font-mono text-xs text-sentinel-purple font-bold">AI ANALYSIS</span>
            </div>
            <p className="font-mono text-xs text-sentinel-dim leading-relaxed">{item.aiSummary}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map(tag => (
              <span key={tag} className="font-mono text-xs px-2 py-0.5 bg-purple-950/30 border border-sentinel-purple/20 rounded text-sentinel-muted">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable IOCs */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-sentinel-border overflow-hidden"
            >
              <div className="p-4 bg-black/30">
                <h4 className="font-mono text-xs font-bold text-sentinel-muted mb-2">INDICATORS OF COMPROMISE (IOCs)</h4>
                <div className="space-y-1">
                  {item.iocs.map((ioc, i) => (
                    <div key={i} className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-red-400">▸</span>
                      <code className="text-sentinel-green bg-black/40 px-2 py-0.5 rounded">{ioc}</code>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlowCard>
    </motion.div>
  )
}

export default function IntelligenceFeed() {
  const [filter, setFilter] = useState('ALL')
  const FILTERS = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM']

  const filtered = filter === 'ALL'
    ? intelligenceItems
    : intelligenceItems.filter(i => i.severity === filter)

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-mono text-xl font-bold text-white flex items-center gap-2">
            <Radio size={20} className="text-sentinel-purple" />
            INTELLIGENCE FEED
          </h1>
          <p className="font-mono text-xs text-sentinel-muted mt-1">
            Dark web monitoring — underground sources — real-time AI analysis
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-950/30 border border-green-500/30 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 status-live" />
            <span className="font-mono text-xs text-green-400">LIVE MONITORING</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sentinel-border text-sentinel-muted hover:text-sentinel-purple hover:border-sentinel-purple/40 transition-colors font-mono text-xs">
            <RefreshCw size={12} />
            REFRESH
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter size={14} className="text-sentinel-muted" />
        <div className="flex gap-2">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-3 py-1.5 rounded-lg border transition-all ${
                filter === f
                  ? 'bg-sentinel-purple/20 border-sentinel-purple/60 text-sentinel-purple'
                  : 'border-sentinel-border text-sentinel-muted hover:text-sentinel-text hover:border-sentinel-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="ml-auto font-mono text-xs text-sentinel-muted">{filtered.length} items</span>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {filtered.map((item, i) => (
          <IntelCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}