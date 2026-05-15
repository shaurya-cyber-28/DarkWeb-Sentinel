import { useState, useEffect, useRef } from 'react'

export function useAnimatedCounter(target, duration = 2000, delay = 0) {
  const [count, setCount] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(startValue + (target - startValue) * eased))

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, duration, delay])

  return count
}