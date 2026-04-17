import { HeraldicGlyph } from "./heraldic-glyph"

interface FiligreeRuleProps {
  className?: string
  tone?: "gilt" | "ivory" | "shadow"
}

export function FiligreeRule({ className = "", tone = "shadow" }: FiligreeRuleProps) {
  const color =
    tone === "gilt" ? "var(--color-gilt)" :
    tone === "ivory" ? "rgba(241,233,214,0.5)" :
    "var(--color-gilt-shadow)"

  return (
    <div
      className={`filigree ${className}`}
      style={{ color }}
      role="separator"
      aria-hidden
    >
      <HeraldicGlyph name="filigree" />
    </div>
  )
}
