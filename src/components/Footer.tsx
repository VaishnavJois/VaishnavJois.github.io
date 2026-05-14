import { Github } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="mt-8 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-border/60 pt-8">
          <div className="flex items-center justify-center gap-5">
            <a
              href="https://github.com/VaishnavJois"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vaishnav Jois on GitHub"
              className={cn(
                'text-muted-foreground hover:text-foreground',
                'p-2 rounded-lg hover:bg-muted/50',
                'transition-all duration-150'
              )}
            >
              <Github className="h-5 w-5" />
            </a>
            <span className="text-muted-foreground/40 select-none">|</span>
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Vaishnav Jois. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
