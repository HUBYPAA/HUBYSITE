import type { CSSProperties, ReactNode } from "react"

/**
 * CornerMarks — four small L-shaped gilt marks tucked into the corners of a
 * framed element. Equivalent to carved stone drip-cornices at the corner
 * joints. Used on framed cards, featured panels, the atlas plate.
 *
 * Implementation: four absolutely-positioned spans with two borders each,
 * sized in pixels so they stay crisp at any container size. The wrapper is
 * `position: relative` so callers only need to put `<CornerMarks />` inside
 * whatever element they want marked — no extra div required.
 */
type CornerMarksProps = {
  size?: number
  inset?: number
  color?: string
  thickness?: number
}

export function CornerMarks({
  size = 14,
  inset = -1,
  color = "var(--gilt)",
  thickness = 1,
}: CornerMarksProps) {
  const base: CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    pointerEvents: "none",
  }
  return (
    <>
      <span
        aria-hidden
        style={{
          ...base,
          top: inset,
          left: inset,
          borderTop: `${thickness}px solid ${color}`,
          borderLeft: `${thickness}px solid ${color}`,
        }}
      />
      <span
        aria-hidden
        style={{
          ...base,
          top: inset,
          right: inset,
          borderTop: `${thickness}px solid ${color}`,
          borderRight: `${thickness}px solid ${color}`,
        }}
      />
      <span
        aria-hidden
        style={{
          ...base,
          bottom: inset,
          left: inset,
          borderBottom: `${thickness}px solid ${color}`,
          borderLeft: `${thickness}px solid ${color}`,
        }}
      />
      <span
        aria-hidden
        style={{
          ...base,
          bottom: inset,
          right: inset,
          borderBottom: `${thickness}px solid ${color}`,
          borderRight: `${thickness}px solid ${color}`,
        }}
      />
    </>
  )
}

/**
 * Frame — a reusable carved-frame wrapper. Hairline outer border + inner
 * breathing room + corner marks. Use instead of a plain rounded card when
 * an element deserves to feel framed rather than upholstered.
 */
type FrameProps = {
  children: ReactNode
  as?: "div" | "section" | "article" | "aside"
  className?: string
  tier?: "stone" | "carved" | "altar"
  cornerSize?: number
  style?: CSSProperties
}

const SHADOW_FOR_TIER: Record<NonNullable<FrameProps["tier"]>, string> = {
  stone:  "var(--shadow-stone)",
  carved: "var(--shadow-carved)",
  altar:  "var(--shadow-altar)",
}

export function Frame({
  children,
  as = "div",
  className,
  tier = "carved",
  cornerSize = 14,
  style,
}: FrameProps) {
  const Tag = as
  return (
    <Tag
      className={className}
      style={{
        position: "relative",
        border: "1px solid var(--rule-color)",
        background: "var(--surface)",
        boxShadow: SHADOW_FOR_TIER[tier],
        ...style,
      }}
    >
      <CornerMarks size={cornerSize} />
      {children}
    </Tag>
  )
}
