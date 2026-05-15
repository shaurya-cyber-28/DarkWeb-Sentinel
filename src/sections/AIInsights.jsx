import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, MessageSquare, Tag, Search, Globe, ChevronRight } from 'lucide-react'
import GlowCard from '../components/ui/GlowCard.jsx'
import ThreatBadge from '../components/ui/ThreatBadge.jsx'

const AI_SUMMARIES = [
  {
    id: 1,
    title: 'Campaign Attribution — LockBit 4.0',
    confidence: 96,
    category: 'Attribution',
    color: '#ef4444',
    text: 'Based on TTP analysis across 14 incidents, infrastructure fingerprinting of 37 C2 servers, and linguistic analysis of negotiation transcripts, DarkWeb Sentinel AI attributes this campaign to LockBit 4.0 with high confidence. Shared tooling with previous LockBit 3.0 campaigns confirmed via YARA signature matching (18 rules).',
    entities: ['LockBit 4.0', 'RaaS', 'UEFI Bootkit', 'Cobalt Strike', 'ExMatter'],
    keywords: ['ransomware', 'double-extortion', 'uefi', 'finance-sector', 'affiliate'],
    sentiment: 'hostile',
    language: 'EN / RU',
  },
  {
    id: 2,
    title: 'Credential Market Analysis — Q2 2025',
    confidence: 88,
    category: 'Market Intelligence',
    color: '#f59e0b',
    text: 'AI analysis of 847 marketplace listings across 12 underground platforms reveals a 34% increase in corporate VPN credential sales compared to Q1 2025. Premium access (Fortune 500 targets) commands $500–$2,000 per listing. Fortinet and Pulse Secure credentials show highest demand. Initial access broker ecosystem expanding.',
    entities: ['Initial Access Brokers', 'Fortinet VPN', 'Pulse Secure', 'Fortune 500'],
    keywords: ['credentials', 'initial-access', 'vpn', 'market-pricing', 'brokers'],
    sentiment: 'escalating',
    language: 'EN / RU / CN',
  },
]

const SENTIMENT_CONFIG = {
  hostile:    { color: '#ef4444', label: 'HOSTILE'    },
  escalating: { color: '#f59e0b', label: 'ESCALATING' },
  neutral:    { color: '#6b7280', label: 'NEUTRAL'    },
  declining:  { color: '#22c55e', label: 'DECLINING'  },
}

const IOC_DETECTION = [
  { type: 'IPv4', value: '185.220.101.47',          confidence: 'HIGH',   source: 'Passive DNS'  },
  { type: 'Hash', value: 'SHA256: 3f4a9b2c...',    confidence: 'HIGH',   source: 'VirusTotal'   },
  { type: 'URL',  value: 'lockbit4-xhj23.onion',   confidence: 'HIGH',   source: 'Crawl'        },
  { type: 'Email',value: 'j0hn_d03@proton.me',     confidence: 'MEDIUM', source: 'Forum OSINT'  },
  { type: 'CVE',  value: 'CVE-2025-1842',           confidence: 'HIGH',   source: 'Forum post'   },
]

function ConfidenceArc({ value, color }) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = `${(value / 100) * circumference} ${circumference}`

  return (
    <div className="relative w-24 h-24">
      <svg viewBox="0 0 96 96" className="w-24 h-24 -rotate-90">
        <circle cx="48" cy="48" r={radius} fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="6" />
        <motion.circle
          cx="48" cy="48" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-xl font-black" style={{ color }}>{value}%</span>
        <span className="font-mono text-xs text-sentinel-muted">CONF</span>
      </div>
    </div>
  )
}

export default function AIInsights() {
  const [activeTab, setActiveTab] = useState('summaries')
  const TABS = ['summaries', 'ioc-detection', 'entity-graph']

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-mono text-xl font-bold text-white flex items-center gap-2">
          <Brain size={20} className="text-green-400" />
          AI INTELLIGENCE ENGINE
        </h1>
        <p className="font-mono text-xs text-sentinel-muted mt-1">
          NLP analysis • Entity recognition • Sentiment scoring • IOC extraction
        </p>
      </div>

      {/* AI Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Models Active',    value: '7',     color: '#22c55e' },
          { label: 'Sources Analyzed', value: '1,847', color: '#a855f7' },
          { label: 'IOCs Extracted',   value: '14,293',color: '#f59e0b' },
          { label: 'Languages',        value: '12',    color: '#06b6d4' },
        ].map((s, i) => (
          <GlowCard key={i} glow="green">
            <div className="font-mono text-xl font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="font-mono text-xs text-sentinel-muted mt-1">{s.label}</div>
          </GlowCard>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-mono text-xs px-4 py-2 rounded-lg border transition-all capitalize ${
              activeTab === tab
                ? 'bg-green-950/40 border-green-500/50 text-green-400'
                : 'border-sentinel-border text-sentinel-muted hover:text-sentinel-text'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* AI Summaries */}
      {activeTab === 'summaries' && (
        <div className="space-y-6">
          {AI_SUMMARIES.map((item, i) => {
            const sentiment = SENTIMENT_CONFIG[item.sentiment]
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <GlowCard glow="green">
                  <div className="flex items-start gap-6">
                    <ConfidenceArc value={item.confidence} color={item.color} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                          style={{ color: item.color, backgroundColor: item.color + '20', border: `1px solid ${item.color}40` }}>
                          {item.category}
                        </span>
                        <span className="font-mono text-xs px-2 py-0.5 rounded border"
                          style={{ color: sentiment.color, borderColor: sentiment.color + '40', backgroundColor: sentiment.color + '15' }}>
                          SENTIMENT: {sentiment.label}
                        </span>
                        <span className="font-mono text-xs text-sentinel-muted ml-auto flex items-center gap-1">
                          <Globe size={11} /> {item.language}
                        </span>
                      </div>
                      <h3 className="font-mono text-sm font-bold text-sentinel-text mb-3">{item.title}</h3>
                      <p className="font-mono text-xs text-sentinel-dim leading-relaxed mb-4">{item.text}</p>

                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Search size={11} className="text-green-400" />
                            <span className="font-mono text-xs text-green-400 font-bold">ENTITIES</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.entities.map(e => (
                              <span key={e} className="font-mono text-xs px-2 py-0.5 bg-green-950/30 border border-green-500/20 rounded text-green-300">
                                {e}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Tag size={11} className="text-purple-400" />
                            <span className="font-mono text-xs text-purple-400 font-bold">KEYWORDS</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.keywords.map(k => (
                              <span key={k} className="font-mono text-xs px-2 py-0.5 bg-purple-950/30 border border-sentinel-purple/20 rounded text-purple-300">
                                #{k}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* IOC Detection */}
      {activeTab === 'ioc-detection' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <GlowCard>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-mono text-sm font-bold text-sentinel-text flex items-center gap-2">
                <Zap size={14} className="text-amber-400" />
                EXTRACTED INDICATORS OF COMPROMISE
              </h3>
              <span className="font-mono text-xs text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
                14,293 TOTAL
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-sentinel-border">
                    {['TYPE', 'INDICATOR', 'CONFIDENCE', 'SOURCE', 'ACTION'].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-sentinel-muted font-bold tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {IOC_DETECTION.map((ioc, i) => (
                    <tr key={i} className="border-b border-sentinel-border/50 hover:bg-white/2 transition-colors">
                      <td className="py-3 px-3 text-cyan-400 font-bold">{ioc.type}</td>
                      <td className="py-3 px-3 text-sentinel-green">
                        <code>{ioc.value}</code>
                      </td>
                      <td className="py-3 px-3">
                        <ThreatBadge severity={ioc.confidence === 'HIGH' ? 'HIGH' : 'MEDIUM'} />
                      </td>
                      <td className="py-3 px-3 text-sentinel-muted">{ioc.source}</td>
                      <td className="py-3 px-3">
                        <button className="flex items-center gap-1 text-sentinel-purple hover:text-purple-300 transition-colors">
                          Block <ChevronRight size={10} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlowCard>
        </motion.div>
      )}

      {/* Entity Graph placeholder */}
      {activeTab === 'entity-graph' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <GlowCard className="text-center py-16">
            <Brain size={40} className="text-green-400 mx-auto mb-4 opacity-50" />
            <div className="font-mono text-sm text-sentinel-muted mb-2">ENTITY RELATIONSHIP GRAPH</div>
            <div className="font-mono text-xs text-sentinel-muted/60">
              Navigate to <span className="text-sentinel-purple">Threat Correlation</span> for the full interactive graph
            </div>
          </GlowCard>
        </motion.div>
      )}
    </div>
  )
}