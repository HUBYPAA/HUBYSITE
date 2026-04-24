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
 * Ceiling-styled: mono kicker, serif display, parchment body.
 */
export function PortalHeader({ kicker, title, subtitle }: PortalHeaderProps) {
  return (
    <header
      className="section"
      style={{ paddingTop: "120px", paddingBottom: "40px", maxWidth: "70ch", marginInline: "auto" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          paddingBlock: "var(--space-3)",
          borderTop: "var(--rule)",
          borderBottom: "var(--rule-hair)",
          fontFamily: "var(--font-mono)",
          fontFeatureSettings: 'var(--ff-label)',
          fontSize: "11px",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--gilt-aged)",
          marginBottom: "var(--space-5)",
        }}
      >
        <span>{kicker}</span>
        <span
          aria-hidden
          style={{ flex: 1, height: "1px", background: "var(--rule-hair-color)" }}
        />
      </div>
      <h1 className="display-page">{title}</h1>
      {subtitle ? (
        <p className="lede" style={{ marginTop: "var(--space-4)" }}>
          {subtitle}
        </p>
      ) : null}
    </header>
  )
}
