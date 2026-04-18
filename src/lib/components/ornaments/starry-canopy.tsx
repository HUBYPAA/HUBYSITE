// Deterministic seeded RNG so SSR + hydration agree and stars don't dance on re-render.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface StarSpec {
  x: number  // 0..100 (% of width)
  y: number  // 0..100 (% of height)
  size: number // px
  lit: boolean
  twinkle: boolean
  delay: number
  dur: number
}

function generateStars(count: number, seed: number): StarSpec[] {
  const rand = mulberry32(seed)
  const stars: StarSpec[] = []
  for (let i = 0; i < count; i++) {
    // Density gradient — denser at top, thinner at bottom.
    const yRand = rand()
    const y = Math.pow(yRand, 1.6) * 92 // bias toward top
    const x = rand() * 100
    const sizeRand = rand()
    const size = 2.4 + sizeRand * sizeRand * 7.2 // 2.4..9.6, biased small
    const lit = rand() > 0.62
    const twinkle = rand() > 0.86
    const delay = rand() * 4
    const dur = 2.4 + rand() * 2.6
    stars.push({ x, y, size, lit, twinkle, delay, dur })
  }
  return stars
}

interface StarryCanopyProps {
  className?: string
  /** "full" for the home page, "ribbon" for secondary pages */
  variant?: "full" | "ribbon"
  /** Override star count */
  count?: number
  /** Stable seed; same seed = same sky */
  seed?: number
}

export function StarryCanopy({
  className = "",
  variant = "full",
  count,
  seed = 7,
}: StarryCanopyProps) {
  const starCount = count ?? (variant === "full" ? 110 : 28)
  const stars = generateStars(starCount, seed)

  const heightClass = variant === "full"
    ? "h-[clamp(12rem,28vw,20rem)]"
    : "h-[3.25rem]"

  return (
    <div
      className={`canopy-ground ${heightClass} w-full ${className}`}
      aria-hidden
    >
      {/* Soft inner glow — vault catching stained-glass light */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: variant === "full"
            ? "radial-gradient(ellipse at 30% 40%, rgba(196, 138, 26, 0.14), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(122, 26, 42, 0.18), transparent 55%)"
            : "radial-gradient(ellipse at 50% 100%, rgba(196, 138, 26, 0.18), transparent 60%)",
        }}
      />

      {stars.map((s, i) => (
        <span
          key={i}
          className={`star ${s.lit ? "star--lit" : ""} ${s.twinkle ? "star--twinkle" : ""}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            ...(s.twinkle
              ? ({
                  ["--twinkle-delay" as string]: `${s.delay}s`,
                  ["--twinkle-dur" as string]: `${s.dur}s`,
                } as Record<string, string>)
              : null),
          }}
        />
      ))}

      {/* Horizon — gilt hairline at the base */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-gilt), transparent)" }}
      />
    </div>
  )
}
