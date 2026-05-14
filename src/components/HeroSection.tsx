export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-16">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950" />
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-violet-500/10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Vaishnav Jois
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-indigo-200 font-light">
              Cloud &amp; Open-Source Enthusiast
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="#about"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
              >
                Learn More
              </a>
              <a
                href="https://github.com/VaishnavJois"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-white/30 hover:border-white/60 text-white font-medium transition-colors backdrop-blur-sm"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Dev Card */}
          <div className="flex-shrink-0">
            <img
              src="https://raw.githubusercontent.com/VaishnavJois/VaishnavJois.github.io/live/devcard.png"
              alt="Vaishnav Jois's Dev Card from daily.dev"
              width="300"
              height="420"
              className="rounded-2xl shadow-2xl border border-white/10 max-w-[260px] sm:max-w-[300px] w-full"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
