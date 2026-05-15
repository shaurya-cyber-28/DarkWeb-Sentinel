import React, { useState, useEffect } from 'react'

export default function TerminalText({ lines = [], speed = 40, startDelay = 0, onComplete, className = '' }) {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay)
    return () => clearTimeout(timer)
  }, [startDelay])

  useEffect(() => {
    if (!started || currentLine >= lines.length) {
      if (started && currentLine >= lines.length && onComplete) onComplete()
      return
    }

    const line = lines[currentLine]

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const next = [...prev]
          next[currentLine] = (next[currentLine] || '') + line[currentChar]
          return next
        })
        setCurrentChar(c => c + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [started, currentLine, currentChar, lines, speed, onComplete])

  return (
    <div className={`font-mono text-sm ${className}`}>
      {displayedLines.map((line, i) => (
        <div key={i} className="leading-relaxed">
          <span className="text-sentinel-purple mr-2">{'>'}</span>
          <span className="text-sentinel-green">{line}</span>
          {i === displayedLines.length - 1 && currentLine === i && (
            <span className="inline-block w-2 h-4 bg-sentinel-purple ml-0.5 animate-pulse align-middle" />
          )}
        </div>
      ))}
    </div>
  )
}