import { useRef } from 'react'
import { motion } from 'framer-motion'
import useIntersection from '../hooks/useIntersection'

export default function OpeningMessage() {
  const ref = useRef<HTMLElement>(null)
  const isVisible = useIntersection(ref, '-50px')

  return (
    <section
      ref={ref}
      id="opening-message"
      className="relative min-h-[60svh] flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-warm to-rose-light/20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative max-w-2xl mx-auto text-center"
      >
        <div className="mb-8 text-gold/40">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="mx-auto">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className="space-y-6">
          <p className="font-serif italic text-xl md:text-2xl text-espresso/80 leading-relaxed">
            You walked into my life and made it warmer just by being in it.
          </p>
          <p className="font-serif italic text-xl md:text-2xl text-espresso/80 leading-relaxed">
            This is a small piece of what you mean to me — because some things are too big for words, but I'll keep trying anyway.
          </p>
        </div>

        <div className="mt-10 w-16 h-px bg-gold/40 mx-auto" />
      </motion.div>
    </section>
  )
}
