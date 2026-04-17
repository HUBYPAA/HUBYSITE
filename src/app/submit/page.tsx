import type { Metadata } from "next"
import { SubmitForm } from "./submit-form"

export const metadata: Metadata = {
  title: "Submit / Update",
  description:
    "Send meeting submissions, conference updates, corrections, or general notes through a cleaner intake flow.",
}

export default function SubmitPage() {
  return (
    <div className="site-shell pb-16 pt-24 sm:pt-28">
      <span className="section-kicker">Submit / Update</span>
      <h1 className="page-title mt-4 max-w-5xl sm:mt-5">
        Corrections should be easy to send while they are still fresh.
      </h1>
      <p className="page-intro mt-4 sm:mt-5">
        Use this flow for missing meetings, conference updates, broken links,
        bad dates, wrong cities, or anything else that makes a record weaker
        than it should be.
      </p>

      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <section className="panel-raised rise-in relative overflow-hidden p-5 sm:p-7 md:p-9">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(200,164,78,0.14),transparent_42%),radial-gradient(circle_at_top_right,rgba(45,107,94,0.08),transparent_38%)]" />
          <div className="relative z-10">
            <span className="section-kicker">What this intake is for</span>
            <p className="mt-4 text-base leading-7 text-muted sm:mt-5 sm:leading-8">
              The best submissions are specific, sourced, and fast. A rough note
              sent while the details are fresh is more useful than a polished
              correction sent two weeks later.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:mt-7">
              {[
                {
                  label: "Best input",
                  body: "A source link we can verify.",
                },
                {
                  label: "Still helpful",
                  body: "City, state, and the piece that changed.",
                },
                {
                  label: "Worth saying",
                  body: "Whether the record feels confirmed, tentative, or stale.",
                },
              ].map((item) => (
                <div key={item.label} className="panel-muted p-4">
                  <p className="meta-label">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel-outline rise-in p-5 sm:p-7">
          <p className="meta-label">How it should feel</p>
          <h2 className="mt-3 font-serif text-[1.7rem] leading-[0.98] tracking-[-0.04em] text-ink sm:text-[2rem]">
            No account. No public profile. Just a clean way to make the record better.
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted sm:mt-4 sm:text-base">
            Email is optional. Personal names are not needed. If all you know is
            the city, the old link, and the corrected detail, that is enough to
            start.
          </p>
        </section>
      </div>

      <div className="mt-10 sm:mt-12">
        <div className="processional-divider" />
      </div>

      <div className="mt-10 grid gap-5 sm:gap-6 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <section className="panel rise-in p-5 sm:p-7">
          <span className="section-kicker">What helps most</span>
          <ul className="stone-list mt-5 text-sm sm:mt-6">
            <li>A source link we can verify.</li>
            <li>A city and state, even if the rest is incomplete.</li>
            <li>Specific fixes instead of &quot;this looks wrong.&quot;</li>
            <li>Any note about whether the record is confirmed, tentative, or outdated.</li>
          </ul>

          <div className="panel-muted mt-6 p-4 sm:mt-7 sm:p-5">
            <p className="meta-label">Do not send</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              Personal names, attendance details, private stories, or anything
              that would cut against anonymity. This intake is for listings and
              context, not people.
            </p>
          </div>
        </section>

        <section className="panel-raised rise-in p-5 sm:p-7 md:p-8">
          <SubmitForm />
        </section>
      </div>
    </div>
  )
}
