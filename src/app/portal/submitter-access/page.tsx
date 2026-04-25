import type { Metadata } from "next"
import Link from "next/link"
import { ActionStrip, MarginalRail, PageShell, StatusRail, Surface } from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { requirePortalAccess } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { requestSubmitterAccess } from "./actions"
import { SubmitterAccessForm } from "./form"

export const metadata: Metadata = { title: "Portal — submitter access" }
export const dynamic = "force-dynamic"

export default async function SubmitterAccessPage() {
  const user = await requirePortalAccess()
  const requests = await readAll("submitter_access_requests")
  const pending = requests.find((r) => r.userId === user.id && r.status === "pending")
  const approved = user.submitterAccess === "approved"

  return (
    <PageShell tone="portal">
      <PortalHeader
        kicker="Submitter access"
        title="Submit events once approved."
        subtitle="Submission is limited to approved trusted servants. Approval is manual and revocable."
      />
      <section className="shell grid gap-6 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)]">
        <Surface className="mx-auto grid max-w-3xl gap-6">
          {approved ? (
            <>
              <div>
                <p className="page-kicker">Status</p>
                <h2 className="heading-lg">You can submit events.</h2>
              </div>
              <p className="body-sm" style={{ margin: 0 }}>
                You&rsquo;re approved as a trusted servant submitter. All
                submissions still require admin review before they appear
                publicly.
              </p>
              <ActionStrip>
                <Link href="/portal/submit-event" className="btn btn-amber">Submit an event</Link>
                <Link href="/portal" className="btn btn-secondary">Back to portal</Link>
              </ActionStrip>
            </>
          ) : pending ? (
            <>
              <div>
                <p className="page-kicker">Pending</p>
                <h2 className="heading-lg">Your request is under review.</h2>
              </div>
              <p className="body-sm" style={{ margin: 0 }}>
                A HUBYPAA admin will review your request. No need to resubmit
                unless your role or contact details changed.
              </p>
              <ActionStrip>
                <Link href="/portal" className="btn btn-secondary">Back to portal</Link>
              </ActionStrip>
            </>
          ) : (
            <>
              <div>
                <p className="page-kicker">Request submitter access</p>
                <h2 className="heading-lg">Tell us your role.</h2>
              </div>
              <p className="body-sm" style={{ margin: 0 }}>
                This access is granted to trusted servants submitting events on
                behalf of a committee or conference. Approved submissions still
                go through admin review.
              </p>
              <SubmitterAccessForm
                action={requestSubmitterAccess}
                defaults={{ name: user.name, email: user.email }}
              />
            </>
          )}
        </Surface>
        <div className="grid gap-4">
          <Surface tone="quiet">
            <StatusRail
              steps={[
                {
                  label: "Request sent",
                  detail: approved || pending ? "Your request is already in motion." : "Tell us your role and committee.",
                  state: approved || pending ? "complete" : "current",
                },
                {
                  label: "Human review",
                  detail: "Admins check that the request matches a current trusted-servant role.",
                  state: approved ? "complete" : "current",
                },
                {
                  label: approved ? "Access approved" : "Approved or denied",
                  detail: approved
                    ? "You can submit events for review."
                    : "You will either be approved or asked for follow-up.",
                  state: approved ? "complete" : "upcoming",
                },
              ]}
            />
          </Surface>
          <MarginalRail kicker="Scope" title="What this access is for">
            <p>Regional committees, boards, and conference teams sending real event information into the atlas.</p>
            <p>Approval grants intake access only. It does not bypass public review.</p>
          </MarginalRail>
        </div>
      </section>
    </PageShell>
  )
}
