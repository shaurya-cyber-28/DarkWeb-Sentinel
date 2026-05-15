import React from 'react'
import clsx from 'clsx'

export default function GlowCard({
  children,
  className = '',
  glow = 'purple',
  hover = true,
  padding = true,
  onClick,
}) {
  const glowMap = {
    purple:  'hover:border-purple-500/50 hover:shadow-glow-purple',
    magenta: 'hover:border-fuchsia-500/50 hover:shadow-glow-magenta',
    red:     'hover:border-red-500/50 hover:shadow-glow-red',
    green:   'hover:border-green-500/50 hover:shadow-glow-green',
    cyan:    'hover:border-cyan-500/50 hover:shadow-glow-cyan',
    none:    '',
  }

  return (
    <div
      onClick={onClick}
      className={clsx(
        'glass-card rounded-xl transition-all duration-300',
        padding && 'p-4',
        hover && glowMap[glow],
        hover && 'hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}