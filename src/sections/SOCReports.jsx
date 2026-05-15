import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Printer, Shield, AlertTriangle, Clock, Target, CheckSquare } from 'lucide-react'
import GlowCard from '../components/ui/GlowCard.jsx'
import ThreatBadge from '../components/ui/ThreatBadge.jsx'
import { socReports } from '../data/mockReports.js'

function RedactedBar({ width = '60%' }) {
  return (
    <div className="inline-block h-3 rounded align-middle bg-black/70 border border-sentinel-border" style={{ width }} />
  )
}

export default function SOCReports() {
  const report = socReports[0]
  const [tab, setTab] = useState('overview')
  const TABS = ['overview', 'iocs', 'timeline', 'mitigations']

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-mono text-xl font-bold text-white flex items-center gap-2">
            <FileText size={20} className="text-sentinel-purple" />
            SOC INTELLIGENCE REPORT
          </h1>
          <p className="font-mono text-xs text-sentinel-muted mt-1">
            Enterprise-grade threat intelligence dossiers
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-sentinel-border text-sentinel-muted hover:text-sentinel-purple hover:border-sentinel-purple/40 transition-colors font-mono text-xs">
            <Printer size={13} />
            PRINT
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs font-bold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
          >
            <Download size={13} />
            EXPORT PDF
          </button>
        </div>
      </div>

      {/* Report Document */}
      <div className="border border-sentinel-purple/30 rounded-2xl overflow-hidden shadow-glow-purple">
        {/* Doc Header — Classified Banner */}
        <div className="bg-red-950/60 border-b border-red-500/40 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle size={14} className="text-red-400" />
            <span className="font-mono text-xs font-black text-red-400 tracking-widest">
              ██ TOP SECRET // TLP:RED // RESTRICTED DISTRIBUTION ██
            </span>
          </div>
          <span className="font-mono text-xs text-red-400/60">{report.classification}</span>
        </div>

        {/* Report Header */}
        <div className="bg-sentinel-card px-6 py-5 border-b border-sentinel-border">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-sentinel-purple" />
                <span className="font-mono text-xs text-sentinel-purple font-bold tracking-widest">
                  CYBER THREAT INTELLIGENCE REPORT
                </span>
              </div>
              <h2 className="font-mono text-lg font-black text-white mb-1">{report.title}</h2>
              <div className="flex items-center gap-3 mt-2">
                <ThreatBadge severity={report.severity} pulse />
                <span className="font-mono text-xs text-sentinel-muted">Risk Score:</span>
                <span className="font-mono text-sm font-black text-red-400">{report.risk_rating}/100</span>
              </div>
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              {[
                { label: 'Report ID:',     value: report.id,           color: 'text-sentinel-purple' },
                { label: 'Date:',          value: report.date,         color: 'text-sentinel-text'   },
                { label: 'Analyst:',       value: report.analyst,      color: 'text-green-400'       },
                { label: 'Threat Actor:',  value: report.threat_actor, color: 'text-red-400'         },
                { label: 'IOC Count:',     value: `${report.ioc_count} indicators`, color: 'text-amber-400' },
              ].map((row, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-sentinel-muted w-28 flex-shrink-0">{row.label}</span>
                  <span className={`font-bold ${row.color}`}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-sentinel-card border-b border-sentinel-border px-6 flex gap-0">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-mono text-xs px-4 py-3 border-b-2 transition-all capitalize ${
                tab === t
                  ? 'border-sentinel-purple text-sentinel-purple'
                  : 'border-transparent text-sentinel-muted hover:text-sentinel-text'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-sentinel-card p-6">

          {/* Overview */}
          {tab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Executive Summary */}
              <div>
                <h3 className="font-mono text-sm font-bold text-sentinel-purple mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-sentinel-purple rounded-full" />
                  EXECUTIVE SUMMARY
                </h3>
                <p className="font-mono text-xs text-sentinel-dim leading-relaxed border-l-2 border-sentinel-purple/30 pl-4">
                  {report.executive_summary}
                </p>
              </div>

              {/* Affected sectors */}
              <div>
                <h3 className="font-mono text-sm font-bold text-sentinel-purple mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-sentinel-purple rounded-full" />
                  AFFECTED SECTORS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {report.affected_sectors.map(s => (
                    <span key={s} className="font-mono text-xs px-3 py-1.5 bg-red-950/40 border border-red-500/30 text-red-300 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Redacted section */}
              <div className="p-4 rounded-xl bg-black/50 border border-sentinel-border">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-red-400">█ REDACTED SECTION — CLEARANCE REQUIRED</span>
                </div>
                <div className="space-y-2">
                  {[0.7, 0.5, 0.85, 0.6, 0.75].map((w, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <div className="h-2 rounded bg-black/70 border border-sentinel-border" style={{ width: `${w * 100}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* IOCs */}
          {tab === 'iocs' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-mono text-sm font-bold text-sentinel-purple mb-4">INDICATORS OF COMPROMISE</h3>
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-xs">
                  <thead>
                    <tr className="border-b border-sentinel-border">
                      {['TYPE', 'INDICATOR VALUE', 'CONFIDENCE', 'STATUS'].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-sentinel-muted font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {report.iocs.map((ioc, i) => (
                      <tr key={i} className="border-b border-sentinel-border/40 hover:bg-white/2 transition-colors">
                        <td className="py-3 px-3 text-cyan-400 font-bold">{ioc.type}</td>
                        <td className="py-3 px-3 text-sentinel-green font-mono"><code>{ioc.value}</code></td>
                        <td className="py-3 px-3">
                          <ThreatBadge severity={ioc.confidence === 'HIGH' ? 'HIGH' : 'MEDIUM'} />
                        </td>
                        <td className="py-3 px-3">
                          <span className={`font-bold ${ioc.status === 'ACTIVE' ? 'text-red-400' : 'text-amber-400'}`}>
                            {ioc.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Timeline */}
          {tab === 'timeline' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <h3 className="font-mono text-sm font-bold text-sentinel-purple mb-4 flex items-center gap-2">
                <Clock size={14} />
                INCIDENT TIMELINE
              </h3>
              {report.timeline_events.map((ev, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-24">
                    <span className="font-mono text-xs text-sentinel-purple font-bold">{ev.date}</span>
                  </div>
                  <div className="flex-shrink-0 pt-1">
                    <div className="w-2 h-2 rounded-full bg-sentinel-purple" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-xs text-sentinel-dim">{ev.event}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Mitigations */}
          {tab === 'mitigations' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-mono text-sm font-bold text-sentinel-purple mb-4 flex items-center gap-2">
                <CheckSquare size={14} />
                RECOMMENDED MITIGATIONS
              </h3>
              <div className="space-y-3">
                {report.mitigations.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-black/30 border border-sentinel-border hover:border-sentinel-purple/30 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-purple-950/60 border border-sentinel-purple/40 flex items-center justify-center font-mono text-xs text-sentinel-purple font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="font-mono text-xs text-sentinel-dim leading-relaxed">{m}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer classification */}
        <div className="bg-red-950/40 border-t border-red-500/30 px-6 py-2 text-center">
          <span className="font-mono text-xs text-red-400/60">
            ██ THIS DOCUMENT IS CLASSIFIED — HANDLE PER TLP:RED PROTOCOL ██
          </span>
        </div>
      </div>
    </div>
  )
}