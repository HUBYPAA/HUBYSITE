import Link from "next/link"

const GROUPS = [
  {
    title: "Explore",
    links: [
      { href: "/meetings", label: "Meetings" },
      { href: "/conferences", label: "Conferences" },
      { href: "/what-is-ypaa", label: "What is YPAA" },
    ],
  },
  {
    title: "This site",
    links: [
      { href: "/about", label: "About" },
      { href: "/submit", label: "Submit" },
      { href: "/safety", label: "Safety" },
    ],
  },
  {
    title: "Outside",
    links: [
      { href: "https://www.aa.org", label: "aa.org", external: true },
      { href: "https://www.aa.org/find-aa", label: "Find AA", external: true },
      { href: "https://www.aa.org/meeting-guide-app", label: "Meeting Guide", external: true },
    ],
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-md">
            <p className="footer__brand">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" style={{ boxShadow: "0 0 8px var(--color-accent)" }} aria-hidden />
              HUBYPAA
            </p>
            <p className="body-sm mt-3 max-w-sm">
              A volunteer-built national directory for young people&rsquo;s AA.
              Not an official AA body. No names, no endorsements, no attendance data.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/meetings" className="btn btn-secondary btn-sm">Open the map</Link>
              <Link href="/submit" className="btn btn-vault btn-sm">Send a fix</Link>
            </div>
          </div>

          {GROUPS.map((group) => (
            <div key={group.title}>
              <p className="footer__heading">{group.title}</p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link ? (
                      <a href={link.href} target="_blank" rel="noreferrer" className="text-sm">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-10 hr" />

        <div className="flex flex-col gap-2 text-xs text-[var(--color-fg-3)] mono sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} HUBYPAA · built-by volunteers · not an official AA body</p>
          <p>
            <span className="pulse-dot mr-2 align-middle" aria-hidden />
            v0.3.2 · deployed from main
          </p>
        </div>
      </div>
    </footer>
  )
}
