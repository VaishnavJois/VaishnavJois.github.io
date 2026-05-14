import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const ABOUT_ITEMS = [
  {
    emoji: '🚀',
    text: 'Exploring the potential of Open-Source',
  },
  {
    emoji: '📚',
    text: 'Currently learning Terraform, Git, and GitHub',
  },
  {
    emoji: '🤝',
    text: 'Intrigued by privacy-focused open-source projects',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl">About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {ABOUT_ITEMS.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-base text-foreground">
                <span className="text-2xl leading-none mt-0.5" aria-hidden="true">
                  {item.emoji}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
            <li className="flex items-start gap-3 text-base text-foreground">
              <span className="text-2xl leading-none mt-0.5" aria-hidden="true">
                📧
              </span>
              <span>
                Contact:{' '}
                <a
                  href="mailto:github@jois.slmail.me"
                  className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  github@jois.slmail.me
                </a>
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
