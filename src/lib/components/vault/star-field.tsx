/**
 * THE VAULT · universal star ornament.
 *
 * A sparse, fixed-position scatter of tiny stars that sits *behind* every
 * page so the lapis body gradient actually reads as a vault — not just a
 * dark blue page. Homepage still renders the richer <Sky/> on top; this is
 * the whisper layer you notice on /meetings, /about, /submit, etc.
 *
 * Deterministic seeded output — same positions on server render and client
 * hydrate, no layout shift. No JS, no event listeners, no state.
 */

function seeded(seed: number): () => number {
  let s = seed || 1
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

type StarKind = "dim" | "gold" | "bright"

const KINDS: Array<{ kind: StarKind; weight: number }> = [
  { kind: "dim", weight: 0.66 },
  { kind: "gold", weight: 0.26 },
  { kind: "bright", weight: 0.08 },
]

function pickKind(r: number): StarKind {
  let acc = 0
  for (const entry of KINDS) {
    acc += entry.weight
    if (r < acc) return entry.kind
  }
  return "dim"
}

interface StarFieldProps {
  /** number of stars (mobile/small screens get fewer via CSS) */
  count?: number
  /** seed — change to reshuffle */
  seed?: number
}

export function StarField({ count = 48, seed = 19 }: StarFieldProps = {}) {
  const rand = seeded(seed)
  const stars = Array.from({ length: count }, (_, i) => {
    const kind = pickKind(rand())
    const x = rand() * 100
    const y = rand() * 100
    // bias: more stars in the upper half — the vault apex is above you
    const yBiased = y * 0.7 + rand() * 18
    const size =
      kind === "bright" ? 2.5 + rand() * 1.5 : kind === "gold" ? 1.75 + rand() * 1.25 : 1 + rand() * 1
    // 1-in-6 stars breathe; stagger their delay so it doesn't feel synchronized
    const twinkle = rand() < 0.16
    const delay = rand() * 4
    return { i, kind, x, y: yBiased, size, twinkle, delay }
  })

  return (
    <div className="star-field" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.i}
          className={`star star--${s.kind}${s.twinkle ? " star--twinkle" : ""}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.twinkle ? `${s.delay}s` : undefined,
          }}
        />
      ))}
    </div>
  )
}
