import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowUp, BookOpen, Copy, Github, IdCard, Link2, Mail, Moon, Sun, Award, User } from 'lucide-react'
import { DEVCARD_URL, EMAIL, GITHUB_URL } from '@/data'
import { copyText, scrollToId } from '@/lib/utils'
import { usePointerEffects, useScrollReveal } from '@/hooks/useMotion'
import { useTheme } from '@/hooks/useTheme'
import Background from '@/components/Background'
import Nav from '@/components/Nav'
import CommandPalette from '@/components/CommandPalette'
import type { Cmd } from '@/components/CommandPalette'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import Links from '@/components/Links'
import Certifications from '@/components/Certifications'
import Footer from '@/components/Footer'

export default function App() {
  const { isDark, toggle } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)

  const closePalette = useCallback(() => setPaletteOpen(false), [])
  const openPalette = useCallback(() => setPaletteOpen(true), [])

  useScrollReveal()
  usePointerEffects()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const commands = useMemo<Cmd[]>(() => {
    const open = (url: string) => () => {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
    return [
      { id: 'top', group: 'Navigate', label: 'Back to top', icon: ArrowUp, run: () => scrollToId('top') },
      { id: 'about', group: 'Navigate', label: 'About me', icon: User, run: () => scrollToId('about') },
      { id: 'links', group: 'Navigate', label: 'Links', icon: Link2, run: () => scrollToId('links') },
      { id: 'certs', group: 'Navigate', label: 'Certifications', icon: Award, run: () => scrollToId('certifications') },
      { id: 'email', group: 'Actions', label: 'Send an email', hint: EMAIL, icon: Mail, run: () => void (window.location.href = `mailto:${EMAIL}`) },
      {
        id: 'copy',
        group: 'Actions',
        label: 'Copy email address',
        hint: EMAIL,
        icon: Copy,
        run: async () => ((await copyText(EMAIL)) ? 'Email copied to clipboard' : 'Could not copy — select it manually'),
      },
      { id: 'github', group: 'Actions', label: 'Open GitHub profile', hint: 'github.com/VaishnavJois', icon: Github, run: open(GITHUB_URL) },
      { id: 'devcard', group: 'Actions', label: 'Open DevCard on daily.dev', hint: 'app.daily.dev', icon: IdCard, run: open(DEVCARD_URL) },
      { id: 'learn', group: 'Actions', label: 'What am I learning?', hint: 'Terraform · Git · GitHub', icon: BookOpen, run: () => scrollToId('about') },
      {
        id: 'theme',
        group: 'Actions',
        label: isDark ? 'Switch to light theme' : 'Switch to dark theme',
        icon: isDark ? Sun : Moon,
        run: toggle,
      },
    ]
  }, [isDark, toggle])

  return (
    <div className="grain relative min-h-screen overflow-x-clip">
      <a
        href="#main"
        className="sr-only fixed left-4 top-4 z-[80] rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background focus:not-sr-only"
      >
        Skip to content
      </a>
      <Background />
      <Nav isDark={isDark} onToggleTheme={toggle} onOpenPalette={openPalette} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <About />
        <Links />
        <Certifications />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={closePalette} commands={commands} />
    </div>
  )
}
