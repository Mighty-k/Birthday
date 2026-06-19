import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Sparkle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
}

function createSparkles(count: number, w: number, h: number): Sparkle[] {
  const s: Sparkle[] = []
  for (let i = 0; i < count; i++) {
    s.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2 - 0.1,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.1,
    })
  }
  return s
}

export default function Encouragement() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animId = 0
    let sparkles: Sparkle[] = []

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    if (!prefersReduced) {
      sparkles = createSparkles(40, canvas.width, canvas.height)

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (const s of sparkles) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212, 168, 83, ${s.alpha})`
          ctx.fill()
          s.x += s.vx
          s.y += s.vy
          if (s.x < 0 || s.x > canvas.width) s.vx *= -1
          if (s.y < 0 || s.y > canvas.height) s.vy *= -1
        }
        animId = requestAnimationFrame(render)
      }
      animId = requestAnimationFrame(render)
    }

    return () => cancelAnimationFrame(animId)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = textRef.current?.querySelectorAll('.reveal-line')
      if (lines) {
        gsap.fromTo(
          lines,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'center 50%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      gsap.fromTo(
        '.encouragement-glow',
        { opacity: 0.2, scale: 0.8 },
        {
          opacity: 0.6,
          scale: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'center 40%',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="encouragement"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rose-light/20 via-ivory to-warm pointer-events-none" />

      <div className="encouragement-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div ref={textRef} className="relative max-w-2xl mx-auto text-center">
        <span className="font-heading italic text-gold/60 text-lg block mb-6">
          A note from my heart
        </span>

        <div className="space-y-6">
          <p className="reveal-line font-serif italic text-xl md:text-2xl text-espresso/80 leading-relaxed">
            You're just getting started, love.
          </p>
          <p className="reveal-line font-serif italic text-xl md:text-2xl text-espresso/80 leading-relaxed">
            I know it doesn't always feel that way — especially when things don't go the way you planned.
          </p>
          <p className="reveal-line font-serif italic text-xl md:text-2xl text-espresso/80 leading-relaxed">
            But every setback you've faced has not stopped you.
          </p>
          <p className="reveal-line font-serif italic text-xl md:text-2xl text-espresso/80 leading-relaxed">
            You're still here, still trying, still becoming.
          </p>
          <p className="reveal-line font-serif italic text-2xl md:text-3xl text-rose font-semibold leading-relaxed">
            That's not nothing.
            <br />
            That's everything.
          </p>
          <p className="reveal-line font-serif italic text-xl md:text-2xl text-espresso/80 leading-relaxed">
            The world hasn't seen the best of you yet.
          </p>
          <p className="reveal-line font-serif italic text-xl md:text-2xl text-espresso/80 leading-relaxed">
            And I get the front row seat — which makes me the luckiest person I know.
          </p>
        </div>

        <div className="mt-10 w-16 h-px bg-gold/40 mx-auto" />
      </div>
    </section>
  )
}
