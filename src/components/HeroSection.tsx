import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  hue: number
}

function createParticles(count: number, w: number, h: number): Particle[] {
  const p: Particle[] = []
  for (let i = 0; i < count; i++) {
    p.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? 45 : 340,
    })
  }
  return p
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  for (const p of particles) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.alpha})`
    ctx.fill()
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > ctx.canvas.width) p.vx *= -1
    if (p.y < 0 || p.y > ctx.canvas.height) p.vy *= -1
  }
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [canvasSize, setCanvasSize] = useState({ w: 400, h: 600 })

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
    let particles: Particle[] = []

    if (!prefersReduced) {
      particles = createParticles(60, canvas.width, canvas.height)
      const render = () => {
        drawParticles(ctx, particles)
        animId = requestAnimationFrame(render)
      }
      animId = requestAnimationFrame(render)
    }

    return () => cancelAnimationFrame(animId)
  }, [canvasSize])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '.hero-title-line',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.3 }
      )
      tl.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.5'
      )
      tl.fromTo(
        '.hero-date',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        '-=0.3'
      )
      tl.fromTo(
        '.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '+=0.5'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-svh w-full overflow-hidden bg-gradient-to-b from-ivory via-cream to-ivory"
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.w}
        height={canvasSize.h}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory/40 pointer-events-none" />

      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
      >
        <p className="hero-date font-serif text-gold text-lg md:text-xl tracking-wide mb-4">
          June 20, 2026
        </p>
        <h1 className="hero-title-line font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-espresso leading-tight">
          <span className="block">Happy Birthday,</span>
          <span className="block mt-2 text-rose">My Love</span>
        </h1>
        <p className="hero-subtitle font-heading italic text-lg sm:text-xl md:text-2xl text-mauve/80 mt-6 max-w-md">
          For you, on your special day — and every day after.
        </p>
        <p className="hero-subtitle font-body text-sm text-mauve/60 mt-3">
          21 looks beautiful on you
        </p>
      </div>

      <div
        ref={indicatorRef}
        className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs text-mauve/60 tracking-widest uppercase">
          Scroll
        </span>
        <svg
          width="20"
          height="30"
          viewBox="0 0 20 30"
          fill="none"
          className="animate-bounce text-mauve"
        >
          <rect
            x="1.5"
            y="1.5"
            width="17"
            height="27"
            rx="8.5"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="10" cy="10" r="2" fill="currentColor" className="animate-pulse" />
        </svg>
      </div>
    </section>
  )
}
