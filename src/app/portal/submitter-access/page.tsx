import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/lib/components/atlas"
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
      <section className="shell">
        <div className="mx-auto max-w-2xl card">
          {approved ? (
            <>
              <p className="eyebrow">Status</p>
              <h2 className="heading-lg mt-2">You can submit events.</h2>
              <p className="body-sm mt-3">
                You&rsquo;re approved as a trusted servant submitter. All
                submissions still require admin review before they appear
                publicly.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/portal/submit-event" className="btn btn-amber">Submit an event</Link>
                <Link href="/portal" className="btn btn-secondary">Back to portal</Link>
              </div>
            </>
          ) : pending ? (
            <>
              <p className="eyebrow">Pending</p>
              <h2 className="heading-lg mt-2">Your request is under review.</h2>
              <p className="body-sm mt-3">A HUBYPAA admin will review your request.</p>
              <Link href="/portal" className="btn btn-secondary mt-6">Back to portal</Link>
            </>
          ) : (
            <>
              <p className="eyebrow">Request submitter access</p>
              <h2 className="heading-lg mt-2">Tell us your role.</h2>
              <p className="body-sm mt-3">
                This access is granted to trusted servants submitting events on
                behalf of a committee or conference. Approved submissions still
                go through admin review.
              </p>
              <hr className="hr my-6" />
              <SubmitterAccessForm
                action={requestSubmitterAccess}
                defaults={{ name: user.name, email: user.email }}
              />
            </>
          )}
        </div>
      </section>
    </PageShell>
  )
}
