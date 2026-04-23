/**
 * Eight-pointed star — the actual Matejko motif.
 *
 * The Kościół Mariacki ceiling stars are eight-pointed, not five-pointed and
 * not circles. The form is two squares overlaid at 45° (the four cardinal
 * directions + the four diagonals), inherited via medieval European usage
 * from Islamic geometric tradition. They vary in size along the Gothic rib
 * geometry: dense at the crown, thinning toward the springers.
 *
 * Three tiers:
 *   - `dim`   — the quiet field stars (parchment against lapis)
 *   - `glint` — gilt, most stars
 *   - `lit`   — candle-struck gilt with a halo, used sparingly
 *
 * Stars respect `prefers-reduced-motion` via a parent `.star-field` rule in
 * `globals.css`; this component only draws the glyph.
 */
type StarEightProps = {
  size?: number
  tier?: "dim" | "glint" | "lit" | "coral"
  className?: string
  title?: string
}

const TIERS: Record<NonNullable<StarEightProps["tier"]>, {
  fill: string
  halo: string | null
  core: string
}> = {
  dim:   { fill: "rgba(232, 226, 205, 0.58)", halo: null,                        core: "rgba(255, 245, 214, 0.70)" },
  glint: { fill: "var(--gilt)",                halo: "rgba(216, 168, 69, 0.28)",  core: "var(--gilt-lit)" },
  lit:   { fill: "var(--gilt-lit)",            halo: "rgba(245, 204, 104, 0.42)", core: "var(--gilt-cream)" },
  coral: { fill: "var(--coral)",               halo: "rgba(223, 78, 50, 0.45)",   core: "#FFE6DC" },
}

export function StarEight({
  size = 12,
  tier = "glint",
  className,
  title,
}: StarEightProps) {
  const spec = TIERS[tier]
  const s = size
  // Two overlaid squares: axis-aligned + 45°-rotated. Eight concave notches
  // form the star outline; the core is brighter than the points.
  // Path constants chosen so the star visually balances at any size.
  return (
    <svg
      viewBox="0 0 24 24"
      width={s}
      height={s}
      className={className}
      aria-hidden={!title}
      role={title ? "img" : undefined}
      style={{ display: "block", overflow: "visible" }}
    >
      {title ? <title>{title}</title> : null}
      {spec.halo ? (
        <circle cx="12" cy="12" r="11" fill={spec.halo} opacity="0.55" />
      ) : null}
      {/* main eight-pointed body */}
      <path
        d="M12 1 L14 9 L22 10 L15.5 14 L18 22 L12 17.6 L6 22 L8.5 14 L2 10 L10 9 Z"
        fill={spec.fill}
      />
      {/* lit core — a smaller bright heart that makes the star feel to
          emit rather than be drawn */}
      <circle cx="12" cy="12" r="1.8" fill={spec.core} />
    </svg>
  )
}
