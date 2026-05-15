import React, { useState } from 'react'
import { Settings as SettingsIcon, Bell, Shield, Palette, Database, Wifi, Save } from 'lucide-react'
import GlowCard from '../components/ui/GlowCard.jsx'

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5 rounded-full transition-all duration-200 ${value ? 'bg-sentinel-purple' : 'bg-sentinel-border'}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200 ${value ? 'left-5' : 'left-0.5'}`} />
    </button>
  )
}

export default function Settings() {
  const [settings, setSettings] = useState({
    liveAlerts: true, soundAlerts: false, criticalOnly: false,
    torConnection: true, vpnFallback: true, anonymousMode: true,
    darkTheme: true, compactMode: false, scanlines: true, animations: true,
    autoRefresh: true, refreshInterval: '30',
    aiAnalysis: true, autoReport: false,
  })

  const set = (key, val) => setSettings(s => ({ ...s, [key]: val }))

  const SECTIONS = [
    {
      icon: Bell, label: 'Alert Configuration', color: '#f59e0b',
      fields: [
        { key: 'liveAlerts',   label: 'Live Alert Feed',       type: 'toggle', desc: 'Show real-time threat notifications' },
        { key: 'soundAlerts',  label: 'Sound Notifications',   type: 'toggle', desc: 'Play audio for critical alerts'       },
        { key: 'criticalOnly', label: 'Critical Alerts Only',  type: 'toggle', desc: 'Filter to CRITICAL severity only'     },
      ],
    },
    {
      icon: Wifi, label: 'Network & Anonymity', color: '#a855f7',
      fields: [
        { key: 'torConnection',  label: 'Tor Network',       type: 'toggle', desc: 'Route through Tor for anonymity'       },
        { key: 'vpnFallback',    label: 'VPN Fallback',      type: 'toggle', desc: 'Use VPN if Tor is unavailable'         },
        { key: 'anonymousMode',  label: 'Anonymous Mode',    type: 'toggle', desc: 'Suppress analyst identity in reports'  },
      ],
    },
    {
      icon: Palette, label: 'Display & UI', color: '#d946ef',
      fields: [
        { key: 'darkTheme',    label: 'Dark Theme',        type: 'toggle', desc: 'Ultra-dark cyberpunk interface'  },
        { key: 'compactMode',  label: 'Compact Mode',      type: 'toggle', desc: 'Denser information layout'       },
        { key: 'scanlines',    label: 'Scanline Effect',   type: 'toggle', desc: 'CRT scanline overlay'            },
        { key: 'animations',   label: 'Animations',        type: 'toggle', desc: 'UI motion and transitions'       },
      ],
    },
    {
      icon: Database, label: 'Data & AI Engine', color: '#22c55e',
      fields: [
        { key: 'aiAnalysis',  label: 'AI Auto-Analysis',  type: 'toggle', desc: 'Automatically analyze new intel items' },
        { key: 'autoReport',  label: 'Auto-Generate Reports', type: 'toggle', desc: 'Generate SOC reports automatically'  },
        { key: 'autoRefresh', label: 'Auto Refresh',      type: 'toggle', desc: 'Automatically refresh feed data'       },
      ],
    },
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-mono text-xl font-bold text-white flex items-center gap-2">
          <SettingsIcon size={20} className="text-sentinel-purple" />
          SYSTEM SETTINGS
        </h1>
        <p className="font-mono text-xs text-sentinel-muted mt-1">
          Platform configuration — DarkWeb Sentinel v3.2.1
        </p>
      </div>

      {/* System status */}
      <GlowCard glow="green">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 status-live" />
          <span className="font-mono text-sm font-bold text-green-400">ALL SYSTEMS OPERATIONAL</span>
          <div className="ml-auto flex gap-4 text-xs font-mono text-sentinel-muted">
            <span>Uptime: 99.97%</span>
            <span>Sources: 1,847</span>
            <span>Version: 3.2.1</span>
          </div>
        </div>
      </GlowCard>

      {/* Settings sections */}
      {SECTIONS.map((section, i) => {
        const Icon = section.icon
        return (
          <GlowCard key={i}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center border"
                style={{ backgroundColor: section.color + '20', borderColor: section.color + '40' }}>
                <Icon size={13} style={{ color: section.color }} />
              </div>
              <h3 className="font-mono text-sm font-bold text-sentinel-text">{section.label}</h3>
            </div>

            <div className="space-y-3">
              {section.fields.map(field => (
                <div key={field.key} className="flex items-center justify-between gap-4 py-2 border-b border-sentinel-border/40 last:border-0">
                  <div>
                    <div className="font-mono text-xs font-bold text-sentinel-text">{field.label}</div>
                    <div className="font-mono text-xs text-sentinel-muted mt-0.5">{field.desc}</div>
                  </div>
                  {field.type === 'toggle' && (
                    <Toggle value={settings[field.key]} onChange={v => set(field.key, v)} />
                  )}
                </div>
              ))}
            </div>
          </GlowCard>
        )
      })}

      {/* Save */}
      <div className="flex justify-end">
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-bold text-white transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
        >
          <Save size={15} />
          SAVE CONFIGURATION
        </button>
      </div>
    </div>
  )
}