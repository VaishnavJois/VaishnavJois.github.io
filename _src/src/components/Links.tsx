import { ArrowUpRight } from 'lucide-react'
import { LINKS } from '@/data'
import SectionHeader from './SectionHeader'

const host = (href: string) => new URL(href).hostname.replace(/^www\./, '')

export default function Links() {
  return (
    <section id="links" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          eyebrow="Links"
          title={
            <>
              Worth a <span className="text-gradient font-serif font-normal italic">click</span>
            </>
          }
          aside={<p className="max-w-xs text-sm text-muted-foreground">Things I use, recommend and keep coming back to.</p>}
        />

        <ul className="surface divide-y divide-border overflow-hidden">
          {LINKS.map((link, i) => (
            <li key={link.href} className="reveal" style={{ '--d': `${i * 60}ms` } as React.CSSProperties}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group spotlight flex items-center gap-4 px-5 py-5 transition-colors hover:bg-muted/40 sm:gap-6 sm:px-8 sm:py-6"
              >
                <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">{link.label}</span>
                  <span className="mt-1 block truncate font-mono text-xs text-muted-foreground">{host(link.href)}</span>
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:rotate-12 group-hover:border-accent group-hover:bg-accent group-hover:text-background">
                  <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
