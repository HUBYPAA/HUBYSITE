import type { Metadata } from "next"
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
    <>
      <PortalHeader
        kicker="Submit event"
        title="Submit an event for review."
        subtitle="Nothing goes public without admin review. You can keep editing this submission until it's reviewed."
      />
      <section className="shell">
        <div className="card">
          <p className="eyebrow">Consent & scope</p>
          <p className="body-sm mt-3">
            Only submit events that your committee or conference is hosting or
            sanctioned to promote. Submissions are reviewed for safety and
            relevance; reviewers don&rsquo;t validate committee politics.
          </p>
          <hr className="hr my-8" />
          <EventSubmitForm
            action={submitEvent}
            regions={regions}
            defaults={{ submitterName: user.name, submitterEmail: user.email }}
          />
        </div>
      </section>
    </>
  )
}