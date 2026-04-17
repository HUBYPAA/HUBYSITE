import type { Metadata } from "next"
import { SubmitForm } from "./submit-form"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"

export const metadata: Metadata = {
  title: "Submit / Update",
  description:
    "Send meeting submissions, conference updates, corrections, or general notes through a cleaner intake flow.",
}

export default function SubmitPage() {
  return (
    <div className="pb-16">
      <PortalHeader
        glyph="quill-key"
        kicker="submit / update"
        title="Send the fix while it's fresh."
        subtitle="Missing meetings, conference updates, broken links, bad dates, wrong cities — anything that makes a record weaker than it should be."
        ribbonSeed={211}
      />

      {/* Workshop floor — narrow guidance tower + wide form nave */}
      <div className="site-shell mt-12 grid gap-6 xl:grid-cols-[minmax(0,0.4fr)_minmax(0,1.6fr)]">
        {/* Guidance tower — linden + brick */}
        <aside className="grid content-start gap-4">
          <div className="panel-linden p-5">
            <span className="section-kicker section-kicker--ivory">
              <HeraldicGlyph name="open-book" />
              the workshop
            </span>
            <p
              className="mt-3 text-[var(--color-ivory)]"
              style={{ fontFamily: "var(--font-prose)", fontSize: "0.94rem", lineHeight: 1.78 }}
            >
              The best submissions are specific, sourced, and fast. A rough
              note sent while the details are fresh beats a polished
              correction sent two weeks later.
            </p>
          </div>

          <div className="panel-chapel panel-chapel--ochre p-5">
            <p className="meta-label">what helps most</p>
            <ul className="stone-list mt-3" style={{ fontSize: "0.9rem" }}>
              <li>A source link we can verify.</li>
              <li>A city and state, even if the rest is incomplete.</li>
              <li>Specific fixes instead of &ldquo;this looks wrong.&rdquo;</li>
              <li>Whether the record is confirmed, tentative, or outdated.</li>
            </ul>
          </div>

          <div className="panel-debnik p-5">
            <span className="section-kicker section-kicker--vault">
              <HeraldicGlyph name="winged-shield" />
              do not send
            </span>
            <p
              className="mt-3 text-[rgba(241,233,214,0.78)]"
              style={{ fontFamily: "var(--font-prose)", fontStyle: "italic", fontSize: "0.92rem", lineHeight: 1.7 }}
            >
              Personal names, attendance details, private stories, or anything
              that would cut against anonymity. This intake is for listings
              and context — not people.
            </p>
          </div>
        </aside>

        {/* Form nave */}
        <section className="panel-raised relative p-5 sm:p-7 md:p-9">
          <span className="section-kicker">
            <HeraldicGlyph name="quill-key" />
            the form
          </span>
          <h2 className="section-title mt-3" style={{ fontSize: "clamp(1.7rem,3vw,2.4rem)" }}>
            No account. No public profile. Just the fix.
          </h2>
          <p
            className="mt-3 max-w-2xl text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-prose)", fontStyle: "italic", fontSize: "0.96rem", lineHeight: 1.74 }}
          >
            Email is optional. Personal names are not needed. If all you know
            is the city, the old link, and the corrected detail — that&apos;s
            enough to start.
          </p>

          <div className="my-6">
            <FiligreeRule tone="shadow" />
          </div>

          <SubmitForm />
        </section>
      </div>
    </div>
  )
}
