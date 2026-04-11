import { useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'

interface UseConfettiOptions {
  particleCount?: number
  spread?: number
  startVelocity?: number
  colors?: string[]
  duration?: number
}

interface UseConfettiReturn {
  fire: () => void
}

export const useConfetti = (options: UseConfettiOptions = {}): UseConfettiReturn => {
  const {
    particleCount = 100,
    spread = 100,
    startVelocity = 45,
    colors = ['#0044b8', '#095ae9', '#f59e0b', '#ffffff'],
    duration = 5000,
  } = options

  const durationRef = useRef(Date.now() + duration)

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min

  const frame = useCallback(() => {
    const now = Date.now()
    if (now > durationRef.current) return

    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      shapes: ['square', 'circle'],
      startVelocity: randomInRange(30, 50),
    })

    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      shapes: ['square', 'circle'],
      startVelocity: randomInRange(30, 50),
    })

    requestAnimationFrame(frame)
  }, [colors])

  const fire = useCallback(() => {
    durationRef.current = Date.now() + duration

    confetti({
      particleCount,
      spread,
      startVelocity,
      decay: 0.9,
      gravity: 1,
      ticks: 200,
      colors,
      shapes: ['square', 'circle'],
      disableForReducedMotion: true,
    })

    frame()
  }, [particleCount, spread, startVelocity, colors, duration, frame])

  return { fire }
}
