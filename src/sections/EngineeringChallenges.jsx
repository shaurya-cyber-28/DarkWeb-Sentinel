import React from 'react'
import { motion } from 'framer-motion'
import { FlaskConical, Shield, Globe, GitMerge, Database, Activity } from 'lucide-react'
import GlowCard from '../components/ui/GlowCard.jsx'

const CHALLENGES = [
  {
    num: '01',
    icon: Shield,
    title: 'Maintaining Anonymity While Monitoring Hostile Networks',
    color: '#a855f7',
    challenge: 'Dark web forums actively detect and ban scrapers. Forum operators deploy honeypot accounts, CAPTCHA systems, JavaScript fingerprinting, and IP-based rate limiting. Maintaining persistent anonymous access requires sophisticated countermeasures.',
    solution: 'Multi-hop Tor circuit rotation with 10-minute intervals. Headless browser automation via Playwright with humanized timing patterns. Session persistence management. Distributed identity pool with 200+ forum accounts. Rate limiting mimicking human browse patterns.',
    metrics: [
      { label: 'Detection Rate',    value: '< 0.3%' },
      { label: 'Session Stability', value: '99.2%'  },
      { label: 'Tor Hops',          value: '3–6'    },
    ],
  },
  {
    num: '02',
    icon: Globe,
    title: 'Processing Multilingual Threat Intelligence',
    color: '#d946ef',
    challenge: 'Underground forums operate in 12+ languages including Russian, Mandarin, Arabic, Persian, and Romanian. Slang, obfuscated terminology, and threat-actor-specific jargon require specialized language models beyond standard NLP pipelines.',
    solution: 'Fine-tuned multilingual BERT models trained on cybersecurity domain text. Custom vocabulary extensions for dark web slang. Translation pipeline with domain-aware post-processing. Confidence scoring for low-resource language outputs.',
    metrics: [
      { label: 'Languages Supported', value: '12'   },
      { label: 'Translation Accuracy',value: '89%'  },
      { label: 'IOC Extraction',       value: '94%'  },
    ],
  },
  {
    num: '03',
    icon: GitMerge,
    title: 'Correlating Fragmented Intelligence Across Isolated Sources',
    color: '#ef4444',
    challenge: 'Threat actors deliberately fragment their digital footprints across isolated platforms. The same actor may use different aliases, languages, and infrastructure on each forum. Cross-source entity resolution without ground truth labels is extremely difficult.',
    solution: 'Graph-based entity resolution using embedding similarity. Fuzzy matching on infrastructure overlap. Behavioral fingerprinting via writing style analysis. Probabilistic attribution with confidence intervals. Human-in-the-loop validation for critical attributions.',
    metrics: [
      { label: 'Attribution Rate',  value: '67%'   },
      { label: 'False Positives',   value: '< 8%'  },
      { label: 'Entity Resolution', value: '91%'   },
    ],
  },
  {
    num: '04',
    icon: Database,
    title: 'Large-Scale Leak Monitoring and Deduplication',
    color: '#f59e0b',
    challenge: 'Credential dumps are reposted across dozens of platforms with minor modifications. Processing millions of records efficiently while identifying unique new exposures versus recycled data requires high-performance deduplication at scale.',
    solution: 'MinHash LSH for approximate deduplication at scale. Hash-based exact deduplication for clean records. Bloom filter membership testing for O(1) known-record lookup. Incremental processing pipeline with delta detection. Breach age estimation via cross-reference dating.',
    metrics: [
      { label: 'Records Indexed',   value: '4.7M+' },
      { label: 'Dedup Accuracy',    value: '99.1%' },
      { label: 'Processing Speed',  value: '50K/s' },
    ],
  },
  {
    num: '05',
    icon: Activity,
    title: 'Real-Time Threat Visualization at Scale',
    color: '#22c55e',
    challenge: 'Presenting live threat intelligence to SOC analysts without overwhelming them requires intelligent aggregation, priority filtering, and progressive disclosure patterns. Raw feed data would produce hundreds of updates per minute.',
    solution: 'Client-side aggregation with configurable severity thresholds. Event batching with 30-second flush intervals. Priority queue with decay scoring for aging alerts. Adaptive UI density based on analyst workload indicators. WebSocket feeds with intelligent reconnection.',
    metrics: [
      { label: 'Feed Latency',    value: '< 2s'   },
      { label: 'Alert Precision', value: '87%'    },
      { label: 'UI Render (p95)', value: '< 16ms' },
    ],
  },
]

export default function EngineeringChallenges() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-mono text-xl font-bold text-white flex items-center gap-2">
          <FlaskConical size={20} className="text-sentinel-purple" />
          ENGINEERING CHALLENGES
        </h1>
        <p className="font-mono text-xs text-sentinel-muted mt-1">
          Core technical problems solved in building DarkWeb Sentinel
        </p>
      </div>

      <div className="space-y-6">
        {CHALLENGES.map((ch, i) => {
          const Icon = ch.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlowCard padding={false} className="overflow-hidden">
                {/* Challenge header */}
                <div className="p-5 border-b border-sentinel-border"
                  style={{ background: `linear-gradient(135deg, ${ch.color}12 0%, transparent 50%)` }}>
                  <div className="flex items-center gap-4">
                    <div className="font-mono text-4xl font-black opacity-20" style={{ color: ch.color }}>
                      {ch.num}
                    </div>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center border flex-shrink-0"
                      style={{ backgroundColor: ch.color + '20', borderColor: ch.color + '40' }}>
                      <Icon size={17} style={{ color: ch.color }} />
                    </div>
                    <h3 className="font-mono text-sm font-bold text-sentinel-text leading-snug">
                      {ch.title}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="font-mono text-xs font-bold text-red-400 mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      THE CHALLENGE
                    </div>
                    <p className="font-mono text-xs text-sentinel-dim leading-relaxed">{ch.challenge}</p>
                  </div>
                  <div>
                    <div className="font-mono text-xs font-bold text-green-400 mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      OUR SOLUTION
                    </div>
                    <p className="font-mono text-xs text-sentinel-dim leading-relaxed">{ch.solution}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="px-5 pb-5">
                  <div className="grid grid-cols-3 gap-3">
                    {ch.metrics.map((m, j) => (
                      <div key={j} className="p-3 rounded-lg bg-black/30 border border-sentinel-border text-center">
                        <div className="font-mono text-sm font-black" style={{ color: ch.color }}>{m.value}</div>
                        <div className="font-mono text-xs text-sentinel-muted mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}