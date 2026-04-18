import type { Metadata } from "next"
import { SubmitForm } from "./submit-form"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"

export const metadata: Metadata = {
  title: "Submit / update",
  description:
    "Send meeting submissions, conference updates, corrections, or general notes through a cleaner intake flow.",
}

export default function SubmitPage() {
  return (
    <>
      <PortalHeader
        kicker="Submit / update"
        title="Send the fix while it's fresh."
        subtitle="Missing meetings, conference updates, broken links, bad dates, wrong cities — anything that makes a record weaker than it should be."
      />

      <section className="shell">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.4fr)_minmax(0,1.6fr)]">
          <aside className="grid content-start gap-4">
            <div className="card card-quiet">
              <p className="eyebrow">The best submissions</p>
              <p className="body-sm mt-3">
                Specific, sourced, and fast. A rough note sent while the
                details are fresh beats a polished correction sent two
                weeks later.
              </p>
            </div>

            <div className="card card-quiet">
              <p className="eyebrow">What helps most</p>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-ink-2)]">
                <li>• A source link we can verify.</li>
                <li>• A city and state, even if the rest is incomplete.</li>
                <li>• Specific fixes instead of &ldquo;this looks wrong.&rdquo;</li>
                <li>• Whether the record is confirmed, tentative, or outdated.</li>
              </ul>
            </div>

            <div
              className="card"
              style={{
                background: "linear-gradient(180deg, rgba(226, 112, 102, 0.1), rgba(226, 112, 102, 0.02))",
                borderColor: "rgba(226, 112, 102, 0.28)",
              }}
            >
              <p className="label mono" style={{ color: "var(--color-danger)" }}>do-not-send</p>
              <p className="body-sm mt-3">
                Personal names, attendance details, private stories, or anything
                that would cut against anonymity. This intake is for listings
                and context — not people.
              </p>
            </div>
          </aside>

          <section className="card">
            <p className="eyebrow">The form</p>
            <h2
              className="mt-3 max-w-2xl"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                color: "var(--color-ink)",
              }}
            >
              No account. No public profile. Just the fix.
            </h2>
            <p className="body mt-3 max-w-xl">
              Email is optional. Personal names are not needed. If all you
              know is the city, the old link, and the corrected detail —
              that&rsquo;s enough to start.
            </p>

            <hr className="hr my-8" />

            <SubmitForm />
          </section>
        </div>
      </section>
    </>
  )
}
