import Link from "next/link"

interface FooterProps {
  meetingCount?: number
  conferenceCount?: number
  stateCount?: number
}

const NAVIGATE = [
  { href: "/", label: "Vault" },
  { href: "/meetings", label: "Meetings" },
  { href: "/conferences", label: "Conferences" },
  { href: "/events", label: "Events" },
]

const ABOUT = [
  { href: "/about", label: "About the keeper" },
  { href: "/safety", label: "Safety & anonymity" },
  { href: "/what-is-ypaa", label: "What YPAA means" },
  { href: "/submit", label: "Submit / correct" },
]

const OUTSIDE = [
  { href: "https://www.aa.org", label: "AA.org", external: true },
  { href: "https://meetingguide.org", label: "Meeting Guide", external: true },
]

/**
 * THE VAULT · footer.
 * Three column link groups + disclaimer. Reads as the close of the building,
 * not as a dumping ground.
 */
export function Footer({
  meetingCount,
  conferenceCount,
  stateCount,
}: FooterProps = {}) {
  const year = new Date().getFullYear()
  return (
    <footer className="vfooter" aria-labelledby="footer-heading">
      <div className="shell vfooter__inner">
        <div className="vfooter__masthead">
          <Link href="/" className="vfooter__brand" aria-label="HUBYPAA home">
            HUBY<b>P</b>AA
          </Link>
          <p className="vfooter__tagline">
            A sky of young people&rsquo;s AA meetings &mdash; kept by hand,
            plotted once, free for always.
          </p>
          <p className="vfooter__stats">
            {(meetingCount ?? 0).toLocaleString()} meetings ·{" "}
            {(conferenceCount ?? 0).toLocaleString()} conferences
            {stateCount ? ` · ${stateCount} states` : ""}
          </p>
        </div>

        <nav className="vfooter__col" aria-label="Navigate">
          <h2 id="footer-heading" className="vfooter__colHead">
            Navigate
          </h2>
          <ul className="vfooter__list">
            {NAVIGATE.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="vfooter__col" aria-label="About">
          <h2 className="vfooter__colHead">About</h2>
          <ul className="vfooter__list">
            {ABOUT.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="vfooter__col" aria-label="Outside">
          <h2 className="vfooter__colHead">Outside</h2>
          <ul className="vfooter__list">
            {OUTSIDE.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell vfooter__rule">
        <p className="vfooter__principle">
          AA principles before personalities. No promotion, no
          personalities, no commercial links.
        </p>
        <p className="vfooter__year">&copy; {year} &middot; volunteer built</p>
      </div>
    </footer>
  )
}
