import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./_src/index.html', './_src/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: 'hsl(var(--card) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-2': 'hsl(var(--accent-2) / <alpha-value>)',
        'accent-3': 'hsl(var(--accent-3) / <alpha-value>)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(3%, -4%, 0) scale(1.08)' },
        },
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        sheen: { from: { backgroundPosition: '0% 50%' }, to: { backgroundPosition: '200% 50%' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        drift: 'drift 22s ease-in-out infinite',
        'drift-slow': 'drift 30s ease-in-out infinite reverse',
        blink: 'blink 1.1s steps(1) infinite',
        sheen: 'sheen 8s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
