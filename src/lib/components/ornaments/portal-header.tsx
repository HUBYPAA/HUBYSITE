import type { ReactNode } from "react"

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
 * VAULT-styled: mono kicker, serif display, parchment body.
 */
export function PortalHeader({ kicker, title, subtitle }: PortalHeaderProps) {
  return (
    <header className="section" style={{ paddingTop: "120px", paddingBottom: "40px" }}>
      <div className="section__eyebrow">
        <span>{kicker}</span>
        <span className="sep" />
      </div>
      <h1 className="section__title">{title}</h1>
      {subtitle ? <p className="section__lede">{subtitle}</p> : null}
    </header>
  )
}