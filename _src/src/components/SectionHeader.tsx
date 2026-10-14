import type { ReactNode } from 'react'

interface Props {
  index: string
  eyebrow: string
  title: ReactNode
  aside?: ReactNode
}

export default function SectionHeader({ index, eyebrow, title, aside }: Props) {
  return (
    <header className="reveal mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 md:mb-14">
      <div>
        <p className="eyebrow">
          {index} <span aria-hidden="true">/</span> {eyebrow}
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">{title}</h2>
      </div>
      {aside}
    </header>
  )
}
