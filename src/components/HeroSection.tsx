import { cn } from '@/lib/utils'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full bg-indigo-600 blur-3xl opacity-[0.07] animate-float" />
        <div className="absolute top-1/3 -right-56 w-[600px] h-[600px] rounded-full bg-violet-600 blur-3xl opacity-[0.07] animate-float animation-delay-200" />
        <div className="absolute -bottom-48 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600 blur-3xl opacity-[0.07] animate-float animation-delay-400" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            {/* Status badge */}
            <div
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7',
                'border border-indigo-500/30 bg-indigo-500/10',
                'text-indigo-400 dark:text-indigo-300 text-sm font-medium',
                'animate-fade-up opacity-0'
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse flex-shrink-0" />
              Open to new opportunities
            </div>

            {/* Name */}
            <h1
              className={cn(
                'text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight',
                'animate-fade-up opacity-0 animation-delay-100'
              )}
            >
              <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent pb-1">
                Vaishnav
              </span>
              <span className="block text-foreground">
                Jois
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={cn(
                'mt-5 text-xl sm:text-2xl text-muted-foreground font-light tracking-wide',
                'animate-fade-up opacity-0 animation-delay-200'
              )}
            >
              Cloud &amp; Open-Source Enthusiast
            </p>

            {/* CTA buttons */}
            <div
              className={cn(
                'mt-9 flex flex-wrap gap-3 justify-center md:justify-start',
                'animate-fade-up opacity-0 animation-delay-300'
              )}
            >
              <a
                href="#certifications"
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm',
                  'bg-gradient-to-r from-indigo-600 to-violet-600',
                  'hover:from-indigo-500 hover:to-violet-500',
                  'text-white shadow-lg shadow-indigo-500/20',
                  'hover:shadow-indigo-500/35 hover:-translate-y-0.5',
                  'transition-all duration-200'
                )}
              >
                View Certifications
              </a>
              <a
                href="mailto:github@jois.slmail.me"
                className={cn(
                  'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm',
                  'border border-border/80 bg-background/60 backdrop-blur-sm',
                  'text-foreground',
                  'hover:border-indigo-500/50 hover:bg-indigo-500/[0.06]',
                  'hover:-translate-y-0.5',
                  'transition-all duration-200'
                )}
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Dev Card */}
          <div
            className={cn(
              'flex-shrink-0',
              'animate-fade-up opacity-0 animation-delay-400'
            )}
          >
            <div className="relative animate-float animation-delay-100">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/40 to-violet-500/40 blur-2xl scale-110 opacity-60" />
              <img
                src="./assets/devcard.png"
                alt="Vaishnav Jois's Dev Card from daily.dev"
                width="300"
                height="420"
                loading="eager"
                className={cn(
                  'relative rounded-2xl shadow-2xl',
                  'border border-white/10',
                  'max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] w-full'
                )}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
