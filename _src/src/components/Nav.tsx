import { Command, Menu, Moon, Sun } from 'lucide-react'
import { cn, isMac, scrollToId } from '@/lib/utils'
import { useActiveSection } from '@/hooks/useMotion'

export const NAV = [
  { id: 'about', label: 'About' },
  { id: 'links', label: 'Links' },
  { id: 'certifications', label: 'Certifications' },
] as const

const SECTION_IDS = NAV.map((n) => n.id)

interface Props {
  isDark: boolean
  onToggleTheme: () => void
  onOpenPalette: () => void
}

export default function Nav({ isDark, onToggleTheme, onOpenPalette }: Props) {
  const active = useActiveSection(SECTION_IDS)
  const mod = isMac() ? '⌘' : 'Ctrl'

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5">
      <nav aria-label="Primary" className="surface flex w-full max-w-2xl items-center gap-1 p-1.5 pr-2 shadow-xl">
        <a
          href="#top"
          onClick={go('top')}
          aria-label="VJ — Vaishnav Jois, back to top"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 font-mono text-sm font-bold text-background"
        >
          VJ
        </a>

        <ul className="ml-1 hidden flex-1 items-center justify-center gap-0.5 sm:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={go(item.id)}
                aria-current={active === item.id ? 'location' : undefined}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  active === item.id
                    ? 'bg-accent/15 text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1 sm:ml-0">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label={`Open command menu, ${mod} K`}
            aria-keyshortcuts={isMac() ? 'Meta+K' : 'Control+K'}
            aria-haspopup="dialog"
            className="hidden h-9 items-center gap-2 rounded-lg border border-border bg-muted/60 px-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <Command className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-mono">{mod} K</span>
          </button>
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:hidden"
          >
            <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {isDark ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  )
}
