import type { Metadata } from "next"
import { MarginalRail, PageShell, StatusRail, Surface } from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requireSubmitter } from "@/lib/hub/auth"
import { getRegions } from "@/lib/hub/queries"
import { submitEvent } from "./actions"
import { EventSubmitForm } from "./form"

export const metadata: Metadata = { title: "Submit event" }
export const dynamic = "force-dynamic"

export default async function SubmitEventPage() {
  const user = await requireSubmitter()
  const regions = await getRegions({ activeOnly: true })

  return (
    <PageShell tone="portal">
      <PortalHeader
        kicker="Submit event"
        title="Submit an event for review."
        subtitle="Nothing goes public without admin review. You can keep editing this submission until it's reviewed."
      />
      <section className="shell grid gap-6 pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <Surface className="grid gap-6">
          <div>
            <p className="page-kicker">Submission station</p>
            <h2 className="heading-lg">Service made clean.</h2>
          </div>
          <p className="body-sm" style={{ margin: 0 }}>
            Only submit events that your committee or conference is hosting or
            sanctioned to promote. Submissions are reviewed for safety and
            relevance; reviewers don&rsquo;t validate committee politics.
          </p>
          <EventSubmitForm
            action={submitEvent}
            regions={regions}
            defaults={{ submitterName: user.name, submitterEmail: user.email }}
          />
        </Surface>
        <div className="grid gap-4">
          <Surface tone="quiet">
            <StatusRail
              steps={[
                {
                  label: "Draft your event",
                  detail: "Add timing, place, host committee, and any registration link.",
                  state: "current",
                },
                {
                  label: "Human review",
                  detail: "Admins check relevance, clarity, and whether the event belongs in the regional feed.",
                  state: "upcoming",
                },
                {
                  label: "Approved or follow-up",
                  detail: "If anything needs work, the submission can be reopened with notes.",
                  state: "upcoming",
                },
              ]}
            />
          </Surface>
          <MarginalRail kicker="Verification" title="What helps review move faster">
            <p>Venue, host committee, and a real registration or source link.</p>
            <p>Use the chair pitch only for newsletter context. It is not shown publicly.</p>
          </MarginalRail>
        </div>
      </section>
    </PageShell>
  )
}
