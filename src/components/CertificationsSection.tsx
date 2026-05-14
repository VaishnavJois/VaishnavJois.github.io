import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const CERTIFICATIONS = [
  {
    src: '/assets/microsoft-certified-azure-fundamentals.png',
    alt: 'Microsoft Certified: Azure Fundamentals',
    href: 'https://www.credly.com/badges/ec9f055e-1f32-4d41-8c03-eb3885924632/public_url',
  },
  {
    src: '/assets/aws-partner-accreditation-technical.png',
    alt: 'AWS Partner: Accreditation (Technical)',
    href: 'https://www.credly.com/badges/43c62cf9-51fd-4703-ba17-80574538e097/public_url',
  },
  {
    src: '/assets/aws-partner-generative-ai-essentials-business.png',
    alt: 'AWS Partner: Generative AI Essentials - Business',
    href: 'https://www.credly.com/badges/9550e135-79ad-4c1b-ace2-e5d4c4f5b42d/public_url',
  },
  {
    src: '/assets/aws-partner-cloud-economics-accreditation.png',
    alt: 'AWS Partner: Cloud Economics Accreditation',
    href: 'https://www.credly.com/badges/adcd0de2-2406-4cf9-a909-3fa98fdd5fb7/public_url',
  },
  {
    src: '/assets/aws-knowledge-cloud-essentials.png',
    alt: 'AWS Knowledge: Cloud Essentials',
    href: 'https://www.credly.com/badges/d07bba10-b20e-4a35-961d-3f94bb841a42/public_url',
  },
  {
    src: '/assets/aws-certified-cloud-practitioner.png',
    alt: 'AWS Certified Cloud Practitioner',
    href: 'https://www.credly.com/badges/b86eaf40-e9c4-4187-8aec-35af26058361/public_url',
  },
  {
    src: '/assets/aws-certified-ai-practitioner.png',
    alt: 'AWS Certified AI Practitioner',
    href: 'https://www.credly.com/badges/4101beeb-85d3-4bd5-828f-5befa431f662/public_url',
  },
  {
    src: '/assets/aws-ai-foundational-l100.png',
    alt: 'AWS AI Foundational (L100)',
    href: 'https://www.credly.com/badges/a7969d37-f39a-47a4-a523-75e7571a9591/public_url',
  },
]

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl">Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <a
                key={cert.href}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2"
              >
                <div className="rounded-xl overflow-hidden border border-border bg-muted/30 p-2 transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-md group-hover:scale-105">
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    width="120"
                    height="120"
                    loading="lazy"
                    className="w-full h-auto object-contain"
                  />
                </div>
                <span className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                  {cert.alt}
                </span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
