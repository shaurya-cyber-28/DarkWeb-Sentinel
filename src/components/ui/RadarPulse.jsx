import React from 'react'

export default function RadarPulse({ size = 200 }) {
  const cx = size / 2
  const cy = size / 2
  const radii = [size * 0.12, size * 0.24, size * 0.36, size * 0.46]

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0">
        {/* Grid circles */}
        {radii.map((r, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* Cross hairs */}
        <line x1={cx} y1={0} x2={cx} y2={size} stroke="rgba(168,85,247,0.15)" strokeWidth="1" />
        <line x1={0} y1={cy} x2={size} y2={cy} stroke="rgba(168,85,247,0.15)" strokeWidth="1" />

        {/* Sweep */}
        <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="radar-sweep">
          <defs>
            <radialGradient id="sweepGrad" cx="0%" cy="50%" r="100%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.6)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
            </radialGradient>
          </defs>
          <path
            d={`M ${cx} ${cy} L ${cx + radii[3]} ${cy} A ${radii[3]} ${radii[3]} 0 0 0 ${cx + radii[3] * Math.cos(-0.8)} ${cy + radii[3] * Math.sin(-0.8)} Z`}
            fill="url(#sweepGrad)"
            opacity="0.8"
          />
          <line
            x1={cx} y1={cy}
            x2={cx + radii[3]} y2={cy}
            stroke="#a855f7"
            strokeWidth="1.5"
          />
        </g>

        {/* Blips */}
        {[
          { x: cx + 20, y: cy - 30 },
          { x: cx - 35, y: cy + 15 },
          { x: cx + 40, y: cy + 25 },
          { x: cx - 20, y: cy - 40 },
        ].map((pt, i) => (
          <circle
            key={i}
            cx={pt.x} cy={pt.y} r={2}
            fill="#ef4444"
            className="animate-ping-slow"
            style={{ animationDelay: `${i * 0.5}s`, animationDuration: '2s' }}
          />
        ))}
      </svg>

      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-purple-400 rounded-full shadow-glow-purple" />
      </div>
    </div>
  )
}