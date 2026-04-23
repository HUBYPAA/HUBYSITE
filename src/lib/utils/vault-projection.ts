/**
 * THE VAULT · simple equirectangular projection.
 * Maps {lat, lng} into percentage offsets (0-100) suitable for CSS `left`/`top`.
 *
 * We bias the projection toward the continental US + Europe window that
 * matches where every HUBY/AA meeting and conference actually lives,
 * so the sky feels like a map, not a globe.
 */

export interface SkyProjection {
  /** x offset as percentage (0-100), origin = left edge */
  x: number
  /** y offset as percentage (0-100), origin = top edge */
  y: number
}

// Window: roughly (lng -135°..+35°) × (lat 22°..62°)
// gives us North America on the left, Europe on the right, no wasted ocean.
const LNG_MIN = -135
const LNG_MAX = 35
const LAT_MIN = 22
const LAT_MAX = 62

export function projectToSky(lat: number, lng: number): SkyProjection {
  const xRaw = (lng - LNG_MIN) / (LNG_MAX - LNG_MIN)
  const yRaw = 1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)
  return {
    x: clamp(xRaw * 100, 2, 98),
    y: clamp(yRaw * 100, 8, 78),
  }
}

/** Small local perturbation so co-located conferences don't stack. */
export function jitter(seed: string, amountX = 2, amountY = 2): SkyProjection {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0
  }
  const rx = ((h & 0xff) / 255 - 0.5) * 2
  const ry = (((h >> 8) & 0xff) / 255 - 0.5) * 2
  return { x: rx * amountX, y: ry * amountY }
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n))
}

/**
 * Greedy de-collision for labeled stars. Keeps later entries from stacking
 * on earlier ones by nudging them down then sideways. Tuned for the
 * ~12% horizontal × ~8% vertical footprint of a conference label.
 */
export function decollide<T extends { x: number; y: number }>(
  items: T[],
  { minDx = 14, minDy = 8 }: { minDx?: number; minDy?: number } = {},
): T[] {
  const placed: T[] = []
  for (const item of items) {
    let x = item.x
    let y = item.y
    let tries = 0
    while (
      tries < 24 &&
      placed.some(
        (p) => Math.abs(p.x - x) < minDx && Math.abs(p.y - y) < minDy,
      )
    ) {
      if (tries % 2 === 0) {
        y += minDy
      } else {
        x += minDx * (x < 50 ? 1 : -1)
        y -= minDy
      }
      if (y > 84) {
        y = 26
        x += 6
      }
      if (x > 94) x = 6
      tries++
    }
    placed.push({ ...item, x, y })
  }
  return placed
}