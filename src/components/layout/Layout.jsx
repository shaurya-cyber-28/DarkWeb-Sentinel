import React from 'react'
import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'
import LiveTicker from '../ui/LiveTicker.jsx'

export default function Layout({ children, activeSection, onNavigate }) {
  return (
    <div className="flex h-screen bg-sentinel-bg overflow-hidden">
      <Sidebar activeSection={activeSection} onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onNavigate={onNavigate} />
        <LiveTicker />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}