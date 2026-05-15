import React, { useCallback } from 'react'
import ReactFlow, {
  Background, Controls, MiniMap, useNodesState, useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { GitFork, Info } from 'lucide-react'
import { correlationNodes, correlationEdges } from '../data/mockIntelligence.js'
import GlowCard from '../components/ui/GlowCard.jsx'

const NODE_STYLES = {
  group:   { bg: '#3b0764', border: '#a855f7', text: '#e9d5ff', dot: '#a855f7' },
  email:   { bg: '#1c1917', border: '#f59e0b', text: '#fde68a', dot: '#f59e0b' },
  alias:   { bg: '#1c1917', border: '#06b6d4', text: '#a5f3fc', dot: '#06b6d4' },
  domain:  { bg: '#1c1917', border: '#ef4444', text: '#fca5a5', dot: '#ef4444' },
  ip:      { bg: '#1c1917', border: '#ef4444', text: '#fca5a5', dot: '#ef4444' },
  malware: { bg: '#1c1917', border: '#f97316', text: '#fed7aa', dot: '#f97316' },
  wallet:  { bg: '#1c1917', border: '#22c55e', text: '#bbf7d0', dot: '#22c55e' },
  event:   { bg: '#3b0764', border: '#d946ef', text: '#f5d0fe', dot: '#d946ef' },
  vuln:    { bg: '#1c1917', border: '#ef4444', text: '#fca5a5', dot: '#ef4444' },
}

const TYPE_LABELS = {
  group: 'THREAT ACTOR', email: 'EMAIL', alias: 'ALIAS', domain: 'DOMAIN',
  ip: 'IP ADDRESS', malware: 'MALWARE', wallet: 'WALLET', event: 'EVENT', vuln: 'CVE',
}

function CustomNode({ data }) {
  const style = NODE_STYLES[data.type] || NODE_STYLES.alias
  return (
    <div
      className="rounded-lg px-3 py-2 font-mono text-xs border shadow-lg min-w-[120px] text-center"
      style={{
        background: style.bg,
        borderColor: style.border,
        color: style.text,
        boxShadow: `0 0 12px ${style.border}33`,
      }}
    >
      <div className="flex items-center justify-center gap-1.5 mb-0.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.dot }} />
        <span style={{ color: style.dot, fontSize: '9px' }} className="font-bold tracking-wider">
          {TYPE_LABELS[data.type] || data.type}
        </span>
      </div>
      <div className="font-bold" style={{ color: style.text }}>{data.label}</div>
    </div>
  )
}

const nodeTypes = { custom: CustomNode }

const initialNodes = correlationNodes.map(n => ({
  ...n,
  type: 'custom',
}))

const edgeStyles = {
  stroke: '#a855f7',
  strokeWidth: 1.5,
  strokeOpacity: 0.7,
}

const initialEdges = correlationEdges.map(e => ({
  ...e,
  style: edgeStyles,
  labelStyle: { fill: '#94a3b8', fontSize: 9, fontFamily: 'monospace' },
  labelBgStyle: { fill: 'rgba(4,4,10,0.8)' },
  animated: e.animated,
  markerEnd: { type: 'arrowclosed', color: '#a855f7' },
}))

const LEGEND = [
  { type: 'Threat Actor', color: '#a855f7' },
  { type: 'Email / Alias', color: '#06b6d4' },
  { type: 'Domain / IP', color: '#ef4444' },
  { type: 'Malware', color: '#f97316' },
  { type: 'Wallet', color: '#22c55e' },
  { type: 'Event / CVE', color: '#d946ef' },
]

export default function ThreatCorrelation() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="p-6 h-full flex flex-col space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-mono text-xl font-bold text-white flex items-center gap-2">
            <GitFork size={20} className="text-sentinel-purple" />
            THREAT CORRELATION ENGINE
          </h1>
          <p className="font-mono text-xs text-sentinel-muted mt-1">
            AI-driven entity relationship mapping — drag nodes to rearrange
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <Info size={12} className="text-sentinel-muted" />
          <span className="text-sentinel-muted">Animated edges = active correlation • Drag to explore</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-4 flex-1 min-h-0">
        {/* Graph */}
        <div className="lg:col-span-3">
          <div
            className="rounded-xl border border-sentinel-purple/20 overflow-hidden bg-sentinel-card"
            style={{ height: '520px' }}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              defaultEdgeOptions={{ style: edgeStyles }}
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#a855f720" gap={30} size={1} />
              <Controls />
              <MiniMap
                nodeColor={n => NODE_STYLES[n.data?.type]?.dot || '#a855f7'}
                maskColor="rgba(4,4,10,0.8)"
              />
            </ReactFlow>
          </div>
        </div>

        {/* Legend + stats */}
        <div className="space-y-4">
          <GlowCard>
            <h3 className="font-mono text-xs font-bold text-sentinel-purple mb-3">NODE LEGEND</h3>
            <div className="space-y-2">
              {LEGEND.map(l => (
                <div key={l.type} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
                  <span className="font-mono text-xs text-sentinel-dim">{l.type}</span>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard>
            <h3 className="font-mono text-xs font-bold text-sentinel-purple mb-3">CORRELATION STATS</h3>
            <div className="space-y-2">
              {[
                { label: 'Entities Mapped',    value: '10' },
                { label: 'Relationships',       value: '11' },
                { label: 'Active Links',        value: '6' },
                { label: 'Confidence Score',    value: '94%' },
                { label: 'Primary Actor',       value: 'LockBit 4.0' },
                { label: 'Attribution',         value: 'HIGH' },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="font-mono text-xs text-sentinel-muted">{s.label}</span>
                  <span className={`font-mono text-xs font-bold ${s.label === 'Attribution' ? 'text-red-400' : 'text-sentinel-purple'}`}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard glow="red">
            <h3 className="font-mono text-xs font-bold text-red-400 mb-2">PRIMARY ACTOR</h3>
            <div className="font-mono text-sm font-black text-red-300 mb-1">LockBit 4.0</div>
            <div className="font-mono text-xs text-sentinel-muted leading-relaxed">
              Nation-state affiliated RaaS operation. High sophistication. 
              Double extortion with DDoS pressure. 47 confirmed victims Q2 2025.
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  )
}