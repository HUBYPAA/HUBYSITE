import Link from "next/link"

/**
 * THE VAULT · top chrome
 * Wordmark (HUBY/AA) · primary nav · right-aligned meta (hejnał + coords)
 */
export function Chrome() {
  return (
    <nav className="chrome" aria-label="Primary">
      <Link href="/" className="chrome__brand">
        HUBY<b>/</b>AA
      </Link>
      <div className="chrome__nav">
        <Link href="/">VAULT</Link>
        <Link href="/meetings">MEETINGS</Link>
        <Link href="/conferences">CONFERENCES</Link>
        <Link href="/events">EVENTS</Link>
        <Link href="/submit">SUBMIT</Link>
        <Link href="/about">ABOUT</Link>
      </div>
      <div className="chrome__meta">
        HEJNAŁ · TRACKING LIVE
        <br />
        14 CONSTELLATIONS · 247 STARS
      </div>
    </nav>
  )
}