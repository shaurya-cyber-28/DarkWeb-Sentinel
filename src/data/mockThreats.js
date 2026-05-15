export const threatStats = {
  globalThreatScore: 87,
  activeBreaches: 23,
  monitoredSources: 1847,
  ransomwareGroups: 14,
  compromisedOrgs: 312,
  leakedCredentials: 4728391,
  aiConfidence: 94.2,
  activeCampaigns: 8,
}

export const threatTimeline = [
  { time: '00:00', threats: 12, breaches: 2, leaks: 5 },
  { time: '02:00', threats: 8,  breaches: 1, leaks: 3 },
  { time: '04:00', threats: 6,  breaches: 0, leaks: 2 },
  { time: '06:00', threats: 15, breaches: 3, leaks: 7 },
  { time: '08:00', threats: 34, breaches: 5, leaks: 12 },
  { time: '10:00', threats: 52, breaches: 8, leaks: 19 },
  { time: '12:00', threats: 47, breaches: 7, leaks: 16 },
  { time: '14:00', threats: 63, breaches: 11, leaks: 24 },
  { time: '16:00', threats: 71, breaches: 13, leaks: 28 },
  { time: '18:00', threats: 58, breaches: 9, leaks: 21 },
  { time: '20:00', threats: 44, breaches: 6, leaks: 15 },
  { time: '22:00', threats: 31, breaches: 4, leaks: 10 },
]

export const severityData = [
  { category: 'CRITICAL', count: 14, fill: '#ef4444' },
  { category: 'HIGH',     count: 38, fill: '#f59e0b' },
  { category: 'MEDIUM',   count: 67, fill: '#a855f7' },
  { category: 'LOW',      count: 103, fill: '#06b6d4' },
  { category: 'INFO',     count: 241, fill: '#6b7280' },
]

export const attackOrigins = [
  { id: 1, country: 'Russia',       code: 'RU', count: 847,  lat: 55.75,  lng: 37.61,  color: '#ef4444' },
  { id: 2, country: 'China',        code: 'CN', count: 623,  lat: 39.90,  lng: 116.40, color: '#ef4444' },
  { id: 3, country: 'North Korea',  code: 'KP', count: 412,  lat: 39.03,  lng: 125.75, color: '#f59e0b' },
  { id: 4, country: 'Iran',         code: 'IR', count: 289,  lat: 35.68,  lng: 51.42,  color: '#f59e0b' },
  { id: 5, country: 'Romania',      code: 'RO', count: 178,  lat: 44.43,  lng: 26.10,  color: '#a855f7' },
  { id: 6, country: 'Brazil',       code: 'BR', count: 134,  lat: -15.78, lng: -47.93, color: '#a855f7' },
]

export const attackRoutes = [
  { from: { x: 72, y: 28 }, to: { x: 22, y: 40 }, severity: 'critical' },
  { from: { x: 80, y: 32 }, to: { x: 50, y: 60 }, severity: 'high' },
  { from: { x: 82, y: 30 }, to: { x: 78, y: 48 }, severity: 'critical' },
  { from: { x: 68, y: 35 }, to: { x: 30, y: 35 }, severity: 'high' },
  { from: { x: 55, y: 30 }, to: { x: 22, y: 40 }, severity: 'medium' },
  { from: { x: 36, y: 62 }, to: { x: 22, y: 40 }, severity: 'high' },
]

export const ransomwareGroups = [
  { name: 'LockBit 4.0',    activity: 94, targets: 47, status: 'ACTIVE',   color: '#ef4444' },
  { name: 'BlackCat/ALPHV', activity: 78, targets: 31, status: 'ACTIVE',   color: '#ef4444' },
  { name: 'Cl0p',           activity: 61, targets: 22, status: 'ACTIVE',   color: '#f59e0b' },
  { name: 'Play',           activity: 55, targets: 18, status: 'ACTIVE',   color: '#f59e0b' },
  { name: 'BlackBasta',     activity: 42, targets: 14, status: 'REDUCED',  color: '#a855f7' },
  { name: 'Akira',          activity: 38, targets: 12, status: 'ACTIVE',   color: '#f59e0b' },
]

export const tickerItems = [
  '⚠ CRITICAL: LockBit 4.0 claims new financial sector breach — 2.1M records',
  '🔴 HIGH: Novel zero-day circulating in darknet forums targeting Exchange servers',
  '⚠ ALERT: Cl0p group announces new victim — Healthcare provider leaked',
  '🟡 MEDIUM: Credential dump posted — 847K accounts from fintech platform',
  '🔴 HIGH: APT41 infrastructure detected — New campaign targeting defense contractors',
  '⚠ CRITICAL: Ransomware-as-a-Service portal updated with new encryption module',
  '🔴 HIGH: Zero-day PoC for CVE-2024-XXXX published on underground forum',
  '🟡 MEDIUM: Telegram channel selling corporate VPN credentials — verified active',
]