import { useEffect, useMemo, useState } from 'react'
import { CREDENTIALS } from '@/data'
import { useReducedMotion } from '@/hooks/useMotion'

interface Line {
  kind: 'cmd' | 'out'
  text: string
  tone?: 'ok'
}

// Typing budget: commands cost one unit per character, output appears in a single unit,
// and each line is followed by a short pause.
const cost = (l: Line) => (l.kind === 'cmd' ? l.text.length : 1) + (l.kind === 'cmd' ? 10 : 6)

export default function Terminal() {
  const reduced = useReducedMotion()

  const lines = useMemo<Line[]>(
    () => [
      { kind: 'cmd', text: 'whoami' },
      { kind: 'out', text: 'Vaishnav Jois' },
      { kind: 'cmd', text: 'cat now.txt' },
      { kind: 'out', text: 'learning → terraform · git · github' },
      { kind: 'cmd', text: 'ls credentials | wc -l' },
      { kind: 'out', text: String(CREDENTIALS.length) },
      { kind: 'cmd', text: 'echo $STATUS' },
      { kind: 'out', text: 'open to new opportunities', tone: 'ok' },
      { kind: 'cmd', text: '' },
    ],
    [],
  )
  const total = useMemo(() => lines.reduce((n, l) => n + cost(l), 0), [lines])
  const [units, setUnits] = useState(0)

  useEffect(() => {
    if (reduced) {
      setUnits(total)
      return
    }
    const start = performance.now() + 900
    let raf = 0
    const tick = (now: number) => {
      const u = Math.min(total, Math.max(0, Math.floor((now - start) / 22)))
      setUnits(u)
      if (u < total) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, total])

  // A line is visible once the budget has reached it; commands then type out character by character.
  let rem = units
  const rows = lines.map((l) => {
    const visible = rem > 0
    const typed = l.kind === 'cmd' ? Math.max(0, Math.min(l.text.length, rem)) : visible ? l.text.length : 0
    rem = Math.max(0, rem - cost(l))
    return { l, typed, visible }
  })

  // Caret sits on the last line that has begun typing.
  let caretAt = 0
  rows.forEach((r, i) => {
    if (r.visible) caretAt = i
  })

  return (
    <div aria-hidden="true" className="surface overflow-hidden font-mono text-[13px] leading-relaxed shadow-2xl">
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-3/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(42_95%_58%)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-2/80" />
        <span className="ml-2 text-xs text-muted-foreground">vaishnav@cloud — ~</span>
      </div>
      <div className="min-h-[13.5rem] space-y-1 px-4 py-4 sm:px-5">
        {rows.map(({ l, typed, visible }, i) =>
          !visible && i !== caretAt ? null : (
            <p key={i} className={l.kind === 'cmd' ? 'text-foreground' : l.tone === 'ok' ? 'text-accent-2' : 'text-muted-foreground'}>
              {l.kind === 'cmd' ? <span className="mr-2 select-none text-accent">$</span> : <span className="mr-2 select-none opacity-0">$</span>}
              {l.tone === 'ok' && typed > 0 && <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-accent-2" />}
              {l.text.slice(0, typed)}
              {i === caretAt && <span className="animate-blink ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.2em] bg-accent" />}
            </p>
          ),
        )}
      </div>
    </div>
  )
}
