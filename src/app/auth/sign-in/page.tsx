import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FocalPanel, PageShell, Surface } from "@/lib/components/atlas"
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
    <PageShell tone="portal">
      <div className="door-panel shell">
        {/* ── Doorway of Light ───────────────────────── */}
        <section className="celestial-hero">
          <div className="celestial-hero__rays" aria-hidden="true" />
          <div className="celestial-hero__stars" aria-hidden="true" />
          <div className="celestial-hero__content">
            <FocalPanel
              kicker="Portal sign in"
              title={
                <span className="float-text">
                  Step behind the map.
                  <br />
                  <em>Sign in to continue.</em>
                </span>
              }
              lead={
                configured
                  ? "Google sign-in only. We store your name, email, and Google identifier. Approval to protected areas is manual."
                  : "Google OAuth credentials are not configured for this deploy. Ask a HUBYPAA admin to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET."
              }
              actions={
                configured ? (
                  <a href={`/api/auth/start${nextParam}`} className="btn btn--primary">
                    Continue with Google
                  </a>
                ) : (
                  <Link href="/" className="btn btn--ghost">
                    Back home
                  </Link>
                )
              }
              aside={
                <Surface tone="quiet">
                  <p className="page-kicker">What happens next</p>
                  <p className="body-sm" style={{ margin: 0 }}>
                    You will land in the portal. Unapproved accounts move to the
                    waitlist for human review.
                  </p>
                </Surface>
              }
            />
          </div>
        </section>
      </div>
    </PageShell>
  )
}
