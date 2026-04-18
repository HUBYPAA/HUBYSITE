"use client"

import { useEffect, useRef } from "react"

/**
 * VaultSky — the persistent starry vault.
 *
 * Not a decoration. Not a hero banner. This is the basilica's ceiling,
 * rendered at the top of every page. It is the first thing you see when
 * you enter and the reason you remember being inside. Matejko's 1890
 * vault: deep lapis ground, drifting gilt stars, warm horizon.
 *
 * Architecturally: the only lapis surface on the site other than the
 * altar card. Everything else is ashlar or linden or brick. This is
 * what gives the whole experience its one recurring chord of blue.
 */

// ── Seeded RNG (Mulberry32) — guarantees SSR/client parity ──────────
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Star {
  x: number         // 0..100 (% horizontal)
  y: number         // 0..100 (% vertical, biased toward top)
  size: number      // px
  lit: boolean      // brighter, glowing
  twinkle: boolean  // animates
  depth: number     // 0..1 — parallax layer (1 = closest, moves most)
  delay: number     // twinkle delay
  dur: number       // twinkle duration
}

function generateStars(count: number, seed: number): Star[] {
  const rand = mulberry32(seed)
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    // Density gradient — dense up high, thinner toward the horizon
    const y = Math.pow(rand(), 1.5) * 94
    const x = rand() * 100
    // Size bias: most stars are tiny points, few are leaf-bright
    const sizeRand = rand()
    const size = 2 + sizeRand * sizeRand * 7
    const lit = rand() > 0.58
    const twinkle = rand() > 0.82
    const depth = rand()
    stars.push({
      x,
      y,
      size,
      lit,
      twinkle,
      depth,
      delay: rand() * 4,
      dur: 2.6 + rand() * 3,
    })
  }
  return stars
}

// Module-level, stable seed — server and client produce the same sky
const VAULT_STARS = generateStars(160, 11)

export function VaultSky() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    let raf = 0
    const update = () => {
      const y = window.scrollY
      // Soft drift — 6% of scroll, max. Barely perceptible, never a parallax toy.
      el.style.setProperty("--vault-scroll", `${y * 0.06}px`)
      raf = 0
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }
    update() // prime on mount
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="vault-sky" aria-hidden>
      <div className="vault-sky__atmosphere" />
      <div className="vault-sky__stars">
        {VAULT_STARS.map((s, i) => (
          <span
            key={i}
            className={[
              "vault-sky__star",
              s.lit ? "vault-sky__star--lit" : "",
              s.twinkle ? "vault-sky__star--twinkle" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              ["--depth" as string]: s.depth.toFixed(2),
              ...(s.twinkle
                ? ({
                    ["--twinkle-delay" as string]: `${s.delay}s`,
                    ["--twinkle-dur" as string]: `${s.dur}s`,
                  } as Record<string, string>)
                : null),
            }}
          />
        ))}
      </div>
      <div className="vault-sky__horizon" />
    </div>
  )
}
