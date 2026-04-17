import Link from "next/link"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"

const FOOTER_GROUPS = [
  {
    title: "explore",
    links: [
      { href: "/meetings", label: "meetings" },
      { href: "/conferences", label: "conferences" },
      { href: "/what-is-ypaa", label: "what is ypaa" },
    ],
  },
  {
    title: "this site",
    links: [
      { href: "/about", label: "about" },
      { href: "/submit", label: "submit / update" },
      { href: "/safety", label: "safety & anonymity" },
    ],
  },
  {
    title: "outside",
    links: [
      { href: "https://www.aa.org", label: "aa.org", external: true },
      { href: "https://www.aa.org/find-aa", label: "find aa", external: true },
      { href: "https://www.aa.org/meeting-guide-app", label: "meeting guide", external: true },
    ],
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer-debnik relative z-10 pb-28 pt-0 lg:pb-12">
      {/* Linden shelf — the wooden plinth at the top */}
      <div
        className="relative w-full"
        style={{
          background: "linear-gradient(180deg, var(--color-linden), var(--color-linden-deep))",
          borderBottom: "1px solid var(--color-debnik)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-gilt), transparent)" }}
        />
        <div className="site-shell flex flex-col items-center gap-3 py-5 text-center sm:flex-row sm:justify-center">
          <HeraldicGlyph name="star-eight" className="h-3 w-3 text-[var(--color-gilt)]" />
          <p
            className="text-[var(--color-ivory)]"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "0.92rem",
              fontVariantCaps: "all-small-caps",
              letterSpacing: "0.16em",
              textTransform: "lowercase",
            }}
          >
            a directory kept by hand · for whoever needs it · est. {year}
          </p>
          <HeraldicGlyph name="star-eight" className="h-3 w-3 text-[var(--color-gilt)]" />
        </div>
      </div>

      {/* Mid band — debnik columns */}
      <div className="site-shell pt-12 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-md">
            <span className="section-kicker section-kicker--vault">
              <HeraldicGlyph name="star-diamond" />
              hubypaa
            </span>
            <h2
              className="mt-4 text-[var(--color-ivory)]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(1.7rem,3vw,2.2rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.96,
              }}
            >
              The hub somebody had to build.
            </h2>
            <p
              className="mt-4 text-[rgba(241,233,214,0.65)]"
              style={{
                fontFamily: "var(--font-prose)",
                fontStyle: "italic",
                fontSize: "0.95rem",
                lineHeight: 1.78,
              }}
            >
              Every meeting and conference that used to live in a group
              chat or on a flyer at a folding table — pulled together by
              people who love this network. Volunteer-built, not an
              official AA body.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/meetings" className="action-secondary" style={{ background: "rgba(241,233,214,0.06)", color: "var(--color-ivory)", borderColor: "rgba(220,177,58,0.32)" }}>
                open the map
              </Link>
              <Link href="/submit" className="action-altar" style={{ minHeight: "2.8rem", padding: "0.6rem 1.1rem", fontSize: "0.82rem" }}>
                send a fix
              </Link>
            </div>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <p
                className="text-[var(--color-gilt-shadow)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.7rem",
                  fontVariantCaps: "all-small-caps",
                  letterSpacing: "0.22em",
                  textTransform: "lowercase",
                }}
              >
                {group.title}
              </p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[0.92rem] text-[rgba(241,233,214,0.72)] hover:text-[var(--color-gilt-lit)]"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontVariantCaps: "all-small-caps",
                          letterSpacing: "0.1em",
                          textTransform: "lowercase",
                        }}
                      >
                        <HeraldicGlyph name="diamond-pip" className="h-1.5 w-1.5 text-[var(--color-gilt)]" />
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 text-[0.92rem] text-[rgba(241,233,214,0.72)] hover:text-[var(--color-gilt-lit)]"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontVariantCaps: "all-small-caps",
                          letterSpacing: "0.1em",
                          textTransform: "lowercase",
                        }}
                      >
                        <HeraldicGlyph name="diamond-pip" className="h-1.5 w-1.5 text-[var(--color-gilt)]" />
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Brick base strip */}
        <div className="mt-14">
          <FiligreeRule tone="ivory" />
          <div className="mt-6 flex flex-col gap-3 text-[0.78rem] text-[rgba(241,233,214,0.45)] sm:flex-row sm:items-center sm:justify-between">
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                letterSpacing: "0.04em",
              }}
            >
              principles before personalities. no personal names, no endorsements, no attendance data.
            </p>
            <p className="font-mono">{year}</p>
          </div>
        </div>
      </div>

      {/* Brick footer plinth */}
      <div
        className="mt-12 w-full"
        style={{
          background: "linear-gradient(180deg, transparent, var(--color-brick-deep) 60%, #4a1c10)",
          borderTop: "1px solid var(--color-iron)",
        }}
      >
        <div className="site-shell flex items-center justify-center py-5">
          <HeraldicGlyph name="star-eight" className="h-3.5 w-3.5 text-[var(--color-gilt)]" />
        </div>
      </div>
    </footer>
  )
}
