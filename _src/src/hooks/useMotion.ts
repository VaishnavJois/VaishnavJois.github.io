import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.(QUERY).matches === true

export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion)
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Reveals `.reveal` elements as they scroll into view. */
export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      els.forEach((el) => el.setAttribute('data-in', ''))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-in', '')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** Returns the id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    const onScroll = () => {
      if (window.scrollY < 200) setActive(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])
  return active
}

/**
 * One delegated pointer listener powers every `.spotlight` (cursor glow) and
 * `[data-tilt]` (3D tilt) element on the page – no per-component handlers.
 */
export function usePointerEffects() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion()) return

    let raf = 0
    let last: PointerEvent | null = null

    const run = () => {
      raf = 0
      const e = last
      if (!e) return
      const target = e.target as Element | null

      const spot = target?.closest<HTMLElement>('.spotlight')
      if (spot) {
        const r = spot.getBoundingClientRect()
        spot.style.setProperty('--mx', `${e.clientX - r.left}px`)
        spot.style.setProperty('--my', `${e.clientY - r.top}px`)
      }

      const tilt = target?.closest<HTMLElement>('[data-tilt]')
      if (tilt) {
        const r = tilt.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        const max = Number(tilt.dataset.tilt) || 8
        tilt.style.setProperty('--ry', `${((px - 0.5) * 2 * max).toFixed(2)}deg`)
        tilt.style.setProperty('--rx', `${((0.5 - py) * 2 * max).toFixed(2)}deg`)
        tilt.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
        tilt.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
        tilt.dataset.active = 'true'
      }
    }

    const onMove = (e: PointerEvent) => {
      last = e
      if (!raf) raf = requestAnimationFrame(run)
    }

    const reset = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>('[data-tilt]')
      // pointerout bubbles from children – only reset when the pointer truly leaves the element.
      if (!el || el.contains(e.relatedTarget as Node | null)) return
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      el.dataset.active = 'false'
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', reset, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', reset)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}
