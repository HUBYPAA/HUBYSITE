import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
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
    <section className="signin-wrap">
      <div className="signin-card">
        <span className="starmark starmark--xl" aria-hidden style={{ margin: "0 auto" }} />
        {configured ? (
          <>
            <h1>Sign in to continue.</h1>
            <p>
              Google sign-in only. We store your name, email, and a Google
              identifier. Approval to protected areas is manual.
            </p>
            <a href={`/api/auth/start${nextParam}`} className="btn btn--gold" style={{ justifyContent: "center" }}>
              Continue with Google
            </a>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gilt-aged)" }}>
              You&rsquo;ll land on the portal. Unapproved accounts go to the waitlist.
            </p>
          </>
        ) : (
          <>
            <h1>Sign-in is offline.</h1>
            <p>
              Google OAuth credentials are not configured for this deploy.
              Ask a HUBYPAA admin to set <code className="mono">GOOGLE_CLIENT_ID</code>
              {" "}and <code className="mono">GOOGLE_CLIENT_SECRET</code>.
            </p>
            <Link href="/" className="btn btn--ghost" style={{ justifyContent: "center" }}>
              Back home
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
