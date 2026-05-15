import React from 'react'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter.js'

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2000, delay = 0, className = '' }) {
  const count = useAnimatedCounter(value, duration, delay)

  const formatted = count >= 1000000
    ? (count / 1000000).toFixed(1) + 'M'
    : count >= 1000
    ? (count / 1000).toFixed(1) + 'K'
    : count.toString()

  return (
    <span className={className}>
      {prefix}{formatted}{suffix}
    </span>
  )
}