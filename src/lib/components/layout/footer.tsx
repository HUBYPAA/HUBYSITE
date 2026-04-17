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
    <footer className="relative z-10 border-t border-[rgba(26,39,68,0.15)] bg-[linear-gradient(180deg,#1e3050,#1a2744)] pb-28 pt-16 text-[rgba(210,203,194,0.8)] lg:pb-12 lg:pt-20">
      <div className="absolute inset-x-0 -top-16 h-16 bg-[linear-gradient(180deg,rgba(240,235,228,0),rgba(26,39,68,0.08)_42%,rgba(26,39,68,0.18))]" />
      <div className="site-shell">
        <div className="mb-10 grid gap-5 lg:mb-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(200,164,78,0.55)]">
              Last threshold
            </p>
            <h2 className="mt-3 font-serif text-[1.9rem] leading-[0.98] tracking-[-0.04em] text-[rgba(240,235,228,0.95)] sm:text-[2.4rem]">
              Find the room, check the weekend, or send the fix before the trail goes cold.
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/meetings"
              className="inline-flex min-h-[3.15rem] items-center justify-center rounded-[0.75rem] border border-[rgba(240,235,228,0.14)] bg-[rgba(240,235,228,0.06)] px-5 text-sm font-semibold text-[rgba(240,235,228,0.84)] hover:bg-[rgba(240,235,228,0.12)]"
            >
              Open meetings
            </Link>
            <Link
              href="/submit"
              className="inline-flex min-h-[3.15rem] items-center justify-center rounded-[0.75rem] border border-[rgba(200,164,78,0.18)] bg-[rgba(200,164,78,0.12)] px-5 text-sm font-semibold text-[var(--color-gold-soft)] hover:bg-[rgba(200,164,78,0.18)]"
            >
              Send update
            </Link>
          </div>
        </div>

        <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(200,164,78,0.2),transparent)]" />

        {/* Mobile: compact stacked layout */}
        <div className="mt-10 grid gap-10 lg:hidden">
          <div className="max-w-sm">
            <span className="inline-flex items-center gap-2 rounded-[0.75rem] border border-[rgba(200,164,78,0.2)] bg-[rgba(200,164,78,0.08)] px-3 py-1.5 text-[0.69rem] font-bold uppercase tracking-[0.16em] text-[var(--color-gold-soft)]">
              <span className="h-[0.38rem] w-[0.38rem] rounded-full bg-current" />
              HUBYPAA
            </span>
            <h2 className="mt-4 font-serif text-2xl tracking-[-0.04em] text-[rgba(240,235,228,0.95)]">
              The YPAA Hub. Somebody Had to Build It.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[rgba(210,203,194,0.6)]">
              Volunteer-built with love. Not an official AA body.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(200,164,78,0.55)]">{group.title}</p>
                <ul className="mt-3 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      {"external" in link ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-[rgba(210,203,194,0.6)] hover:text-[rgba(240,235,228,0.95)]"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-sm text-[rgba(210,203,194,0.6)] hover:text-[rgba(240,235,228,0.95)]">
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
        <div className="mt-12 hidden gap-14 lg:grid lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <span className="inline-flex items-center gap-2 rounded-[0.75rem] border border-[rgba(200,164,78,0.2)] bg-[rgba(200,164,78,0.08)] px-3 py-1.5 text-[0.69rem] font-bold uppercase tracking-[0.16em] text-[var(--color-gold-soft)]">
              <span className="h-[0.38rem] w-[0.38rem] rounded-full bg-current" />
              HUBYPAA
            </span>
            <h2 className="mt-4 font-serif text-3xl tracking-[-0.04em] text-[rgba(240,235,228,0.95)]">
              The YPAA Hub. Somebody Had to Build It.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[rgba(210,203,194,0.6)]">
              Every meeting and conference that used to live in a group
              chat or on a flyer at a folding table — pulled together by
              people who love this network. Volunteer-built, not an
              official AA body.
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(200,164,78,0.55)]">{group.title}</p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-[rgba(210,203,194,0.6)] hover:text-[rgba(240,235,228,0.95)]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-sm text-[rgba(210,203,194,0.6)] hover:text-[rgba(240,235,228,0.95)]">
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
          <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(200,164,78,0.15),transparent)]" />
          <div className="mt-5 flex flex-col gap-3 text-xs text-[rgba(210,203,194,0.4)] sm:flex-row sm:items-center sm:justify-between">
            <p>AA principles before personalities. No personal names, no endorsements, no attendance data.</p>
            <p className="font-mono">{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
