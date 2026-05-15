import React from 'react'
import { motion } from 'framer-motion'
import { Network, ArrowRight, Server, Database, Brain, Shield, AlertTriangle, FileText } from 'lucide-react'
import GlowCard from '../components/ui/GlowCard.jsx'

const PIPELINE = [
  { icon: Network,        label: 'Tor Network',         sublabel: 'Anonymized access layer',  color: '#a855f7', desc: 'Onion routing across 6,000+ relays. Hidden service crawling with circuit rotation every 10 minutes.' },
  { icon: Server,         label: 'Collection Engine',   sublabel: 'Multi-protocol scraper',   color: '#d946ef', desc: 'Simultaneous crawling of 1,847 sources. Rate-limited, session-managed, stealth-mode scraping.' },
  { icon: Database,       label: 'Threat Processing',   sublabel: 'Raw intelligence parsing',  color: '#ec4899', desc: 'Structured extraction from unstructured dark web content. IOC parsing, deduplication, normalization.' },
  { icon: Brain,          label: 'NLP Analysis',        sublabel: 'AI language processing',   color: '#f59e0b', desc: 'Multi-lingual NLP across 12 languages. Sentiment analysis, entity extraction, topic modeling.' },
  { icon: Network,        label: 'Threat Correlation',  sublabel: 'Intelligence fusion',       color: '#ef4444', desc: 'Graph-based relationship engine. Connects entities across campaigns, actors, and infrastructure.' },
  { icon: Shield,         label: 'Risk Scoring',        sublabel: 'AI-driven assessment',     color: '#22c55e', desc: 'Dynamic risk models combining source reliability, recency, corroboration, and impact analysis.' },
  { icon: AlertTriangle,  label: 'Alert Engine',        sublabel: 'Priority notification',    color: '#06b6d4', desc: 'Threshold-based alerting with ML noise reduction. Supports SIEM integration via webhook.' },
  { icon: FileText,       label: 'SOC Reports',         sublabel: 'Intelligence products',    color: '#a855f7', desc: 'Automated report generation with executive summaries, IOC tables, and mitigation playbooks.' },
]

const TECH_STACK = [
  { layer: 'Collection',  items: ['Python Scrapy', 'Stem/Tor', 'Playwright', 'BeautifulSoup'] },
  { layer: 'Processing',  items: ['FastAPI', 'Celery', 'Redis', 'SQLite/PostgreSQL']           },
  { layer: 'AI/NLP',      items: ['spaCy', 'HuggingFace', 'BERT', 'scikit-learn']             },
  { layer: 'Frontend',    items: ['React', 'Vite', 'TailwindCSS', 'Framer Motion']             },
  { layer: 'Visualization',items:['Recharts', 'React Flow', 'D3.js', 'SVG']                   },
]

export default function Architecture() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="font-mono text-xl font-bold text-white flex items-center gap-2">
          <Network size={20} className="text-sentinel-purple" />
          SYSTEM ARCHITECTURE
        </h1>
        <p className="font-mono text-xs text-sentinel-muted mt-1">
          Intelligence collection and processing pipeline
        </p>
      </div>

      {/* Pipeline */}
      <div>
        <h2 className="font-mono text-sm font-bold text-sentinel-dim mb-6 tracking-widest">PROCESSING PIPELINE</h2>

        {/* Desktop horizontal flow */}
        <div className="hidden lg:flex items-start gap-0 overflow-x-auto pb-4">
          {PIPELINE.map((step, i) => {
            const Icon = step.icon
            return (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex-1 min-w-[110px]"
                >
                  <div className="p-4 rounded-xl border bg-sentinel-card border-sentinel-border hover:border-opacity-60 transition-all group text-center"
                    style={{ '--glow-color': step.color }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 border transition-all group-hover:shadow-lg"
                      style={{
                        backgroundColor: step.color + '20',
                        borderColor: step.color + '40',
                        boxShadow: `0 0 0 rgba(0,0,0,0)`
                      }}
                    >
                      <Icon size={18} style={{ color: step.color }} />
                    </div>
                    <div className="font-mono text-xs font-bold text-sentinel-text leading-tight mb-1">{step.label}</div>
                    <div className="font-mono text-xs text-sentinel-muted leading-tight">{step.sublabel}</div>

                    {/* Step number */}
                    <div className="mt-2 font-mono text-xs font-black" style={{ color: step.color }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Desc tooltip */}
                  <div className="mt-2 px-1">
                    <p className="font-mono text-xs text-sentinel-muted/60 leading-relaxed text-center hidden xl:block" style={{ fontSize: '9px' }}>
                      {step.desc.substring(0, 60)}...
                    </p>
                  </div>
                </motion.div>

                {i < PIPELINE.length - 1 && (
                  <div className="flex items-center pt-7 flex-shrink-0 px-1">
                    <div className="flex items-center gap-0.5">
                      <div className="w-4 h-px" style={{ backgroundColor: step.color + '60' }} />
                      <ArrowRight size={12} style={{ color: step.color + '80' }} />
                    </div>
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Mobile vertical flow */}
        <div className="lg:hidden space-y-3">
          {PIPELINE.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlowCard className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
                    style={{ backgroundColor: step.color + '20', borderColor: step.color + '40' }}>
                    <Icon size={18} style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-bold text-sentinel-text">{step.label}</div>
                    <div className="font-mono text-xs text-sentinel-muted">{step.sublabel}</div>
                  </div>
                  <div className="ml-auto font-mono text-lg font-black opacity-30" style={{ color: step.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Full detail cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {PIPELINE.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.07 }}
            >
              <GlowCard>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border"
                    style={{ backgroundColor: step.color + '20', borderColor: step.color + '40' }}>
                    <Icon size={15} style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-black" style={{ color: step.color }}>
                        LAYER {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="font-mono text-sm font-bold text-sentinel-text mb-1">{step.label}</div>
                    <p className="font-mono text-xs text-sentinel-dim leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          )
        })}
      </div>

      {/* Tech stack */}
      <GlowCard>
        <h3 className="font-mono text-sm font-bold text-sentinel-text mb-4 flex items-center gap-2">
          <Database size={14} className="text-sentinel-purple" />
          TECHNOLOGY STACK
        </h3>
        <div className="grid md:grid-cols-5 gap-4">
          {TECH_STACK.map((group, i) => (
            <div key={i}>
              <div className="font-mono text-xs font-bold text-sentinel-purple mb-2 tracking-wider">{group.layer}</div>
              <div className="space-y-1.5">
                {group.items.map(item => (
                  <div key={item} className="font-mono text-xs px-2 py-1.5 bg-black/40 border border-sentinel-border rounded text-sentinel-dim">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlowCard>
    </div>
  )
}