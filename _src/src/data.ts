export const EMAIL = 'github@jois.slmail.me'
export const GITHUB_URL = 'https://github.com/VaishnavJois'
export const DEVCARD_URL = 'https://app.daily.dev/vaishnavjois'

export type Provider = 'AWS' | 'Azure' | 'Google Cloud'
export type CredentialType = 'Certification' | 'Accreditation' | 'Badge'

export interface Credential {
  name: string
  src: string
  href: string
  provider: Provider
  type: CredentialType
  /** Where the badge can be verified. */
  issuer: string
}

const credly = (id: string) => `https://www.credly.com/badges/${id}/public_url`

export const CREDENTIALS: Credential[] = [
  {
    name: 'Microsoft Certified: Azure Fundamentals',
    src: './assets/microsoft-certified-azure-fundamentals.png',
    href: credly('ec9f055e-1f32-4d41-8c03-eb3885924632'),
    provider: 'Azure',
    type: 'Certification',
    issuer: 'Credly',
  },
  {
    name: 'AWS Partner: Accreditation (Technical)',
    src: './assets/aws-partner-accreditation-technical.png',
    href: credly('43c62cf9-51fd-4703-ba17-80574538e097'),
    provider: 'AWS',
    type: 'Accreditation',
    issuer: 'Credly',
  },
  {
    name: 'AWS Partner: Generative AI Essentials (Business)',
    src: './assets/aws-partner-generative-ai-essentials-business.png',
    href: credly('9550e135-79ad-4c1b-ace2-e5d4c4f5b42d'),
    provider: 'AWS',
    type: 'Badge',
    issuer: 'Credly',
  },
  {
    name: 'AWS Partner: Cloud Economics Accreditation',
    src: './assets/aws-partner-cloud-economics-accreditation.png',
    href: credly('adcd0de2-2406-4cf9-a909-3fa98fdd5fb7'),
    provider: 'AWS',
    type: 'Accreditation',
    issuer: 'Credly',
  },
  {
    name: 'AWS Knowledge: Cloud Essentials',
    src: './assets/aws-knowledge-cloud-essentials.png',
    href: credly('d07bba10-b20e-4a35-961d-3f94bb841a42'),
    provider: 'AWS',
    type: 'Badge',
    issuer: 'Credly',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    src: './assets/aws-certified-cloud-practitioner.png',
    href: credly('b86eaf40-e9c4-4187-8aec-35af26058361'),
    provider: 'AWS',
    type: 'Certification',
    issuer: 'Credly',
  },
  {
    name: 'AWS Certified AI Practitioner',
    src: './assets/aws-certified-ai-practitioner.png',
    href: credly('4101beeb-85d3-4bd5-828f-5befa431f662'),
    provider: 'AWS',
    type: 'Certification',
    issuer: 'Credly',
  },
  {
    name: 'AWS AI Foundational (L100)',
    src: './assets/aws-ai-foundational-l100.png',
    href: credly('a7969d37-f39a-47a4-a523-75e7571a9591'),
    provider: 'AWS',
    type: 'Accreditation',
    issuer: 'Credly',
  },
  {
    name: 'Google Cloud Essentials (Completion Badge)',
    src: './assets/google-cloud-essentials-skill-badge_33507192.png',
    href: 'https://www.cloudskillsboost.google/',
    provider: 'Google Cloud',
    type: 'Badge',
    issuer: 'Google Cloud Skills Boost',
  },
]

export const PROVIDERS: Provider[] = ['AWS', 'Azure', 'Google Cloud']

export const countBy = <K extends string>(items: Credential[], key: (c: Credential) => K) =>
  items.reduce<Record<string, number>>((acc, c) => {
    const k = key(c)
    acc[k] = (acc[k] ?? 0) + 1
    return acc
  }, {})

export interface LinkItem {
  label: string
  href: string
}

export const LINKS: LinkItem[] = [
  { label: 'My Dev Card on daily.dev', href: DEVCARD_URL },
  {
    label: 'How to showcase #DevCard',
    href: 'https://daily.dev/blog/adding-the-daily-devcard-to-your-github-profile',
  },
  { label: 'Proton Privacy (Recommended)', href: 'https://proton.me/' },
  { label: 'Try Mail Plus for free (Referral)', href: 'https://pr.tn/ref/TZ6Y91M8F2M0' },
  { label: "Check out Apple's latest ML model", href: 'https://apple-fastvlm-webgpu.static.hf.space' },
]

export const MARQUEE = [
  'Microsoft Azure',
  'Amazon Web Services',
  'Google Cloud',
  'Terraform',
  'Git',
  'GitHub',
  'Open Source',
  'Privacy-first',
]
