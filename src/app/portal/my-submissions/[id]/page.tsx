import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { MarginalRail, PageShell, StatusRail, Surface } from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requirePortalAccess } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { getRegions } from "@/lib/hub/queries"
import { EventSubmitForm } from "../../submit-event/form"
import { updateOwnEvent } from "../../submit-event/actions"

export const metadata: Metadata = { title: "Edit submission" }
export const dynamic = "force-dynamic"

export default async function EditSubmissionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await requirePortalAccess()
  const events = await readAll("events")
  const event = events.find((e) => e.id === id)
  if (!event) notFound()
  if (event.submitterUserId !== user.id) redirect("/portal/my-submissions")
  if (event.status !== "pending" || event.locked) redirect("/portal/my-submissions")

  const regions = await getRegions({ activeOnly: true })

  return (
    <PageShell tone="portal">
      <PortalHeader
        kicker="Edit submission"
        title="Refine before review."
        subtitle="You can keep editing until a reviewer picks this up."
      />
      <section className="shell grid gap-6 pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <Surface className="grid gap-6">
          <div>
            <p className="page-kicker">Pending record</p>
            <h2 className="heading-lg">Keep the details clean before lock.</h2>
          </div>
          <EventSubmitForm
            action={updateOwnEvent}
            regions={regions}
            editing
            defaults={{
              submitterName: user.name,
              submitterEmail: user.email,
              id: event.id,
              title: event.title,
              date: event.date,
              endDate: event.endDate,
              time: event.time,
              regionId: event.regionId,
              city: event.city,
              state: event.state,
              venue: event.venue,
              hostCommittee: event.hostCommittee,
              registrationUrl: event.registrationUrl,
              chairPitch: event.chairPitch,
            }}
          />
        </Surface>
        <div className="grid gap-4">
          <Surface tone="quiet">
            <StatusRail
              steps={[
                {
                  label: "Submitted",
                  detail: "Your record is in the review queue.",
                  state: "complete",
                },
                {
                  label: event.locked ? "Locked for review" : "Still editable",
                  detail: event.locked
                    ? "A reviewer has picked this up. Edits now require follow-up."
                    : "You can still fix timing, venue, or source details here.",
                  state: event.locked ? "warning" : "current",
                },
                {
                  label: "Decision",
                  detail: "Approved items move public. Others return with notes or are archived.",
                  state: "upcoming",
                },
              ]}
            />
          </Surface>
          <MarginalRail kicker="Reminder" title="What reviewers need">
            <p>Venue, city, region, and a source or registration link make approval faster.</p>
            <p>If anything changed after you submitted, update it here before the record locks.</p>
          </MarginalRail>
        </div>
      </section>
    </PageShell>
  )
}
