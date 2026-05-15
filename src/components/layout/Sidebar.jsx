import React, { useState } from 'react'
import {
  LayoutDashboard, Radio, AlertOctagon, GitFork,
  Clock, Archive, Brain, FileText,
  Network, FlaskConical, Settings, ChevronRight,
  Shield, Activity
} from 'lucide-react'
import clsx from 'clsx'

const NAV_ITEMS = [
  { id: 'hero',         label: 'Platform Home',      icon: Shield,          group: 'main'        },
  { id: 'overview',     label: 'Overview',           icon: LayoutDashboard, group: 'main'        },
  { id: 'intelligence', label: 'Intelligence Feed',  icon: Radio,           group: 'intelligence', badge: 'LIVE' },
  { id: 'leaks',        label: 'Leak Monitoring',    icon: AlertOctagon,    group: 'intelligence', badge: '23'   },
  { id: 'correlation',  label: 'Threat Correlation', icon: GitFork,         group: 'analysis'    },
  { id: 'timeline',     label: 'Attack Timelines',   icon: Clock,           group: 'analysis'    },
  { id: 'ai',           label: 'AI Insights',        icon: Brain,           group: 'ai'          },
  { id: 'reports',      label: 'SOC Reports',        icon: FileText,        group: 'ai'          },
  { id: 'architecture', label: 'Architecture',       icon: Network,         group: 'system'      },
  { id: 'engineering',  label: 'Engineering',        icon: FlaskConical,    group: 'system'      },
  { id: 'settings',     label: 'Settings',           icon: Settings,        group: 'system'      },
]

const GROUP_LABELS = {
  main:         'PLATFORM',
  intelligence: 'INTELLIGENCE',
  analysis:     'ANALYSIS',
  ai:           'AI ENGINE',
  system:       'SYSTEM',
}

export default function Sidebar({ activeSection, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false)

  const groups = ['main', 'intelligence', 'analysis', 'ai', 'system']

  return (
    <aside
      className={clsx(
        'flex flex-col bg-sentinel-surface border-r border-sentinel-border transition-all duration-300 flex-shrink-0',
        collapsed ? 'w-14' : 'w-56'
      )}
    >
      {/* Collapse toggle */}
      <div className="h-14 flex items-center justify-end px-3 border-b border-sentinel-border flex-shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-sentinel-muted hover:text-sentinel-purple hover:bg-purple-950/30 transition-colors"
        >
          <ChevronRight
            size={14}
            className={clsx('transition-transform duration-300', collapsed ? '' : 'rotate-180')}
          />
        </button>
      </div>

      {/* Status strip */}
      {!collapsed && (
        <div className="mx-3 my-2 p-2 rounded-lg bg-green-950/30 border border-green-500/20 flex items-center gap-2">
          <Activity size={12} className="text-green-400" />
          <span className="font-mono text-xs text-green-400">SYSTEM ONLINE</span>
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 status-live" />
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5 px-2">
        {groups.map(group => {
          const items = NAV_ITEMS.filter(i => i.group === group)
          return (
            <div key={group} className="mb-2">
              {!collapsed && (
                <div className="px-2 py-1.5 font-mono text-xs text-sentinel-muted/50 tracking-widest font-semibold">
                  {GROUP_LABELS[group]}
                </div>
              )}
              {items.map(item => {
                const Icon = item.icon
                const active = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={clsx(
                      'w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-200 group text-left',
                      active
                        ? 'bg-purple-950/60 border border-sentinel-purple/40 text-sentinel-purple'
                        : 'text-sentinel-muted hover:text-sentinel-text hover:bg-white/5 border border-transparent'
                    )}
                  >
                    <div className={clsx(
                      'flex-shrink-0 transition-all duration-200',
                      active ? 'text-sentinel-purple drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]' : 'group-hover:text-sentinel-purple'
                    )}>
                      <Icon size={15} />
                    </div>

                    {!collapsed && (
                      <>
                        <span className="font-mono text-xs flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <span className={clsx(
                            'font-mono text-xs px-1.5 py-0.5 rounded font-bold',
                            item.badge === 'LIVE'
                              ? 'bg-green-950/50 text-green-400 border border-green-500/30'
                              : 'bg-red-950/50 text-red-400 border border-red-500/30'
                          )}>
                            {item.badge}
                          </span>
                        )}
                        {active && (
                          <div className="w-1 h-4 bg-sentinel-purple rounded-full shadow-glow-purple" />
                        )}
                      </>
                    )}
                  </button>
                )
              })}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-sentinel-border">
          <div className="font-mono text-xs text-sentinel-muted/40 text-center">
            v3.2.1 — SENTINEL AI<br />
            <span className="text-sentinel-purple/40">© 2025 CLASSIFIED</span>
          </div>
        </div>
      )}
    </aside>
  )
}