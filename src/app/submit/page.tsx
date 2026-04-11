import type { Metadata } from "next"
import { SubmitForm } from "./submit-form"

export const metadata: Metadata = {
  title: "Submit / Update",
  description:
    "Send meeting submissions, conference updates, corrections, or general notes through a cleaner intake flow.",
}

export default function SubmitPage() {
  return (
    <div className="site-shell pb-16 pt-28">
      <span className="section-kicker">Submit / Update</span>
      <h1 className="page-title mt-5 max-w-5xl">
        Corrections should be easy to send while they are still fresh.
      </h1>
      <p className="page-intro mt-5">
        Use this flow for missing meetings, conference updates, broken links,
        bad dates, wrong cities, or anything else that makes a record weaker
        than it should be.
      </p>

      <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <section className="panel p-7">
          <span className="section-kicker">What helps most</span>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted">
            <p>A source link we can verify.</p>
            <p>A city and state, even if the rest is incomplete.</p>
            <p>Specific fixes instead of “this looks wrong.”</p>
            <p>Any note about whether the record is confirmed, tentative, or outdated.</p>
          </div>
        </section>

        <section className="panel-raised p-7 md:p-8">
          <SubmitForm />
        </section>
      </div>
    </div>
  )
}
