import React, { useState } from 'react'
import Layout from './components/layout/Layout.jsx'
import Hero from './sections/Hero.jsx'
import Overview from './sections/Overview.jsx'
import IntelligenceFeed from './sections/IntelligenceFeed.jsx'
import LeakMonitoring from './sections/LeakMonitoring.jsx'
import ThreatCorrelation from './sections/ThreatCorrelation.jsx'
import AttackTimeline from './sections/AttackTimeline.jsx'
import AIInsights from './sections/AIInsights.jsx'
import SOCReports from './sections/SOCReports.jsx'
import Architecture from './sections/Architecture.jsx'
import EngineeringChallenges from './sections/EngineeringChallenges.jsx'
import Settings from './sections/Settings.jsx'

const SECTIONS = {
  hero:         Hero,
  overview:     Overview,
  intelligence: IntelligenceFeed,
  leaks:        LeakMonitoring,
  correlation:  ThreatCorrelation,
  timeline:     AttackTimeline,
  ai:           AIInsights,
  reports:      SOCReports,
  architecture: Architecture,
  engineering:  EngineeringChallenges,
  settings:     Settings,
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')

  const SectionComponent = SECTIONS[activeSection] || Hero

  return (
    <div className="scanlines">
      <Layout activeSection={activeSection} onNavigate={setActiveSection}>
        <SectionComponent onNavigate={setActiveSection} />
      </Layout>
    </div>
  )
}