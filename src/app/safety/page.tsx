import type { Metadata } from "next"
import Link from "next/link"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"

export const metadata: Metadata = {
  title: "Safety & Anonymity",
  description:
    "Safety notes, anonymity reminders, and crisis resources for anyone using the site or moving through YPAA spaces.",
}

const RESOURCES = [
  { name: "SAMHSA National Helpline", detail: "1-800-662-4357 · confidential, 24/7", href: "tel:18006624357", action: "call" },
  { name: "988 Suicide & Crisis Lifeline", detail: "Call or text 988", href: "tel:988", action: "open" },
  { name: "Crisis Text Line", detail: "Text HOME to 741741", href: "sms:741741", action: "text" },
  { name: "AA General Service Office", detail: "212-870-3400", href: "tel:2128703400", action: "call" },
]

export default function SafetyPage() {
  return (
    <div className="pb-16">
      <PortalHeader
        glyph="winged-shield"
        kicker="safety & anonymity"
        title="Important enough to live outside the footer."
        subtitle="Anonymity is not decorative copy. Safety is not an afterthought. The basic guardrails should be easy to find."
        ribbonSeed={193}
      />

      {/* Crisis resources — warm chapel, not vault */}
      <section className="page-band pt-10">
        <div className="site-shell grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="panel-chapel panel-chapel--ochre p-6 sm:p-8">
            <span className="section-kicker">
              <HeraldicGlyph name="winged-shield" />
              need help right now
            </span>
            <h2 className="section-title mt-3" style={{ fontSize: "clamp(1.6rem,2.8vw,2.4rem)" }}>
              Use the real-world support first.
            </h2>
            <p
              className="mt-3 text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-prose)", fontStyle: "italic", fontSize: "0.96rem", lineHeight: 1.74 }}
            >
              This page can orient you, but it is not the emergency response.
            </p>
            <div className="mt-6 space-y-3">
              {RESOURCES.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-[var(--radius-sm)] border border-[var(--color-iron)] bg-[var(--color-ivory)] p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--color-crimson)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className="text-[var(--color-ink)]"
                        style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.1rem", letterSpacing: "-0.01em" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="mt-1.5 text-[var(--color-muted)]"
                        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "0.92rem" }}
                      >
                        {item.detail}
                      </p>
                    </div>
                    <span
                      className="inline-flex min-h-[2rem] items-center rounded-[var(--radius-sm)] border border-[var(--color-crimson)] px-3 text-[var(--color-crimson)]"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontVariantCaps: "all-small-caps",
                        letterSpacing: "0.18em",
                        fontSize: "0.74rem",
                      }}
                    >
                      {item.action}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-5">
            <article className="panel-raised p-6 sm:p-8">
              <span className="section-kicker">
                <HeraldicGlyph name="open-book" />
                anonymity
              </span>
              <div className="prose-block mt-4">
                <p>
                  What people share in meetings is not material for screenshots,
                  group chats, or casual retelling. The site follows the same
                  restraint by avoiding personal names, attendance data, and
                  public member profiles.
                </p>
                <p>
                  Online spaces deserve the same caution. Do not record meetings.
                  Do not share private Zoom details more broadly than intended.
                  A digital room does not change the standard.
                </p>
                <p>
                  At conferences, safety is practical: pay attention to the
                  culture of the room, look for safety teams or host contacts,
                  and tell someone trustworthy if a situation feels wrong.
                </p>
              </div>
            </article>

            <article className="panel-chapel panel-chapel--carnation p-5 sm:p-6">
              <span className="section-kicker">
                <HeraldicGlyph name="quill-key" />
                if a listing feels wrong
              </span>
              <p
                className="mt-3 text-[var(--color-muted)]"
                style={{ fontFamily: "var(--font-prose)", fontSize: "0.96rem", lineHeight: 1.78 }}
              >
                Broken location data, stale links, or unclear event details are
                a safety problem too. Send the correction instead of assuming
                someone else already did.
              </p>
              <Link href="/submit" className="action-primary mt-5">
                <HeraldicGlyph name="quill-key" className="h-4 w-4 text-[var(--color-gilt-soft)]" />
                report a problem
              </Link>
            </article>
          </div>
        </div>
      </section>

      <div className="site-shell">
        <FiligreeRule tone="shadow" />
      </div>

      {/* Three reminders */}
      <section className="page-band pt-10">
        <div className="site-shell">
          <div className="mb-8 text-center">
            <span className="section-kicker">
              <HeraldicGlyph name="open-book" />
              before you
            </span>
            <h2 className="section-title mt-3">Three small pauses.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { title: "Before you post", body: "Ask whether what you are sharing exposes someone else, even indirectly." },
              { title: "Before you travel", body: "Verify event details from the source link, especially if a record still carries a scaffold note." },
              { title: "Before you assume", body: "A younger room can still need boundaries, sponsorship, and the same care any AA space needs." },
            ].map((item) => (
              <article key={item.title} className="panel-chapel panel-chapel--ochre p-5 sm:p-6">
                <p className="meta-label">reminder</p>
                <h3
                  className="mt-3 text-[var(--color-ink)]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.4rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 text-[var(--color-muted)]"
                  style={{ fontFamily: "var(--font-prose)", fontSize: "0.96rem", lineHeight: 1.78 }}
                >
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
