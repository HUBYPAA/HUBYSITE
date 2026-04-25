import type { Metadata } from "next"
import {
  MarginalRail,
  PageIntro,
  PageShell,
} from "@/lib/components/atlas"
import { SubmitForm } from "./submit-form"

export const metadata: Metadata = {
  title: "Submit / Update",
  description:
    "Send meeting submissions, event updates, corrections, or general notes through a clean public intake flow.",
}

export default function SubmitPage() {
  return (
    <PageShell tone="stone">
      <div className="flex flex-col gap-8">
        <section className="celestial-hero star-field star-field--sparse">
          <div className="god-rays" aria-hidden="true" />
          <div className="celestial-hero__content shell">
            <PageIntro
              compact
              kicker="Submit / update"
              title={
                <span className="float-text">
                  Send what you know
                  <br />
                  <em>while it is fresh.</em>
                </span>
              }
              lead="Missing meetings, event updates, broken links, bad dates, wrong cities, or anything else that makes a record weaker than it should be."
            />
          </div>
        </section>

        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <SubmitForm />
          <MarginalRail kicker="Guidance" title="What helps most">
            <p style={{ margin: 0 }}>
              Source links beat screenshots. Dates, venue names, city, and a
              follow-up email make the record much easier to trust.
            </p>
            <p style={{ margin: 0 }}>
              Nobody should need poetry to use a correction form. Plain wins
              here.
            </p>
            <p style={{ margin: 0 }}>
              No login required. Email is optional, but it helps if we need to
              confirm something.
            </p>
          </MarginalRail>
        </div>
      </div>
    </PageShell>
  )
}
