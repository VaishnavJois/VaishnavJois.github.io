import { ExternalLink, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const LINKS = [
  {
    label: 'My Dev Card on daily.dev',
    href: 'https://app.daily.dev/vaishnavjois',
  },
  {
    label: 'How to showcase #DevCard',
    href: 'https://daily.dev/blog/adding-the-daily-devcard-to-your-github-profile',
  },
  {
    label: 'Proton Privacy (Recommended)',
    href: 'https://proton.me/',
  },
  {
    label: 'Try Mail Plus for free (Referral)',
    href: 'https://pr.tn/ref/TZ6Y91M8F2M0',
  },
  {
    label: "Check out Apple's latest ML model",
    href: 'https://apple-fastvlm-webgpu.static.hf.space',
  },
]

export default function LinksSection() {
  return (
    <section id="links" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Links
          </h2>
          <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
        </div>

        {/* Link cards */}
        <div className="flex flex-col gap-2.5">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'group flex items-center gap-4 px-5 py-4 rounded-xl',
                'border border-border/60 bg-card/40',
                'hover:bg-card',
                'hover:border-indigo-500/45',
                'hover:shadow-md hover:shadow-indigo-500/[0.08]',
                'hover:-translate-y-0.5',
                'transition-all duration-200'
              )}
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20">
                <ExternalLink className="h-4 w-4 text-indigo-400" />
              </div>

              {/* Label */}
              <span className="flex-1 text-sm sm:text-base font-medium text-foreground/85 group-hover:text-foreground transition-colors duration-150 truncate">
                {link.label}
              </span>

              {/* Arrow */}
              <ArrowRight
                className={cn(
                  'h-4 w-4 text-muted-foreground flex-shrink-0',
                  'translate-x-0 group-hover:translate-x-1.5',
                  'opacity-0 group-hover:opacity-100',
                  'transition-all duration-200'
                )}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
