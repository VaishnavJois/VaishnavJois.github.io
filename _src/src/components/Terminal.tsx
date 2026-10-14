import { CREDENTIALS } from '@/data'

interface Line {
  kind: 'cmd' | 'out'
  text: string
  ok?: boolean
}

// Static on purpose: decorative typing must never delay when real content appears.
const LINES: Line[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'Vaishnav Jois' },
  { kind: 'cmd', text: 'cat now.txt' },
  { kind: 'out', text: 'learning → terraform · git · github' },
  { kind: 'cmd', text: 'ls credentials | wc -l' },
  { kind: 'out', text: String(CREDENTIALS.length) },
  { kind: 'cmd', text: 'echo $STATUS' },
  { kind: 'out', text: 'open to new opportunities', ok: true },
  { kind: 'cmd', text: '' },
]

export default function Terminal() {
  return (
    <div aria-hidden="true" className="surface overflow-hidden font-mono text-[13px] leading-relaxed shadow-2xl">
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-3/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(42_95%_58%)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-2/80" />
        <span className="ml-2 text-xs text-muted-foreground">vaishnav@cloud — ~</span>
      </div>
      <div className="min-h-[13.5rem] space-y-1 px-4 py-4 sm:px-5">
        {LINES.map((line, i) => (
          <p key={i} className={line.kind === 'cmd' ? 'text-foreground' : line.ok ? 'text-accent-2' : 'text-muted-foreground'}>
            <span className={line.kind === 'cmd' ? 'mr-2 select-none text-accent' : 'mr-2 select-none opacity-0'}>$</span>
            {line.ok && <span className="mr-2 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-accent-2" />}
            {line.text}
            {i === LINES.length - 1 && <span className="animate-blink ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.2em] bg-accent" />}
          </p>
        ))}
      </div>
    </div>
  )
}
