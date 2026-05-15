import React, { useState, useEffect } from 'react'
import { Shield, Bell, Search, Wifi, Cpu, HardDrive, AlertTriangle } from 'lucide-react'
import { useSimulatedFeed } from '../../hooks/useSimulatedFeed.js'
import clsx from 'clsx'

export default function TopBar({ onNavigate }) {
  const [time, setTime] = useState(new Date())
  const [showNotifs, setShowNotifs] = useState(false)
  const notifications = useSimulatedFeed(9000)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const severityColor = {
    CRITICAL: 'text-red-400',
    HIGH:     'text-amber-400',
    MEDIUM:   'text-purple-400',
    LOW:      'text-cyan-400',
  }

  return (
    <header className="h-14 bg-sentinel-surface border-b border-sentinel-border flex items-center px-4 gap-4 flex-shrink-0">
      {/* Logo */}
      <button
        onClick={() => onNavigate('hero')}
        className="flex items-center gap-2 mr-4"
      >
        <div className="relative">
          <Shield size={22} className="text-sentinel-purple" />
          <div className="absolute inset-0 blur-sm">
            <Shield size={22} className="text-sentinel-purple opacity-50" />
          </div>
        </div>
        <span className="font-mono font-bold text-sm text-white tracking-wider hidden sm:block">
          DARK<span className="text-sentinel-purple">WEB</span> SENTINEL
        </span>
      </button>

      {/* System Status */}
      <div className="hidden md:flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-sentinel-green">
          <Wifi size={12} />
          <span>TOR CONNECTED</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 status-live" />
        </div>
        <div className="flex items-center gap-1.5 text-sentinel-dim">
          <Cpu size={12} />
          <span>AI ENGINE: ACTIVE</span>
        </div>
        <div className="flex items-center gap-1.5 text-sentinel-dim">
          <HardDrive size={12} />
          <span>1,847 SOURCES</span>
        </div>
      </div>

      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-sentinel-card border border-sentinel-border rounded-lg px-3 py-1.5 w-56">
        <Search size={13} className="text-sentinel-muted" />
        <input
          placeholder="Search threats, IOCs..."
          className="bg-transparent text-xs font-mono text-sentinel-dim placeholder-sentinel-muted outline-none w-full"
        />
      </div>

      {/* Alert Count */}
      <div className="flex items-center gap-1.5 bg-red-950/50 border border-red-500/30 rounded-lg px-3 py-1.5">
        <AlertTriangle size={13} className="text-red-400 animate-pulse" />
        <span className="font-mono text-xs text-red-400 font-bold">23 ALERTS</span>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifs(!showNotifs)}
          className="relative p-2 rounded-lg bg-sentinel-card border border-sentinel-border hover:border-sentinel-purple/40 transition-colors"
        >
          <Bell size={15} className="text-sentinel-dim" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {notifications.length}
            </span>
          )}
        </button>

        {showNotifs && (
          <div className="absolute right-0 top-10 w-80 glass-card rounded-xl border border-sentinel-purple/20 shadow-glow-purple z-50 p-3 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-sentinel-purple font-bold">LIVE ALERTS</span>
              <span className="font-mono text-xs text-sentinel-muted">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
            </div>
            {notifications.map(n => (
              <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-black/30 border border-sentinel-border">
                <span className={clsx('font-mono text-xs font-bold mt-0.5 flex-shrink-0', severityColor[n.severity])}>
                  {n.severity}
                </span>
                <span className="font-mono text-xs text-sentinel-dim leading-relaxed">{n.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clock */}
      <div className="font-mono text-xs text-sentinel-muted hidden sm:block">
        {time.toLocaleTimeString('en-US', { hour12: false })} UTC
      </div>
    </header>
  )
}