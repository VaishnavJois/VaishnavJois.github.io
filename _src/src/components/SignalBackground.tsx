import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useMotion'
import { createSignalBg } from '@/lib/signal-bg'
import { cn } from '@/lib/utils'

type Props = {
  /** Where the bust sits, as shares of the canvas width / height. */
  focus?: [number, number]
  className?: string
}

/**
 * The "Signal" glyph-portrait shader as a section background. It is opaque black, so it is shown in dark
 * mode on lg+ screens only (narrower cards push the portrait behind the text). The WebGL context is only
 * created once the canvas is actually on screen, so hidden copies (light mode, phones) cost nothing.
 */
export default function SignalBackground({ focus = [0.62, 0.55], className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const still = useReducedMotion()
  const [fx, fy] = focus

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let bg: ReturnType<typeof createSignalBg> | null = null
    let onScreen = false

    const sync = () => bg?.setRunning(onScreen && !document.hidden)
    const io = new IntersectionObserver(([entry]) => {
      // A display:none canvas never intersects, so it never gets a context.
      onScreen = entry.isIntersecting
      if (onScreen && !bg) {
        try {
          bg = createSignalBg(canvas, { focus: [fx, fy], still })
        } catch {
          canvas.style.display = 'none'
          io.disconnect()
          return
        }
      }
      sync()
    })
    io.observe(canvas)
    document.addEventListener('visibilitychange', sync)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      bg?.dispose()
    }
  }, [fx, fy, still])

  return <canvas ref={ref} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 -z-10 hidden h-full w-full lg:dark:block', className)} />
}
