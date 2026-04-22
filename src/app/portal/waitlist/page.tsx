import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
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
    <>
      <PortalHeader
        kicker="Waitlist"
        title="Access is manually approved."
        subtitle="The HUBYPAA portal is limited to current chairs and the HUBYPAA team. A human reviews every request."
      />

      <section className="shell">
        <div className="mx-auto max-w-2xl card">
          <p className="eyebrow">Signed in as</p>
          <p className="mt-2 text-sm text-[var(--color-fg)]">
            {user.name} · <span className="mono text-[var(--color-fg-2)]">{user.email}</span>
          </p>

          {pending ? (
            <>
              <hr className="hr my-6" />
              <p className="eyebrow">Your request</p>
              <h2 className="heading-lg mt-2">Submitted and awaiting review.</h2>
              <p className="body-sm mt-3">
                An admin will review your request. You&rsquo;ll be let in as
                soon as you&rsquo;re approved. No need to resubmit.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/auth/sign-out" className="btn btn-secondary">Sign out</Link>
                <Link href="/" className="btn btn-secondary">Back home</Link>
              </div>
            </>
          ) : (
            <>
              <hr className="hr my-6" />
              <p className="eyebrow">Request access</p>
              <h2 className="heading-lg mt-2">Tell us who you are.</h2>
              <p className="body-sm mt-3">
                Approval is limited to current committee chairs and the
                HUBYPAA team. Alumni and general members aren&rsquo;t granted
                access through this flow.
              </p>
              <hr className="hr my-6" />
              <WaitlistForm action={requestPortalAccess} />
            </>
          )}
        </div>
      </section>
    </>
  )
}