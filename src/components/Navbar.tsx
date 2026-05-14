import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavbarProps {
  isDark: boolean
  onToggleTheme: () => void
}

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#links', label: 'Links' },
  { href: '#certifications', label: 'Certifications' },
]

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm shadow-black/5'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <a
              href="#"
              onClick={closeMobile}
              className="text-base font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent hover:opacity-75 transition-opacity select-none"
            >
              Vaishnav Jois
            </a>

            {/* Desktop Nav — centered */}
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-lg group',
                    activeSection === link.href
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <span className="absolute bottom-0.5 left-4 right-4 h-px rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
                  )}
                  {activeSection !== link.href && (
                    <span className="absolute bottom-0.5 left-4 right-4 h-px rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  )}
                </a>
              ))}
            </div>

            {/* Right side: theme toggle + hamburger */}
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleTheme}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className="rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-150"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300',
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/96 backdrop-blur-2xl"
          onClick={closeMobile}
        />
        {/* Content */}
        <div className="relative flex flex-col items-center justify-center h-full gap-6 pb-16">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
              className={cn(
                'text-4xl font-bold transition-colors duration-150 opacity-0',
                mobileOpen && 'animate-fade-up',
                activeSection === link.href
                  ? 'bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent'
                  : 'text-foreground hover:text-indigo-400'
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
