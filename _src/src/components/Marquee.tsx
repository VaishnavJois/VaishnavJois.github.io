import { MARQUEE } from '@/data'

export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {MARQUEE.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap font-serif text-3xl italic text-foreground/70 sm:text-4xl">
          {item}
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <div
      aria-label="Focus areas"
      role="region"
      className="relative overflow-hidden border-y border-border bg-card/30 py-7 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
