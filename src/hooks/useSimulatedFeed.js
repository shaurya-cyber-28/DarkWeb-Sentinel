import { useState, useEffect, useCallback } from 'react'

const FEED_UPDATES = [
  { severity: 'CRITICAL', message: 'New ransomware victim posted — Healthcare sector' },
  { severity: 'HIGH',     message: 'Credential dump detected — 230K accounts' },
  { severity: 'MEDIUM',   message: 'C2 infrastructure change detected — APT group' },
  { severity: 'HIGH',     message: 'Zero-day PoC discussion trending on XSS.is' },
  { severity: 'CRITICAL', message: 'Data exfiltration in progress — monitored actor' },
  { severity: 'LOW',      message: 'New underground forum member spike detected' },
  { severity: 'HIGH',     message: 'Malware sample submitted — matches known family' },
  { severity: 'MEDIUM',   message: 'Darknet marketplace listing — corporate access sale' },
]

export function useSimulatedFeed(intervalMs = 8000) {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback(() => {
    const item = FEED_UPDATES[Math.floor(Math.random() * FEED_UPDATES.length)]
    const notification = {
      id: Date.now(),
      ...item,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
    }

    setNotifications(prev => [notification, ...prev].slice(0, 5))
  }, [])

  useEffect(() => {
    addNotification()
    const interval = setInterval(addNotification, intervalMs)
    return () => clearInterval(interval)
  }, [addNotification, intervalMs])

  return notifications
}