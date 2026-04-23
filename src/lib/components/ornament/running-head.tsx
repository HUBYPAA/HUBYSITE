import type { ReactNode } from "react"

/**
 * RunningHead — the thin editorial strip that sits above a major zone,
 * like the running head on a printed page (left: section; center: title;
 * right: folio/edition mark).
 *
 * Not decorative — informative. The basilica equivalent is the carved
 * frieze band at the top of a nave wall: dense, ordered, uppercase,
 * widely tracked, readable without reading.
 */
type RunningHeadProps = {
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
  className?: string
}

export function RunningHead({ left, center, right, className }: RunningHeadProps) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "var(--space-4)",
        paddingBlock: "var(--space-3)",
        borderTop: "var(--rule)",
        borderBottom: "var(--rule-hair)",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-xs)",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--gilt-aged)",
        fontFeatureSettings: "var(--ff-tabular)",
      }}
    >
      <span style={{ textAlign: "left", opacity: left ? 1 : 0 }}>
        {left ?? "\u00A0"}
      </span>
      <span
        style={{
          textAlign: "center",
          color: "var(--parchment)",
          letterSpacing: "0.28em",
        }}
      >
        {center}
      </span>
      <span style={{ textAlign: "right", opacity: right ? 1 : 0 }}>
        {right ?? "\u00A0"}
      </span>
    </div>
  )
}
