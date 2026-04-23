/**
 * Fleuron — the stylized quatrefoil ornament used on the Matejko polychrome,
 * on carved bosses at rib intersections, and on printed editions of Krakow
 * guild charters from the same era. This SVG version is deliberately
 * restrained: four lobes around a small square center, drawn at hairline
 * weight so it reads as gilt inlay rather than clip-art.
 *
 * Use it sparingly — centered on an ornamental rule, or in one corner of a
 * framed element. Never all four corners of a regular card; that is what
 * `<CornerMarks>` is for (a simpler L-shaped mark).
 */
type FleuronProps = {
  size?: number
  color?: string
  className?: string
  /** If true, reduce to a single dot + four hair-lines (cleaner at very small sizes). */
  minimal?: boolean
}

export function Fleuron({
  size = 18,
  color = "var(--gilt)",
  className,
  minimal = false,
}: FleuronProps) {
  if (minimal) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        aria-hidden="true"
        style={{ display: "block", overflow: "visible" }}
      >
        <g stroke={color} strokeWidth="0.9" strokeLinecap="round" fill="none">
          <line x1="12" y1="4"  x2="12" y2="9" />
          <line x1="12" y1="15" x2="12" y2="20" />
          <line x1="4"  y1="12" x2="9"  y2="12" />
          <line x1="15" y1="12" x2="20" y2="12" />
        </g>
        <circle cx="12" cy="12" r="1.2" fill={color} />
      </svg>
    )
  }

  // Quatrefoil: four almond-shaped lobes cardinally arranged, outer hair
  // strokes + small gilt center. Drawn at viewBox=24 so strokeWidth=1 reads
  // as a precise hairline at the typical 14–24px render size.
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      style={{ display: "block", overflow: "visible" }}
    >
      <g stroke={color} strokeWidth="0.85" fill="none" strokeLinecap="round">
        {/* four lobes — symmetric quatrefoil */}
        <path d="M12 3 Q13.4 7 12 11 Q10.6 7 12 3 Z" />
        <path d="M12 21 Q13.4 17 12 13 Q10.6 17 12 21 Z" />
        <path d="M3 12 Q7 13.4 11 12 Q7 10.6 3 12 Z" />
        <path d="M21 12 Q17 13.4 13 12 Q17 10.6 21 12 Z" />
        {/* diagonal hair rays */}
        <line x1="6.5"  y1="6.5"  x2="8.5"  y2="8.5"  opacity="0.55" />
        <line x1="17.5" y1="6.5"  x2="15.5" y2="8.5"  opacity="0.55" />
        <line x1="6.5"  y1="17.5" x2="8.5"  y2="15.5" opacity="0.55" />
        <line x1="17.5" y1="17.5" x2="15.5" y2="15.5" opacity="0.55" />
      </g>
      <circle cx="12" cy="12" r="1.2" fill={color} />
    </svg>
  )
}
