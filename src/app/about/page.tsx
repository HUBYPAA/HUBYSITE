import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"

export const metadata: Metadata = {
  title: "About",
  description:
    "Why this site exists, what it is for, and what kind of trust and restraint shaped the product.",
}

const PRINCIPLES = [
  { title: "Map-first.",        body: "Start with orientation before filters and detail." },
  { title: "National scope.",   body: "One place to scan rooms and weekends across states." },
  { title: "Volunteer-built.",  body: "Improves because people keep sending cleaner info." },
]

const NOTS = [
  "Not an official AA body. The directory follows the spirit of the traditions but does not speak for AA as a whole.",
  "Not a social feed. No public profiles, no like counts, no algorithmic timeline.",
  "Not a place for personal names, attendance data, or member tracking. Anonymity is structural here, not decorative.",
  "Not a claim that every record is already perfect. Some entries are scaffolds and say so.",
]

export default function AboutPage() {
  return (
    <>
      <PortalHeader
        kicker="About"
        title="A map-first hub built to be calmer."
        subtitle="The information is real. The path to it is usually messy. This is the cleaner front door."
      />

      <section className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          <article className="prose">
            <p>
              This project exists because the information is real, but the
              path to it is usually messy. Meetings are scattered. Conference
              details move around. Newcomers do not need more noise — they
              need orientation. So this is a national directory for young
              people&rsquo;s AA meetings, conference records, and the
              supporting context that makes them legible.
            </p>
            <p>
              It is designed to help someone answer basic questions quickly:
              is there a room near me? what is coming up? what does YPAA
              mean? where do I send a correction? It is not trying to
              replace local AA service structures — it is a clearer front
              door into them.
            </p>
            <p>
              The product should feel authored, not loud. It should admit
              when a record still needs work. It should make the next action
              obvious. And it should look like the network actually feels —
              not like a brochure printed in a hurry.
            </p>
          </article>

          <aside className="grid content-start gap-4">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="card card-quiet">
                <p className="caption mono">Principle 0{i + 1}</p>
                <h3
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    fontSize: "1.35rem",
                    letterSpacing: "-0.02em",
                    color: "var(--color-ink)",
                  }}
                >
                  {p.title}
                </h3>
                <p className="body-sm mt-2">{p.body}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">Boundaries</p>
            <h2 className="display-2 mt-3">What this site is not.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {NOTS.map((t) => (
              <div key={t} className="card">
                <p className="caption mono" style={{ color: "var(--color-vault)" }}>NOT</p>
                <p className="body mt-3">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <article className="altar">
            <p className="altar__eyebrow">Keep it better</p>
            <h2 className="altar__title">
              The directory stays useful only if corrections move faster than drift.
            </h2>
            <p className="altar__summary">
              The long-term health of this directory depends on people
              sending precise corrections and better source links. The site
              should get stronger because the network uses it — not because
              the copy sounds confident.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/submit" className="altar__cta">
                Send a correction
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/what-is-ypaa"
                className="btn"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "#ffffff",
                  borderColor: "rgba(255,255,255,0.18)",
                }}
              >
                What YPAA means
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
