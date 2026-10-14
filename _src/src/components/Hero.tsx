import { ArrowDown, Mail } from 'lucide-react'
import { EMAIL } from '@/data'
import { cn, isMac, scrollToId } from '@/lib/utils'
import DevCard from './DevCard'
import Terminal from './Terminal'

export default function Hero() {
  const mod = isMac() ? '⌘' : 'Ctrl'

  return (
    <section id="top" className="relative px-4 pb-20 pt-28 sm:px-6 sm:pt-36 lg:px-8 lg:pb-28 lg:pt-44">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="reveal inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 py-1.5 pl-3 pr-4 text-sm font-medium text-foreground">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
            </span>
            Open to new opportunities
          </p>

          <h1 className="reveal mt-7 text-[clamp(3.6rem,11vw,8.25rem)] font-extrabold leading-[0.9] tracking-[-0.045em]" style={{ '--d': '80ms' } as React.CSSProperties}>
            <span className="text-gradient animate-sheen block">Vaishnav</span>
            <span className="block font-serif font-normal italic tracking-[-0.02em] text-foreground">Jois</span>
          </h1>

          <p className="reveal mt-7 max-w-xl text-xl text-muted-foreground sm:text-2xl" style={{ '--d': '160ms' } as React.CSSProperties}>
            <span className="text-foreground">Cloud</span> &amp; <span className="text-foreground">Open-Source</span> Enthusiast — building skills across Azure, AWS and Google Cloud.
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={{ '--d': '240ms' } as React.CSSProperties}>
            <a
              href="#certifications"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('certifications')
              }}
              className={cn(
                'group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-background',
                'bg-gradient-to-r from-accent via-accent-2 to-accent shadow-lg shadow-accent/25 [background-size:200%_100%]',
                'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-accent/40 hover:[background-position:100%_0]',
              )}
            >
              View certifications
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Get in touch
            </a>
          </div>

          <p className="reveal mt-6 hidden text-xs text-muted-foreground md:block" style={{ '--d': '300ms' } as React.CSSProperties}>
            Tip: press{' '}
            <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">{mod}</kbd>{' '}
            <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">K</kbd> to jump anywhere.
          </p>

          <div className="reveal mt-10 max-w-xl" style={{ '--d': '340ms' } as React.CSSProperties}>
            <Terminal />
          </div>
        </div>

        <div className="reveal lg:col-span-5" style={{ '--d': '200ms' } as React.CSSProperties}>
          <DevCard />
        </div>
      </div>
    </section>
  )
}
