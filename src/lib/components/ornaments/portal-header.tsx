import type { ReactNode } from "react"

interface PortalHeaderProps {
  /** Kept for compat — ignored. */
  glyph?: string
  kicker: string
  title: ReactNode
  subtitle?: string
  /** Kept for compat — ignored. */
  withRibbon?: boolean
  /** Kept for compat — ignored. */
  ribbonSeed?: number
}

export function PortalHeader({ kicker, title, subtitle }: PortalHeaderProps) {
  return (
    <header className="shell pt-12 pb-10 sm:pt-16 sm:pb-14">
      <p className="eyebrow">{kicker}</p>
      <h1 className="display-1 mt-4">{title}</h1>
      {subtitle ? (
        <p className="body-lg mt-5 max-w-2xl">{subtitle}</p>
      ) : null}
    </header>
  )
}
