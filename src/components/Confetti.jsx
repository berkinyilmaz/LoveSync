import { useEffect, useRef } from 'react'

const COLORS = ['#e8405a', '#ff6b8a', '#ff8fa3', '#ffc2cc', '#ffffff', '#ffb3c1']

export default function Confetti({ active, duration = 3000 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const particles = []
    const particleCount = 150

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'circle' : 'rect',
      })
    }

    let animationId
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        // Update position
        p.y += p.speedY
        p.x += p.speedX
        p.rotation += p.rotationSpeed

        // Fade out near the end
        if (elapsed > duration - 1000) {
          p.opacity = Math.max(0, 1 - (elapsed - (duration - 1000)) / 1000)
        }

        // Draw particle
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color

        if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        }

        ctx.restore()

        // Reset if off screen
        if (p.y > canvas.height + 20) {
          p.y = -20
          p.x = Math.random() * canvas.width
        }
      })

      if (elapsed < duration) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [active, duration])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}
