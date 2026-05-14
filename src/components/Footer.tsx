import { Github } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="mt-16 pb-8">
      <Separator className="mb-8" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
        <a
          href="https://github.com/VaishnavJois"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-7 w-7" />
        </a>
        <p className="text-sm text-muted-foreground">
          &copy; 2025 Vaishnav Jois. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
