import { useEffect, useMemo, useRef, useState } from 'react'
import { CornerDownLeft, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Cmd {
  id: string
  label: string
  hint?: string
  group: 'Navigate' | 'Actions'
  icon: LucideIcon
  /** Return a short message to show in the footer instead of closing. */
  run: () => void | string | Promise<void | string>
}

interface Props {
  open: boolean
  onClose: () => void
  commands: Cmd[]
}

export default function CommandPalette({ open, onClose, commands }: Props) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [status, setStatus] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? commands.filter((c) => `${c.label} ${c.hint ?? ''} ${c.group}`.toLowerCase().includes(q)) : commands
  }, [commands, query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setIndex(0)
    setStatus('')
    const previous = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
      previous?.focus?.()
    }
  }, [open])

  // Esc must work even if focus has not reached (or has left) the dialog, e.g. after clicking the backdrop.
  useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  useEffect(() => setIndex(0), [query])

  // Keep the flat index (for keyboard nav) alongside the grouped structure (for ARIA).
  const groups = useMemo(() => {
    const out: { name: Cmd['group']; items: { cmd: Cmd; i: number }[] }[] = []
    filtered.forEach((cmd, i) => {
      let g = out.find((x) => x.name === cmd.group)
      if (!g) out.push((g = { name: cmd.group, items: [] }))
      g.items.push({ cmd, i })
    })
    return out
  }, [filtered])

  useEffect(() => {
    if (!open) return
    document.getElementById(`cmd-${filtered[index]?.id}`)?.scrollIntoView({ block: 'nearest' })
  }, [index, filtered, open])

  if (!open) return null

  const execute = async (cmd: Cmd | undefined) => {
    if (!cmd) return
    const message = await cmd.run()
    if (typeof message === 'string') {
      setStatus(message)
      window.setTimeout(() => setStatus(''), 2200)
    } else {
      onClose()
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      void execute(filtered[index])
    } else if (e.key === 'Tab') {
      e.preventDefault() // keep focus inside the dialog
    }
  }

  return (
    <div
      className="fade-in fixed inset-0 z-[70] flex items-start justify-center bg-background/70 px-4 pt-[14vh] backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onKeyDown={onKeyDown}
        className="surface pop-in w-full max-w-xl overflow-hidden bg-card/90 shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-list"
            aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
            aria-label="Search commands"
            placeholder="Jump to a section or run an action…"
            autoComplete="off"
            spellCheck={false}
            className="h-14 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block">esc</kbd>
        </div>

        <div id="cmd-list" role="listbox" aria-label="Commands" className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p role="presentation" className="px-3 py-8 text-center text-sm text-muted-foreground">
              No matches for “{query}”.
            </p>
          )}
          {groups.map((group) => (
            <div key={group.name} role="group" aria-labelledby={`cmd-group-${group.name}`}>
              <p id={`cmd-group-${group.name}`} className="px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {group.name}
              </p>
              {group.items.map(({ cmd, i }) => {
                const Icon = cmd.icon
                return (
                  <div
                    key={cmd.id}
                    id={`cmd-${cmd.id}`}
                    role="option"
                    aria-selected={i === index}
                    onMouseMove={() => setIndex(i)}
                    onClick={() => void execute(cmd)}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                      i === index ? 'bg-accent/15 text-foreground' : 'text-foreground/80',
                    )}
                  >
                    <Icon className={cn('h-4 w-4 shrink-0', i === index ? 'text-accent' : 'text-muted-foreground')} aria-hidden="true" />
                    <span className="flex-1 truncate">{cmd.label}</span>
                    {cmd.hint && <span className="hidden truncate text-xs text-muted-foreground sm:block">{cmd.hint}</span>}
                    {i === index && <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <p role="status" aria-live="polite" className="flex items-center justify-between border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
          <span>{status || '↑↓ navigate · ↵ select'}</span>
          <span className="hidden sm:inline">Vaishnav Jois</span>
        </p>
      </div>
    </div>
  )
}
