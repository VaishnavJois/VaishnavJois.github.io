import { Rocket, BookOpen, Shield, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const ABOUT_ITEMS = [
  {
    icon: Rocket,
    text: 'Exploring the potential of Open-Source',
    color: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    iconBorder: 'border-indigo-500/25',
    hoverBorder: 'hover:border-indigo-500/40',
    hoverGlow: 'hover:shadow-indigo-500/10',
  },
  {
    icon: BookOpen,
    text: 'Currently learning Terraform, Git, and GitHub',
    color: 'text-violet-400',
    iconBg: 'bg-violet-500/10',
    iconBorder: 'border-violet-500/25',
    hoverBorder: 'hover:border-violet-500/40',
    hoverGlow: 'hover:shadow-violet-500/10',
  },
  {
    icon: Shield,
    text: 'Intrigued by privacy-focused open-source projects',
    color: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
    iconBorder: 'border-purple-500/25',
    hoverBorder: 'hover:border-purple-500/40',
    hoverGlow: 'hover:shadow-purple-500/10',
  },
  {
    icon: Mail,
    href: 'mailto:github@jois.slmail.me',
    linkText: 'github@jois.slmail.me',
    prefix: 'Contact: ',
    color: 'text-sky-400',
    iconBg: 'bg-sky-500/10',
    iconBorder: 'border-sky-500/25',
    hoverBorder: 'hover:border-sky-500/40',
    hoverGlow: 'hover:shadow-sky-500/10',
  },
] as const

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            About Me
          </h2>
          <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
        </div>

        {/* Feature cards grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          {ABOUT_ITEMS.map((item, idx) => {
            const Icon = item.icon
            const content =
              'href' in item ? (
                <>
                  {item.prefix}
                  <a
                    href={item.href}
                    className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/40 hover:decoration-indigo-400 transition-colors"
                  >
                    {item.linkText}
                  </a>
                </>
              ) : (
                item.text
              )

            return (
              <div
                key={idx}
                className={cn(
                  'group flex items-center gap-4 px-5 py-4 rounded-xl',
                  'border border-border/60 bg-card/40',
                  'hover:bg-card',
                  item.hoverBorder,
                  'hover:shadow-md',
                  item.hoverGlow,
                  'hover:-translate-y-0.5',
                  'transition-all duration-200'
                )}
              >
                <div
                  className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-lg',
                    'flex items-center justify-center',
                    'border',
                    item.iconBg,
                    item.iconBorder
                  )}
                >
                  <Icon className={cn('h-5 w-5', item.color)} />
                </div>
                <span className="text-sm sm:text-base text-foreground/85 leading-snug">
                  {content}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
