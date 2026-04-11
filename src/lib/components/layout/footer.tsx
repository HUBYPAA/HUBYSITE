import Link from "next/link"

const FOOTER_GROUPS = [
  {
    title: "Explore",
    links: [
      { href: "/meetings", label: "Meetings" },
      { href: "/conferences", label: "Conferences" },
      { href: "/what-is-ypaa", label: "What Is YPAA" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About this site" },
      { href: "/submit", label: "Submit / Update" },
      { href: "/safety", label: "Safety & Anonymity" },
    ],
  },
  {
    title: "Outside links",
    links: [
      { href: "https://www.aa.org", label: "AA.org", external: true },
      { href: "https://www.aa.org/find-aa", label: "Find AA", external: true },
      { href: "https://www.aa.org/meeting-guide-app", label: "Meeting Guide", external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 pb-28 pt-16 lg:pb-12 lg:pt-20">
      <div className="site-shell">
        {/* Mobile: compact stacked layout */}
        <div className="grid gap-10 lg:hidden">
          <div className="max-w-sm">
            <span className="section-kicker">Young People in AA</span>
            <h2 className="mt-4 font-serif text-2xl tracking-[-0.04em] text-ink">
              Built to make the network easier to find.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              A volunteer-built resource, not an official AA body.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="meta-label">{group.title}</p>
                <ul className="mt-3 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {"external" in link ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-muted hover:text-ink"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-sm text-muted hover:text-ink">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: original wide layout */}
        <div className="hidden gap-14 lg:grid lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <span className="section-kicker">Young People in AA</span>
            <h2 className="mt-4 font-serif text-3xl tracking-[-0.04em] text-ink">
              Built to make the network easier to find.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              This directory gathers meetings, conferences, and starting points
              that are otherwise scattered across local websites and word of
              mouth. It is a volunteer-built resource, not an official AA body.
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="meta-label">{group.title}</p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-muted hover:text-ink">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 lg:mt-14">
          <div className="rule mb-5" />
          <div className="flex flex-col gap-3 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
            <p>AA principles before personalities. No personal names, no endorsements, no attendance data.</p>
            <p className="font-mono">{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
