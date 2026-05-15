import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Activity, Eye, Zap, ChevronRight, Terminal } from 'lucide-react'
import RadarPulse from '../components/ui/RadarPulse.jsx'
import TerminalText from '../components/ui/TerminalText.jsx'
import AnimatedCounter from '../components/ui/AnimatedCounter.jsx'
import { threatStats } from '../data/mockThreats.js'

const BOOT_LINES = [
  'Initializing DarkWeb Sentinel v3.2.1...',
  'Connecting to Tor network... [OK]',
  'Loading threat intelligence feeds... [1,847 sources]',
  'AI analysis engine online... [READY]',
  'Leak monitoring active... [4.7M credentials indexed]',
  'System operational. Monitoring underground activity.',
]

const FEATURES = [
  { icon: Eye,      label: 'Dark Web Monitoring',    desc: '1,847+ underground sources' },
  { icon: Activity, label: 'Real-Time Threat Intel', desc: 'AI-powered correlation'      },
  { icon: Zap,      label: 'Instant Leak Detection', desc: '4.7M+ credentials tracked'  },
  { icon: Terminal, label: 'SOC Report Generation',  desc: 'Enterprise-grade reports'    },
]

export default function Hero({ onNavigate }) {
  const [bootDone, setBootDone] = useState(false)

  return (
    <div className="min-h-full bg-sentinel-bg relative overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* Top classification banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-sentinel-purple/40" />
          <div className="flex items-center gap-2 px-4 py-1.5 border border-red-500/40 rounded-full bg-red-950/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 status-live" />
            <span className="font-mono text-xs text-red-400 tracking-widest font-bold">TLP:RED — CLASSIFIED INTELLIGENCE SYSTEM</span>
          </div>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-sentinel-purple/40" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Main content */}
          <div>
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield size={20} className="text-sentinel-purple" />
                <span className="font-mono text-xs text-sentinel-purple tracking-widest">AI-POWERED CYBER INTELLIGENCE</span>
              </div>

              <h1 className="text-5xl font-black text-white mb-2 leading-tight">
                DARKWEB
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #d946ef, #ec4899)' }}
                >
                  SENTINEL
                </span>
              </h1>

              <p className="text-sentinel-dim font-mono text-sm mt-4 leading-relaxed max-w-lg">
                Monitoring Underground Threat Ecosystems. AI-driven dark web intelligence,
                leak detection, and cyber threat correlation for enterprise SOC teams.
              </p>
            </motion.div>

            {/* Boot terminal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 rounded-xl bg-black/60 border border-sentinel-purple/20"
            >
              <div className="flex items-center gap-2 mb-3">
                <Terminal size={13} className="text-sentinel-purple" />
                <span className="font-mono text-xs text-sentinel-muted">sentinel@darkweb:~$</span>
                <div className="flex gap-1.5 ml-auto">
                  {['bg-red-500','bg-amber-500','bg-green-500'].map((c,i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${c} opacity-60`} />
                  ))}
                </div>
              </div>
              <TerminalText
                lines={BOOT_LINES}
                speed={35}
                startDelay={800}
                onComplete={() => setBootDone(true)}
              />
              {bootDone && (
                <div className="mt-2 font-mono text-xs text-sentinel-purple cursor-blink">
                  READY
                </div>
              )}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <button
                onClick={() => onNavigate('overview')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-bold text-white transition-all duration-200 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
              >
                <Activity size={16} />
                LAUNCH DASHBOARD
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => onNavigate('intelligence')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm border border-sentinel-purple/40 text-sentinel-purple hover:bg-purple-950/30 transition-all duration-200"
              >
                <Eye size={16} />
                VIEW INTEL FEED
              </button>
            </motion.div>
          </div>

          {/* Right — Radar + Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Radar */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.15) 0%, transparent 70%)' }}
              />
              <RadarPulse size={240} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-3xl font-black text-sentinel-purple glow-text-purple">
                    {threatStats.globalThreatScore}
                  </div>
                  <div className="font-mono text-xs text-sentinel-muted">THREAT SCORE</div>
                </div>
              </div>
            </div>

            {/* Live stats */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {[
                { label: 'Active Breaches',    value: threatStats.activeBreaches,      color: 'text-red-400'    },
                { label: 'Monitored Sources',  value: threatStats.monitoredSources,     color: 'text-purple-400' },
                { label: 'Leaked Credentials', value: threatStats.leakedCredentials,    color: 'text-amber-400'  },
                { label: 'AI Confidence',      value: threatStats.aiConfidence, suffix: '%', color: 'text-green-400' },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-xl p-3 border border-sentinel-border text-center">
                  <div className={`font-mono text-lg font-black ${stat.color}`}>
                    <AnimatedCounter value={typeof stat.value === 'number' ? stat.value : 0} delay={i * 200} />
                    {stat.suffix}
                  </div>
                  <div className="font-mono text-xs text-sentinel-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={i} className="glass-card rounded-xl p-4 border border-sentinel-border hover:border-sentinel-purple/40 transition-all hover:-translate-y-0.5 group">
                <div className="w-8 h-8 rounded-lg bg-purple-950/60 border border-sentinel-purple/30 flex items-center justify-center mb-3 group-hover:shadow-glow-purple transition-all">
                  <Icon size={16} className="text-sentinel-purple" />
                </div>
                <div className="font-mono text-xs font-bold text-sentinel-text mb-1">{f.label}</div>
                <div className="font-mono text-xs text-sentinel-muted">{f.desc}</div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}