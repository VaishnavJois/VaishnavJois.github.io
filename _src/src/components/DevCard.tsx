import { DEVCARD_URL } from '@/data'

export default function DevCard() {
  return (
    <figure className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[370px]">
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[3rem] bg-linear-to-br from-accent/45 via-accent-2/25 to-accent-3/40 opacity-70 blur-3xl"
      />
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
      <figcaption className="mt-5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        daily.dev DevCard · refreshed daily
      </figcaption>
    </figure>
  )
}
