import type { Metadata } from "next"
import Link from "next/link"
import { RunningHead } from "@/lib/components/ornament"
import { SubmitForm } from "./submit-form"

export const metadata: Metadata = {
  title: "Submit / Update · HUBYPAA",
  description:
    "Send meeting submissions, conference updates, corrections, or general notes through a cleaner intake flow.",
}

export default function SubmitPage() {
  return (
    <section className="shell" aria-labelledby="submit-title">
      {/* ── Hero ── */}
      <header className="section section--hero">
        <RunningHead
          left={<span className="smallcaps">Submit / Update</span>}
          center={<span>Corrections should be easy to send</span>}
        />
        <h1 id="submit-title" className="section-head">
          Corrections should be easy to send{" "}
          <em>while they are still fresh.</em>
        </h1>
        <p className="lede max-w-3xl">
          Use this flow for missing meetings, conference updates, broken links,
          bad dates, wrong cities, or anything else that makes a record weaker
          than it should be.
        </p>
      </header>

      {/* ── Form section ── */}
      <section className="section section--tight">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <div className="frame frame--carved">
            <RunningHead left={<span className="smallcaps">What helps most</span>} />
            <div className="mt-5 space-y-4 text-sm leading-7 text-stone-700 sm:mt-6 sm:space-y-5">
              <p>A source link we can verify.</p>
              <p>A city and state, even if the rest is incomplete.</p>
              <p>Specific fixes instead of &quot;this looks wrong.&quot;</p>
              <p>Any note about whether the record is confirmed, tentative, or outdated.</p>
            </div>
          </div>

          <div className="frame">
            <SubmitForm />
          </div>
        </div>
      </section>
    </section>
  )
}
