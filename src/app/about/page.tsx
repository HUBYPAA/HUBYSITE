import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"

export const metadata: Metadata = {
  title: "About",
  description:
    "Why this site exists, what it is for, and what kind of trust and restraint shaped the product.",
}

export default function AboutPage() {
  return (
    <div className="pb-16">
      <PortalHeader
        glyph="tower-renaissance"
        kicker="about"
        title="A map-first hub built to be calmer."
        subtitle="The information is real. The path to it is usually messy. This is the cleaner front door."
        ribbonSeed={101}
      />

      {/* ── Prose nave with drop cap ── */}
      <div className="site-shell mt-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          <article className="prose-block max-w-none">
            <p>
              This project exists because the information is real, but the path
              to it is usually messy. Meetings are scattered. Conference details
              move around. Newcomers do not need more noise — they need
              orientation. So this is a national directory for young
              people&apos;s AA meetings, conference records, and the supporting
              context that makes them legible.
            </p>
            <p>
              It is designed to help someone answer basic questions quickly: Is
              there a room near me? What is coming up? What does YPAA mean?
              Where do I send a correction? It is not trying to replace local
              AA service structures — it is a clearer front door into them.
            </p>
            <p>
              The product should feel authored, not loud. It should admit when
              a record still needs work. It should make the next action
              obvious. And it should look like the network actually feels —
              not like a brochure printed in a hurry.
            </p>
          </article>

          <aside className="grid content-start gap-4">
            <div className="panel-chapel panel-chapel--ochre p-5">
              <span className="section-kicker">
                <HeraldicGlyph name="diamond-pip" />
                principle one
              </span>
              <h3
                className="mt-2 text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.4rem", letterSpacing: "-0.02em", lineHeight: 1.05 }}
              >
                Map-first.
              </h3>
              <p
                className="mt-2 text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-prose)", fontSize: "0.92rem", lineHeight: 1.7 }}
              >
                Start with orientation before filters and detail.
              </p>
            </div>
            <div className="panel-chapel panel-chapel--emerald p-5">
              <span className="section-kicker">
                <HeraldicGlyph name="diamond-pip" />
                principle two
              </span>
              <h3
                className="mt-2 text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.4rem", letterSpacing: "-0.02em", lineHeight: 1.05 }}
              >
                National scope.
              </h3>
              <p
                className="mt-2 text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-prose)", fontSize: "0.92rem", lineHeight: 1.7 }}
              >
                One place to scan rooms and weekends across states.
              </p>
            </div>
            <div className="panel-chapel panel-chapel--carnation p-5">
              <span className="section-kicker">
                <HeraldicGlyph name="diamond-pip" />
                principle three
              </span>
              <h3
                className="mt-2 text-[var(--color-ink)]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.4rem", letterSpacing: "-0.02em", lineHeight: 1.05 }}
              >
                Volunteer-built.
              </h3>
              <p
                className="mt-2 text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-prose)", fontSize: "0.92rem", lineHeight: 1.7 }}
              >
                Improves because people keep sending cleaner info.
              </p>
            </div>
          </aside>
        </div>
      </div>

      <div className="site-shell mt-14">
        <FiligreeRule tone="shadow" />
      </div>

      {/* ── What it is not — three carved cards ── */}
      <section className="page-band pt-10">
        <div className="site-shell">
          <div className="mb-8 text-center">
            <span className="section-kicker">
              <HeraldicGlyph name="open-book" />
              boundaries
            </span>
            <h2 className="section-title mt-3">What this site is not.</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <NotItem text="Not an official AA body. The directory follows the spirit of the traditions but does not speak for AA as a whole." />
            <NotItem text="Not a social feed. No public profiles, no like counts, no algorithmic timeline." />
            <NotItem text="Not a place for personal names, attendance data, or member tracking. Anonymity is structural here, not decorative." />
            <NotItem text="Not a claim that every record is already perfect. Some entries are scaffolds and say so." />
          </div>
        </div>
      </section>

      {/* ── The vault closing — keep it better ── */}
      <div className="site-shell">
        <FiligreeRule tone="gilt" />
      </div>

      <section className="page-band pt-10">
        <div className="site-shell">
          <div className="panel-vault relative p-7 sm:p-9">
            <span className="section-kicker section-kicker--vault">
              <HeraldicGlyph name="quill-key" />
              keep it better
            </span>
            <h2
              className="mt-4 text-[var(--color-gilt)]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(2rem,4vw,3rem)",
                letterSpacing: "-0.03em",
                lineHeight: 0.96,
                textWrap: "balance",
              }}
            >
              The directory stays useful only if corrections move faster than drift.
            </h2>
            <p
              className="mt-5 max-w-3xl text-[rgba(241,233,214,0.78)]"
              style={{
                fontFamily: "var(--font-prose)",
                fontSize: "1.02rem",
                lineHeight: 1.78,
              }}
            >
              The long-term health of this directory depends on people sending
              precise corrections and better source links. The site should get
              stronger because the network uses it — not because the copy
              sounds confident.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/submit" className="action-altar">
                <HeraldicGlyph name="quill-key" className="h-4 w-4 text-[var(--color-lapis)]" />
                send a correction
              </Link>
              <Link
                href="/what-is-ypaa"
                className="action-secondary"
                style={{
                  background: "rgba(241,233,214,0.06)",
                  color: "var(--color-ivory)",
                  borderColor: "rgba(220,177,58,0.32)",
                }}
              >
                read what ypaa means
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function NotItem({ text }: { text: string }) {
  return (
    <div className="panel p-5">
      <span
        className="inline-flex items-center gap-2 text-[var(--color-crimson)]"
        style={{
          fontFamily: "var(--font-serif)",
          fontVariantCaps: "all-small-caps",
          letterSpacing: "0.18em",
          fontSize: "0.74rem",
        }}
      >
        <HeraldicGlyph name="diamond-pip" className="h-1.5 w-1.5" />
        not
      </span>
      <p
        className="mt-3 text-[var(--color-ink)]"
        style={{ fontFamily: "var(--font-prose)", fontSize: "1rem", lineHeight: 1.78 }}
      >
        {text}
      </p>
    </div>
  )
}
