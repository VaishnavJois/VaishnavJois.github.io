import { useCallback, useState } from 'react'

function apply(dark: boolean) {
  const root = document.documentElement
  root.classList.toggle('dark', dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  } catch {
    /* storage unavailable (private mode) – the theme still applies for this visit */
  }
}

export function useTheme() {
  // The initial class is set synchronously by the inline script in index.html.
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark')
    apply(next)
    setIsDark(next)
  }, [])

  return { isDark, toggle }
}
