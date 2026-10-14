import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { CREDENTIALS, PROVIDERS, countBy } from '@/data'
import type { Provider } from '@/data'
import { cn } from '@/lib/utils'
import SectionHeader from './SectionHeader'

type Filter = 'All' | Provider

const dot: Record<Provider, string> = {
  AWS: 'bg-[hsl(32_95%_55%)]',
  Azure: 'bg-[hsl(210_95%_58%)]',
  'Google Cloud': 'bg-[hsl(142_70%_45%)]',
}

export default function Certifications() {
  const [filter, setFilter] = useState<Filter>('All')
  const counts = countBy(CREDENTIALS, (c) => c.provider)
  const shown = filter === 'All' ? CREDENTIALS : CREDENTIALS.filter((c) => c.provider === filter)
  const filters: Filter[] = ['All', ...PROVIDERS]

  return (
    <section id="certifications" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="03"
          eyebrow="Certifications"
          title={
            <>
              Certifi<span className="text-gradient font-serif font-normal italic">cations</span>
            </>
          }
          aside={
            <div role="group" aria-label="Filter by cloud provider" className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const n = f === 'All' ? CREDENTIALS.length : counts[f] ?? 0
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                      filter === f
                        ? 'border-accent bg-accent text-background'
                        : 'border-border bg-card/60 text-muted-foreground hover:border-accent/60 hover:text-foreground',
                    )}
                  >
                    {f}
                    <span className={cn('font-mono text-xs', filter === f ? 'text-background/80' : 'text-muted-foreground')}>{n}</span>
                  </button>
                )
              })}
            </div>
          }
        />

        <p className="sr-only" role="status">
          Showing {shown.length} of {CREDENTIALS.length} credentials
        </p>

        <ul key={filter} className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {shown.map((c, i) => (
            <li key={c.href} className="pop-in" style={{ '--d': `${i * 45}ms` } as React.CSSProperties}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group surface spotlight flex h-full flex-col p-3 transition-transform duration-300 hover:-translate-y-1.5 sm:p-4"
              >
                <span className="relative grid aspect-square place-items-center rounded-xl bg-gradient-to-b from-foreground/[0.07] to-transparent p-4 sm:aspect-[5/4] sm:p-5">
                  <img
                    src={c.src}
                    alt=""
                    width="160"
                    height="160"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105"
                  />
                </span>
                <span className="mt-4 flex flex-1 flex-col px-1">
                  <span className="text-sm font-medium leading-snug sm:text-[15px]">{c.name}</span>
                  <span className="mt-auto flex items-center justify-between gap-2 pt-4 font-mono text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <span className={cn('h-1.5 w-1.5 rounded-full', dot[c.provider])} aria-hidden="true" />
                      {c.provider} · {c.type}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    <span className="sr-only">(verify on {c.issuer}, opens in a new tab)</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
