/**
 * Tiny gilt rib-lines meeting at an 8-point boss in each corner.
 * The stellar vault, in miniature. A brand signature on Tier 2/3 panels.
 */
export function StellarCorners({ className = "" }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((pos) => (
        <CornerStar key={pos} position={pos} />
      ))}
    </span>
  )
}

function CornerStar({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const positionClass = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  }[position]

  return (
    <svg
      viewBox="0 0 16 16"
      className={`absolute h-3 w-3 text-[var(--color-gilt)] opacity-80 ${positionClass}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={0.6}
      aria-hidden
    >
      <line x1="8" y1="0" x2="8" y2="16" />
      <line x1="0" y1="8" x2="16" y2="8" />
      <line x1="2" y1="2" x2="14" y2="14" />
      <line x1="14" y1="2" x2="2" y2="14" />
      <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    </svg>
  )
}
