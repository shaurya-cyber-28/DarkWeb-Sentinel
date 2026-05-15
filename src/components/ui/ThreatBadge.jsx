import React from 'react'
import clsx from 'clsx'

const SEVERITY_CONFIG = {
  CRITICAL: { bg: 'bg-red-950/80',    text: 'text-red-400',    border: 'border-red-500/50',    dot: 'bg-red-500'    },
  HIGH:     { bg: 'bg-amber-950/80',  text: 'text-amber-400',  border: 'border-amber-500/50',  dot: 'bg-amber-500'  },
  MEDIUM:   { bg: 'bg-purple-950/80', text: 'text-purple-400', border: 'border-purple-500/50', dot: 'bg-purple-500' },
  LOW:      { bg: 'bg-cyan-950/80',   text: 'text-cyan-400',   border: 'border-cyan-500/50',   dot: 'bg-cyan-500'   },
  INFO:     { bg: 'bg-gray-900/80',   text: 'text-gray-400',   border: 'border-gray-600/50',   dot: 'bg-gray-500'   },
}

export default function ThreatBadge({ severity = 'LOW', pulse = false, size = 'sm' }) {
  const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.INFO

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-md border font-mono font-medium uppercase tracking-wider',
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-3 py-1 text-sm',
        config.bg, config.text, config.border
      )}
    >
      <span
        className={clsx(
          'rounded-full flex-shrink-0',
          size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
          config.dot,
          pulse && 'animate-pulse'
        )}
      />
      {severity}
    </span>
  )
}