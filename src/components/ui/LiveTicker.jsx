import React from 'react'
import { tickerItems } from '../../data/mockThreats.js'

export default function LiveTicker() {
  const doubled = [...tickerItems, ...tickerItems]

  return (
    <div className="w-full bg-black/60 border-y border-sentinel-purple/20 py-2 overflow-hidden">
      <div className="ticker-wrap">
        <div className="ticker-content">
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 mr-12 font-mono text-xs text-sentinel-dim">
              <span className="text-sentinel-purple opacity-60">▶</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}