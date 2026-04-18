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
      { href: "/submit", label: "Submit / update" },
      { href: "/safety", label: "Safety & anonymity" },
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
              HUBYPAA <span aria-hidden style={{ color: "var(--color-gold)", fontSize: "0.62em", verticalAlign: "super" }}>✦</span>
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-white/70">
              A volunteer-built national directory for young people&rsquo;s AA.
              Not an official AA body. Principles before personalities —
              no names, no endorsements, no attendance data.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/meetings"
                className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-3.5 py-2 text-sm font-medium hover:bg-white/10"
              >
                Open the map
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center rounded-md bg-[var(--color-gold)] px-3.5 py-2 text-sm font-semibold text-[var(--color-vault-deep)] hover:bg-[var(--color-gold-lit)]"
              >
                Send a fix
              </Link>
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

        <hr className="my-10" />

        <div className="flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} HUBYPAA. Volunteer-built. Not an official AA body.</p>
          <p className="mono">Mapped like somebody meant it.</p>
        </div>
      </div>
    </footer>
  )
}
