import { ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const LINKS = [
  {
    label: 'My Dev Card on daily.dev',
    href: 'https://app.daily.dev/vaishnavjois',
  },
  {
    label: 'How to showcase #DevCard',
    href: 'https://daily.dev/blog/adding-the-daily-devcard-to-your-github-profile',
  },
  {
    label: 'Proton Privacy Recommended',
    href: 'https://proton.me/',
  },
  {
    label: 'Try Mail Plus for free Referral',
    href: 'https://pr.tn/ref/TZ6Y91M8F2M0',
  },
  {
    label: "Check out Apple's latest ML model",
    href: 'https://apple-fastvlm-webgpu.static.hf.space',
  },
]

export default function LinksSection() {
  return (
    <section id="links" className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl">Links</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-base text-primary hover:underline underline-offset-4 transition-all"
                >
                  <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
