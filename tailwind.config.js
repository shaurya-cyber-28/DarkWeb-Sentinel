/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sentinel: {
          bg:        '#04040a',
          surface:   '#080812',
          card:      '#0d0d1a',
          border:    '#1a1a2e',
          violet:    '#7c3aed',
          purple:    '#a855f7',
          magenta:   '#d946ef',
          pink:      '#ec4899',
          crimson:   '#dc2626',
          red:       '#ef4444',
          amber:     '#f59e0b',
          green:     '#22c55e',
          cyan:      '#06b6d4',
          muted:     '#6b7280',
          text:      '#e2e8f0',
          dim:       '#94a3b8',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':    'spin 8s linear infinite',
        'ping-slow':    'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'flicker':      'flicker 4s linear infinite',
        'scan':         'scan 3s linear infinite',
        'glow-pulse':   'glowPulse 2s ease-in-out infinite',
        'data-flow':    'dataFlow 20s linear infinite',
        'slide-up':     'slideUp 0.5s ease-out',
        'fade-in':      'fadeIn 0.6s ease-out',
        'marquee':      'marquee 30s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.4' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.6' },
          '97%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(168, 85, 247, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.3)' },
        },
        dataFlow: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(168, 85, 247, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px)
        `,
        'radial-glow': 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(13, 13, 26, 0.9) 0%, rgba(8, 8, 18, 0.95) 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-magenta': '0 0 20px rgba(217, 70, 239, 0.4)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.4)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
      }
    },
  },
  plugins: [],
}