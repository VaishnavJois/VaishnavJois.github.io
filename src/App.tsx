import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import LinksSection from '@/components/LinksSection'
import CertificationsSection from '@/components/CertificationsSection'
import Footer from '@/components/Footer'

function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light') return false
      return true // default dark
    } catch {
      return true
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const handleToggleTheme = () => setIsDark((prev) => !prev)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar isDark={isDark} onToggleTheme={handleToggleTheme} />
      <main>
        <HeroSection />
        <div className="space-y-4">
          <AboutSection />
          <LinksSection />
          <CertificationsSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
