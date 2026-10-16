import { ArrowDown } from 'lucide-react'
import { Orb02 } from '@/components/orbs/orb-02'
import { CREDENTIALS, DEVCARD_URL } from '@/data'
import { scrollToId } from '@/lib/utils'

// Where each badge settles when it fans out from behind the card: offsets from the card's centre
// as a share of the figure's width / height, plus a resting tilt.
const BURST = [
  { x: -62, y: -30, r: -12 },
  { x: 63, y: -24, r: 10 },
  { x: -67, y: 6, r: 8 },
  { x: 66, y: 12, r: -9 },
  { x: -58, y: 38, r: -6 },
  { x: 60, y: 40, r: 7 },
]
const BADGES = ['Azure Fundamentals', 'Cloud Practitioner', 'Google Cloud', 'AI Practitioner', 'Generative AI', 'Cloud Essentials']
  .map((needle) => CREDENTIALS.find((c) => c.name.includes(needle)))
  .filter((c) => c !== undefined)

export default function DevCard() {
  return (
    <figure className="devcard relative isolate mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[370px]">
      {/* Dark mode: a shader orb glows behind the card. When hidden in light mode it stops rendering. */}
      <div className="pointer-events-none absolute left-1/2 top-[44%] -z-10 hidden -translate-x-1/2 -translate-y-1/2 dark:block">
        <Orb02 size={560} state="idle" className="w-[min(560px,130vw)] max-w-none" />
      </div>
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 dark:hidden rounded-[3rem] bg-linear-to-br from-accent/45 via-accent-2/25 to-accent-3/40 opacity-70 blur-3xl"
      />
      {/* Hover (fine pointers only): certification badges fan out from behind the card. */}
      <div className="badge-burst" aria-hidden="true">
        {BADGES.map((c, i) => (
          <img
            key={c.src}
            src={c.src}
            alt=""
            width="160"
            height="160"
            loading="lazy"
            decoding="async"
            className="burst-badge"
            style={{ '--x': `${BURST[i].x}%`, '--y': `${BURST[i].y}%`, '--r': `${BURST[i].r}deg`, '--d': `${i * 40}ms`, '--bob': `${6 + (i % 3)}s` } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="float">
        <a
          href={DEVCARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-tilt="9"
          aria-label="Open Vaishnav Jois's DevCard on daily.dev"
          className="tilt relative block rounded-[1.7rem] shadow-2xl ring-1 ring-white/15"
        >
          <img
            src="./assets/devcard.png"
            alt="Vaishnav Jois's daily.dev DevCard"
            width="648"
            height="946"
            decoding="async"
            className="block h-auto w-full rounded-[1.7rem]"
          />
          <span className="tilt-glare" aria-hidden="true" />
        </a>
      </div>
      <a
        href="#certifications"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('certifications')
        }}
        className="burst-hint"
      >
        View certifications
        <ArrowDown className="h-3 w-3" aria-hidden="true" />
      </a>
      <figcaption className="devcard-caption mt-5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        daily.dev DevCard · refreshed daily
      </figcaption>
    </figure>
  )
}
