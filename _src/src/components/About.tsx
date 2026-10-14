import { useState } from 'react'
import { ArrowUpRight, BookOpen, Check, Copy, Rocket, ShieldCheck } from 'lucide-react'
import { CREDENTIALS, EMAIL, PROVIDERS, countBy } from '@/data'
import { cn, copyText } from '@/lib/utils'
import SectionHeader from './SectionHeader'

const card = 'reveal surface spotlight p-6 sm:p-8'

function IconBadge({ children, tone }: { children: React.ReactNode; tone: 'accent' | 'accent-2' | 'accent-3' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid h-11 w-11 place-items-center rounded-xl border',
        tone === 'accent' && 'border-accent/30 bg-accent/10 text-accent',
        tone === 'accent-2' && 'border-accent-2/30 bg-accent-2/10 text-accent-2',
        tone === 'accent-3' && 'border-accent-3/30 bg-accent-3/10 text-accent-3',
      )}
    >
      {children}
    </span>
  )
}

export default function About() {
  const [copied, setCopied] = useState(false)
  const certs = countBy(CREDENTIALS, (c) => c.type)['Certification'] ?? 0

  const copy = async () => {
    if (await copyText(EMAIL)) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    }
  }

  const delay = (ms: number) => ({ '--d': `${ms}ms` }) as React.CSSProperties

  return (
    <section id="about" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          eyebrow="About"
          title={
            <>
              About Me
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-6">
          <article className={cn(card, 'md:col-span-4 md:row-span-1')}>
            <IconBadge tone="accent">
              <Rocket className="h-5 w-5" />
            </IconBadge>
            <h3 className="mt-6 text-2xl font-medium leading-snug tracking-tight sm:text-4xl sm:leading-10">
              Exploring the potential of <span className="text-accent">Open-Source</span>
            </h3>
          </article>

          <article className={cn(card, 'flex flex-col justify-between md:col-span-2')} style={delay(80)}>
            <p className="eyebrow">Credentials</p>
            <div className="mt-6">
              <p className="text-7xl font-semibold leading-none tracking-tighter tabular-nums sm:text-8xl">{CREDENTIALS.length}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {certs} certifications across {PROVIDERS.length} cloud platforms — {PROVIDERS.join(', ')}.
              </p>
            </div>
          </article>

          <article className={cn(card, 'md:col-span-3')} style={delay(120)}>
            <IconBadge tone="accent-2">
              <BookOpen className="h-5 w-5" />
            </IconBadge>
            <h3 className="mt-6 text-xl font-medium leading-snug tracking-tight sm:text-2xl sm:leading-8">Currently learning Terraform, Git, and GitHub</h3>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Currently learning">
              {['Terraform', 'Git', 'GitHub'].map((t) => (
                <li key={t} className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground">
                  {t}
                </li>
              ))}
            </ul>
          </article>

          <article className={cn(card, 'md:col-span-3')} style={delay(160)}>
            <IconBadge tone="accent-3">
              <ShieldCheck className="h-5 w-5" />
            </IconBadge>
            <h3 className="mt-6 text-xl font-medium leading-snug tracking-tight sm:text-2xl sm:leading-8">Intrigued by privacy-focused open-source projects</h3>
          </article>

          <article className={cn(card, 'flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between md:col-span-6')} style={delay(200)}>
            <div>
              <p className="eyebrow">Contact</p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-3 inline-flex items-center gap-2 break-all text-xl font-medium tracking-tight underline decoration-accent/50 decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent sm:text-3xl"
              >
                {EMAIL}
                <ArrowUpRight className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              </a>
            </div>
            <button
              type="button"
              onClick={copy}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-muted/60 px-5 py-3 text-sm font-medium transition-colors hover:border-accent/60"
            >
              {copied ? <Check className="h-4 w-4 text-accent-2" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy email'}
              <span role="status" className="sr-only">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </button>
          </article>
        </div>
      </div>
    </section>
  )
}
