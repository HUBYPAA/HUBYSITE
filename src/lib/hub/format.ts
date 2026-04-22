/**
 * Small formatting helpers shared across hub views.
 */

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function parseISO(date: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null
  const [y, m, d] = date.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

export function formatEventDate(start: string, end?: string): string {
  const s = parseISO(start)
  if (!s) return start
  const startStr = `${MONTHS[s.getUTCMonth()]} ${s.getUTCDate()}, ${s.getUTCFullYear()}`
  if (!end || end === start) return startStr
  const e = parseISO(end)
  if (!e) return startStr
  if (s.getUTCFullYear() === e.getUTCFullYear() && s.getUTCMonth() === e.getUTCMonth()) {
    return `${MONTHS[s.getUTCMonth()]} ${s.getUTCDate()}–${e.getUTCDate()}, ${s.getUTCFullYear()}`
  }
  return `${startStr} – ${MONTHS[e.getUTCMonth()]} ${e.getUTCDate()}, ${e.getUTCFullYear()}`
}

export function formatLocation(city?: string, state?: string): string {
  return [city, state].filter(Boolean).join(", ")
}