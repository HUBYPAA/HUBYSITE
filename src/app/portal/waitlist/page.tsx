import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ActionStrip, MarginalRail, PageShell, StatusRail, Surface } from "@/lib/components/atlas"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { getCurrentUser, hasPortalAccess } from "@/lib/hub/auth"
import { readAll } from "@/lib/hub/store"
import { requestPortalAccess } from "./actions"
import { WaitlistForm } from "./form"

export const metadata: Metadata = { title: "Portal — waitlist" }
export const dynamic = "force-dynamic"

export default async function WaitlistPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/auth/sign-in?next=/portal")
  if (hasPortalAccess(user)) redirect("/portal")

  const requests = await readAll("portal_access_requests")
  const pending = requests.find((r) => r.userId === user.id && r.status === "pending")

  return (
    <PageShell tone="portal">
      <PortalHeader
        kicker="Waitlist"
        title="Access is manually approved."
        subtitle="The HUBYPAA portal is limited to current chairs and the HUBYPAA team. A human reviews every request."
      />

      <section className="shell grid gap-6 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)]">
        <Surface className="mx-auto grid max-w-3xl gap-6">
          <div>
            <p className="page-kicker">Signed in as</p>
            <p className="mt-2 text-sm text-[var(--color-fg)]">
              {user.name} · <span className="mono text-[var(--color-fg-2)]">{user.email}</span>
            </p>
          </div>

          {pending ? (
            <>
              <div>
                <p className="page-kicker">Your request</p>
                <h2 className="heading-lg">Submitted and awaiting review.</h2>
              </div>
              <p className="body-sm" style={{ margin: 0 }}>
                An admin will review your request. You&rsquo;ll be let in as
                soon as you&rsquo;re approved. No need to resubmit.
              </p>
              <ActionStrip>
                <Link href="/auth/sign-out" className="btn btn-secondary">Sign out</Link>
                <Link href="/" className="btn btn-secondary">Back home</Link>
              </ActionStrip>
            </>
          ) : (
            <>
              <div>
                <p className="page-kicker">Request access</p>
                <h2 className="heading-lg">Tell us who you are.</h2>
              </div>
              <p className="body-sm" style={{ margin: 0 }}>
                Approval is limited to current committee chairs and the
                HUBYPAA team. Alumni and general members aren&rsquo;t granted
                access through this flow.
              </p>
              <WaitlistForm action={requestPortalAccess} />
            </>
          )}
        </Surface>
        <div className="grid gap-4">
          <Surface tone="quiet">
            <StatusRail
              steps={[
                {
                  label: "Request sent",
                  detail: pending ? "Your request is already waiting in the queue." : "Tell us your current role and committee.",
                  state: pending ? "complete" : "current",
                },
                {
                  label: "Human review",
                  detail: "Portal access is reviewed manually against current service positions.",
                  state: pending ? "current" : "upcoming",
                },
                {
                  label: "Approved or denied",
                  detail: "Approved users enter the portal. Others stay outside protected routes.",
                  state: "upcoming",
                },
              ]}
            />
          </Surface>
          <MarginalRail kicker="Who this is for" title="Portal access stays narrow">
            <p>Current committee chairs, current conference teams, and the HUBYPAA team.</p>
            <p>General membership and alumni do not receive directory access through this flow.</p>
          </MarginalRail>
        </div>
      </section>
    </PageShell>
  )
}
