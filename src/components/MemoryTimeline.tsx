import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timelineEntries } from '../data/timeline'

gsap.registerPlugin(ScrollTrigger)

export default function MemoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { height: 0 },
        {
          height: '100%',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      )

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const img = card.querySelector('.timeline-img') as HTMLElement
        const content = card.querySelector('.timeline-content') as HTMLElement

        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.1, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                end: 'top 40%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        if (content) {
          gsap.fromTo(
            content,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2,
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                end: 'top 40%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rose-light/10 via-ivory to-ivory pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        <TimelineHeader />
        <div className="relative">
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-gold/60 via-rose/40 to-transparent -translate-x-1/2 origin-top"
          />
          <div className="space-y-16 md:space-y-24">
            {timelineEntries.map((entry, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el }}
                className={`relative flex flex-col md:flex-row gap-6 md:gap-10 items-start ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="hidden md:block absolute left-1/2 top-8 w-4 h-4 -translate-x-1/2 rounded-full bg-gold border-2 border-ivory shadow-lg shadow-gold/20 z-10" />
                <div className="md:hidden absolute left-4 top-8 w-3 h-3 -translate-x-1/2 rounded-full bg-gold border-2 border-ivory shadow-lg shadow-gold/20 z-10" />

                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-10 md:pl-0`}>
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl shadow-espresso/5 border border-white/50">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={entry.image}
                        alt={entry.title}
                        loading="lazy"
                        className="timeline-img w-full h-full object-cover"
                      />
                    </div>
                    <div className="timeline-content p-5 md:p-6">
                      <span className="font-body text-xs text-gold tracking-widest uppercase">
                        {entry.date}
                      </span>
                      <h3 className="font-heading text-xl md:text-2xl text-espresso mt-1">
                        {entry.title}
                      </h3>
                      <p className="font-body text-sm text-espresso/60 mt-2 leading-relaxed">
                        {entry.caption}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineHeader() {
  return (
    <div className="text-center mb-16 md:mb-24">
      <span className="font-heading italic text-gold/60 text-lg">Our story</span>
      <h2 className="font-heading text-3xl md:text-4xl text-espresso mt-2">
        A Timeline of Us
      </h2>
      <p className="font-body text-espresso/50 text-sm mt-3 max-w-md mx-auto">
        Every moment we've shared, captured and cherished.
      </p>
    </div>
  )
}
