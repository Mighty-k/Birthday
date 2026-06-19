import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  life: number
  maxLife: number
}

function createStars(count: number, w: number, h: number): Star[] {
  const s: Star[] = []
  for (let i = 0; i < count; i++) {
    const maxLife = Math.random() * 200 + 100
    s.push({
      x: Math.random() * w,
      y: Math.random() * h * -1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.8 + 0.3,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
      life: maxLife,
      maxLife,
    })
  }
  return s
}

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({ w: 400, h: 600 })
  const [musicOn, setMusicOn] = useState(false)

  useEffect(() => {
    const updateSize = () => {
      setCanvasSize({ w: window.innerWidth, h: window.innerHeight })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animId = 0
    let stars: Star[] = []

    if (!prefersReduced) {
      stars = createStars(80, canvas.width, canvas.height)

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (const s of stars) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
          const progress = s.life / s.maxLife
          ctx.fillStyle = `rgba(212, 168, 83, ${s.alpha * progress})`
          ctx.fill()
          s.x += s.vx
          s.y += s.vy
          s.life--
          if (s.y > canvas.height || s.life <= 0) {
            s.x = Math.random() * canvas.width
            s.y = -s.size
            s.life = s.maxLife
            s.vy = Math.random() * 0.8 + 0.3
          }
        }
        animId = requestAnimationFrame(render)
      }
      animId = requestAnimationFrame(render)
    }

    return () => cancelAnimationFrame(animId)
  }, [canvasSize])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'center center',
          toggleActions: 'play none none reverse',
        },
      })

      tl.fromTo(
        '.closing-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }
      )
      tl.fromTo(
        '.closing-text',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
        '-=0.5'
      )
      tl.fromTo(
        '.closing-signature',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        '-=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="closing"
      className="relative min-h-svh flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-rose-light/20 to-espresso/5 pointer-events-none" />

      <canvas
        ref={canvasRef}
        width={canvasSize.w}
        height={canvasSize.h}
        className="absolute inset-0 pointer-events-none"
      />

      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center text-center max-w-xl"
      >
        <h1 className="closing-title font-heading text-4xl md:text-5xl lg:text-6xl text-espresso leading-tight">
          Happy birthday,<br />my love.
        </h1>

        <div className="mt-8 space-y-4">
          <p className="closing-text font-serif italic text-xl md:text-2xl text-espresso/80">
            Go easy on yourself.
          </p>
          <p className="closing-text font-serif italic text-xl md:text-2xl text-espresso/80">
            Dream loudly.
          </p>
          <p className="closing-text font-serif italic text-xl md:text-2xl text-espresso/80">
            And know that no matter what — you have someone in your corner who isn't going anywhere.
          </p>
        </div>

        <div className="closing-signature mt-12">
          <p className="font-heading text-2xl md:text-3xl text-rose">
            I love you
          </p>
          <div className="mt-4 w-8 h-8 mx-auto">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-rose">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <p className="font-body text-sm text-espresso/40 mt-3 tracking-widest uppercase">
            Forever yours
          </p>
        </div>
      </div>

      <button
        onClick={() => setMusicOn(!musicOn)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center text-espresso/60 hover:text-rose transition-colors duration-300"
        aria-label={musicOn ? 'Pause music' : 'Play music'}
      >
        {musicOn ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        )}
      </button>
    </section>
  )
}
