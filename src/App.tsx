import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './components/HeroSection'
import OpeningMessage from './components/OpeningMessage'
import MemoryTimeline from './components/MemoryTimeline'
import PhotoGallery from './components/PhotoGallery'
import Encouragement from './components/Encouragement'
import MyPromise from './components/MyPromise'
import ClosingSection from './components/ClosingSection'
import ScrollCue from './components/ScrollCue'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      touchInertiaMultiplier: 3.5,
      wheelMultiplier: 1.5,
      gestureOrientation: 'vertical',
    })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    return () => {
      lenis.destroy()
      gsap.ticker.lagSmoothing(1)
    }
  }, [])

  return (
    <main className="bg-ivory min-h-svh overflow-x-hidden">
      <HeroSection />
      <ScrollCue targetId="opening-message" />
      <OpeningMessage />
      <ScrollCue targetId="timeline" />
      <MemoryTimeline />
      <ScrollCue targetId="gallery" />
      <PhotoGallery />
      <Encouragement />
      <MyPromise />
      <ClosingSection />
    </main>
  )
}
