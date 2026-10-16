import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { ArrowDown } from 'lucide-react'
import { Orb02 } from '@/components/orbs/orb-02'
import { DEVCARD_URL } from '@/data'
import { prefersReducedMotion, useReducedMotion } from '@/hooks/useMotion'
import { createDotCard } from '@/lib/dot-card'
import { scrollToId } from '@/lib/utils'

export default function DevCard() {
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<ReturnType<typeof createDotCard> | null>(null)
  // Decided once on first render, so the card starts hidden only when it will assemble from dots.
  const [assemble] = useState(() => !prefersReducedMotion())
  // Followed live: turning reduced motion on mid-visit tears the dots down and shows the plain card.
  const reduced = useReducedMotion()

  useEffect(() => {
    const img = imgRef.current
    const canvas = canvasRef.current
    if (!assemble || !img || !canvas) return
    if (reduced) {
      img.style.opacity = ''
      return
    }
    let io: IntersectionObserver | undefined

    const start = () => {
      try {
        const dots = createDotCard(canvas, img)
        dotsRef.current = dots
        // Assemble once the card scrolls into view (straight away on desktop, where it is in the hero).
        io = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return
            dots.playIntro()
            io?.disconnect()
          },
          { threshold: 0.3 },
        )
        io.observe(img)
      } catch {
        img.style.opacity = ''
      }
    }
    const fail = () => {
      img.style.opacity = ''
    }

    // A complete image with no width already failed (its error event has fired), so show the card now.
    if (img.complete) {
      if (img.naturalWidth) start()
      else fail()
    } else {
      img.addEventListener('load', start, { once: true })
      img.addEventListener('error', fail, { once: true })
    }
    return () => {
      img.removeEventListener('load', start)
      img.removeEventListener('error', fail)
      io?.disconnect()
      dotsRef.current?.dispose()
      dotsRef.current = null
    }
  }, [assemble, reduced])

  const cardPoint = (e: PointerEvent) => {
    const img = imgRef.current!
    const r = img.getBoundingClientRect()
    return { x: ((e.clientX - r.left) / r.width) * img.offsetWidth, y: ((e.clientY - r.top) / r.height) * img.offsetHeight }
  }

  return (
    <figure
      className="devcard relative isolate mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[370px]"
      onPointerEnter={(e) => e.pointerType === 'mouse' && dotsRef.current?.burst(true, cardPoint(e))}
      onPointerLeave={(e) => e.pointerType === 'mouse' && dotsRef.current?.burst(false, cardPoint(e))}
    >
      {/* Dark mode: a shader orb glows behind the card. When hidden in light mode it stops rendering. */}
      <div className="pointer-events-none absolute left-1/2 top-[44%] -z-10 hidden -translate-x-1/2 -translate-y-1/2 dark:block">
        <Orb02 size={560} state="idle" className="w-[min(560px,130vw)] max-w-none" />
      </div>
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 dark:hidden rounded-[3rem] bg-linear-to-br from-accent/45 via-accent-2/25 to-accent-3/40 opacity-70 blur-3xl"
      />
      <div className="float">
        <a
          href={DEVCARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-tilt="9"
          aria-label="Open Vaishnav Jois's DevCard on daily.dev"
          className="tilt relative block rounded-[1.7rem] shadow-2xl ring-1 ring-white/15"
        >
          <img
            ref={imgRef}
            src="./assets/devcard.png"
            alt="Vaishnav Jois's daily.dev DevCard"
            width="648"
            height="946"
            decoding="async"
            className="block h-auto w-full rounded-[1.7rem]"
            style={assemble ? { opacity: 0 } : undefined}
          />
          {/* The card's own pixels as dots: it assembles from them on arrival and they scatter from the cursor on hover. */}
          <canvas ref={canvasRef} aria-hidden="true" className="dot-card" />
          <span className="tilt-glare" aria-hidden="true" />
        </a>
      </div>
      <a
        href="#certifications"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('certifications')
        }}
        className="burst-hint"
      >
        View certifications
        <ArrowDown className="h-3 w-3" aria-hidden="true" />
      </a>
      <figcaption className="devcard-caption mt-5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        daily.dev DevCard · refreshed daily
      </figcaption>
    </figure>
  )
}
