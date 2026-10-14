import { ArrowUp, ArrowUpRight, Github } from 'lucide-react'
import { DEVCARD_URL, EMAIL, GITHUB_URL } from '@/data'
import { scrollToId } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="reveal surface spotlight relative overflow-hidden p-8 text-center sm:p-14">
          <p className="eyebrow">Say hello</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl sm:leading-none">
            Open to new <span className="text-gradient font-serif font-normal italic">opportunities.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">Cloud, open source or privacy-focused projects — I'd love to hear what you're building.</p>
          <a
            href={`mailto:${EMAIL}`}
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-foreground px-7 py-4 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            {EMAIL}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Vaishnav Jois. All Rights Reserved.</p>
          <ul className="flex items-center gap-1">
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vaishnav Jois on GitHub"
                className="grid h-10 w-10 place-items-center rounded-lg transition-colors hover:bg-muted hover:text-foreground"
              >
                <Github className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={DEVCARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-lg px-3 font-mono text-xs transition-colors hover:bg-muted hover:text-foreground"
              >
                daily.dev
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => scrollToId('top')}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg px-3 transition-colors hover:bg-muted hover:text-foreground"
              >
                Back to top
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
