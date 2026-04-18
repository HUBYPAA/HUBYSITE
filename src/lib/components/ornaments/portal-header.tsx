import type { ReactNode } from "react"

interface PortalHeaderProps {
  glyph?: string
  kicker: string
  title: ReactNode
  subtitle?: string
  withRibbon?: boolean
  ribbonSeed?: number
}

export function PortalHeader({ kicker, title, subtitle }: PortalHeaderProps) {
  return (
    <header className="shell pt-14 pb-10 sm:pt-20">
      <p className="label mono">{kicker.toLowerCase().replace(/ /g, "-")}</p>
      <h1 className="display-1 mt-3">{title}</h1>
      {subtitle ? <p className="body-lg mt-5 max-w-2xl">{subtitle}</p> : null}
    </header>
  )
}
