import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
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
    <>
      <PortalHeader
        kicker="Edit submission"
        title="Refine before review."
        subtitle="You can keep editing until a reviewer picks this up."
      />
      <section className="shell">
        <div className="card">
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
        </div>
      </section>
    </>
  )
}