import { useRef } from 'react'
import { motion } from 'framer-motion'
import useIntersection from '../hooks/useIntersection'

export default function MyPromise() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useIntersection(sectionRef, '-50px')

  return (
    <section
      ref={sectionRef}
      id="promise"
      className="relative min-h-[70svh] flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-warm via-rose-light/10 to-ivory pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative max-w-xl mx-auto"
      >
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl shadow-espresso/5 border border-white/50">
          <span className="font-heading italic text-gold/60 text-lg block text-center mb-6">
            On Your Effort
          </span>

          <div className="space-y-5">
            <p className="font-serif italic text-lg md:text-xl text-espresso/80 leading-relaxed text-center">
              I want to give you the world.
            </p>
            <p className="font-serif italic text-lg md:text-xl text-espresso/80 leading-relaxed text-center">
              Right now, what I have is this — my time, my heart, and everything I'm building toward.
            </p>
            <p className="font-serif italic text-lg md:text-xl text-espresso/80 leading-relaxed text-center">
              It's not much yet, but it's all real, and it's all yours.
            </p>
            <p className="font-serif italic text-lg md:text-xl text-rose leading-relaxed text-center font-semibold">
              I'm trying too, every single day, because you're worth every bit of it.
            </p>
          </div>

          <div className="mt-8 w-16 h-px bg-gold/40 mx-auto" />
        </div>
      </motion.div>
    </section>
  )
}
