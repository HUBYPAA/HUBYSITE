import type { ReactNode } from "react"
import { PageIntro } from "@/lib/components/atlas"

interface PortalHeaderProps {
  glyph?: string
  kicker: string
  title: ReactNode
  subtitle?: string
  withRibbon?: boolean
  ribbonSeed?: number
}

/**
 * Section header used by the communications portal pages.
 * Ceiling-styled: mono kicker, serif display, parchment body.
 */
export function PortalHeader({ kicker, title, subtitle }: PortalHeaderProps) {
  return (
    <section className="shell">
      <PageIntro
        compact
        kicker={kicker}
        title={title}
        lead={subtitle}
      />
    </section>
  )
}
