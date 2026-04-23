/**
 * THE VAULT · universal star ornament.
 *
 * Sparse, fixed-position scatter of eight-pointed Matejko stars (the actual
 * motif on Kościół Mariacki's ceiling, 1890–92). Stars are clustered along
 * arc-like "rib" curves radiating from the vault crown rather than strewn
 * evenly — ordered density, per the research. Deterministic seeded output:
 * same positions on server render and client hydrate, no hydration mismatch,
 * no layout shift.
 *
 * Homepage still renders the richer <Sky/> on top; this is the whisper
 * layer you notice on /meetings, /about, /submit, etc.
 */
import { StarEight } from "@/lib/components/ornament"

function seeded(seed: number): () => number {
  let s = seed || 1
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

type StarTier = "dim" | "glint" | "lit"

const TIERS: Array<{ tier: StarTier; weight: number }> = [
  { tier: "dim",   weight: 0.66 },
  { tier: "glint", weight: 0.28 },
  { tier: "lit",   weight: 0.06 },
]

function pickTier(r: number): StarTier {
  let acc = 0
  for (const entry of TIERS) {
    acc += entry.weight
    if (r < acc) return entry.tier
  }
  return "dim"
}

interface StarFieldProps {
  /** Number of stars (mobile/small screens get fewer via CSS thinning). */
  count?: number
  /** Seed — change to reshuffle the pattern. */
  seed?: number
}

export function StarField({ count = 54, seed = 19 }: StarFieldProps = {}) {
  const rand = seeded(seed)
  // We lay stars on five "ribs" arcing out from the vault crown. Each rib
  // is a parametric arc in (x, y) %: ribs fan from crown (x≈50, y≈0) down
  // toward the springers (y≈60-80%), slightly curved. For each rib we drop
  // a handful of stars with jitter so they feel hand-placed, not regular.
  const ribs: Array<{ cx: number; cy: number; sway: number }> = [
    { cx: 50, cy: 6,  sway: 0   }, // central rib (zenith)
    { cx: 50, cy: 6,  sway: -26 }, // mid-left rib
    { cx: 50, cy: 6,  sway:  26 }, // mid-right rib
    { cx: 50, cy: 6,  sway: -48 }, // outer-left
    { cx: 50, cy: 6,  sway:  48 }, // outer-right
  ]

  const stars = Array.from({ length: count }, (_, i) => {
    const tier = pickTier(rand())
    // choose a rib and a parameter t ∈ [0, 1] along it
    const ribIdx = Math.floor(rand() * ribs.length)
    const rib = ribs[ribIdx]
    const t = rand()
    // arc: x sways along the rib as t increases, y falls
    const arcX = rib.cx + rib.sway * t + (rand() - 0.5) * 10
    const arcY = rib.cy + (60 + rand() * 18) * t + (rand() - 0.5) * 4
    const x = Math.max(2, Math.min(98, arcX))
    const y = Math.max(2, Math.min(82, arcY))
    // Star sizes — brighter stars a hair larger, and stars closer to the
    // crown (y small) trend larger than stars at the springers.
    const base = tier === "lit" ? 14 : tier === "glint" ? 11 : 8
    const crownBias = (1 - y / 90) * 3
    const size = base + crownBias + rand() * 3
    // A small fraction breathe; staggered delays.
    const twinkle = rand() < 0.14
    const delay = rand() * 4.2
    return { i, tier, x, y, size, twinkle, delay }
  })

  return (
    <div className="star-field" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.i}
          className={`star-eight${s.twinkle ? " star-eight--twinkle" : ""}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: s.twinkle ? `${s.delay}s` : undefined,
          }}
        >
          <StarEight size={s.size} tier={s.tier} />
        </span>
      ))}
    </div>
  )
}
