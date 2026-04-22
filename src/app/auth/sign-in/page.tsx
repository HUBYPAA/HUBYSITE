import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { getCurrentUser } from "@/lib/hub/auth"
import { oauthConfigured } from "@/lib/hub/oauth"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the HUBYPAA portal with your Google account.",
}

export const dynamic = "force-dynamic"

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams
  const user = await getCurrentUser()
  if (user) redirect(next || "/portal")

  const configured = oauthConfigured()
  const nextParam = next ? `?next=${encodeURIComponent(next)}` : ""

  return (
    <>
      <PortalHeader
        kicker="Sign in"
        title="Sign in to continue."
        subtitle="The HUBYPAA portal uses Google sign-in. Signing in alone does not grant access to protected areas — approval is manual."
      />

      <section className="shell">
        <div className="mx-auto max-w-xl card">
          {configured ? (
            <>
              <p className="eyebrow">Google</p>
              <h2 className="display-2 mt-2">Use your Google account.</h2>
              <p className="body mt-3">
                We only store your name, email, and a Google identifier. We
                don&rsquo;t read anything else from your Google account.
              </p>
              <a href={`/api/auth/start${nextParam}`} className="btn btn-amber btn-lg mt-6">
                Continue with Google
              </a>
              <p className="caption mono mt-6">
                After signing in, you&rsquo;ll land on the portal. If your
                account isn&rsquo;t approved yet, you&rsquo;ll be placed on the
                waitlist.
              </p>
            </>
          ) : (
            <>
              <p className="eyebrow">Not configured</p>
              <h2 className="display-2 mt-2">Sign-in is offline.</h2>
              <p className="body mt-3">
                Google OAuth credentials are not configured for this deploy.
                Ask a HUBYPAA admin to set{" "}
                <code className="mono">GOOGLE_CLIENT_ID</code> and{" "}
                <code className="mono">GOOGLE_CLIENT_SECRET</code>.
              </p>
              <Link href="/" className="btn btn-secondary mt-6">
                Back home
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  )
}