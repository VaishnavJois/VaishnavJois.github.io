import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/95 backdrop-blur-sm border-b border-border shadow-sm'
            : 'bg-background/80 backdrop-blur-sm'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <a
              href="#"
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              Vaishnav Jois
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Theme toggle + hamburger */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={isDark}
                  onCheckedChange={onToggleTheme}
                  aria-label="Toggle dark mode"
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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

      {/* Mobile slide-in panel */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-opacity duration-300',
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={closeMobile}
          aria-hidden="true"
        />
        {/* Panel */}
        <div
          className={cn(
            'absolute top-16 right-0 bottom-0 w-64 bg-background border-l border-border shadow-xl transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <nav className="flex flex-col p-6 gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border last:border-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
