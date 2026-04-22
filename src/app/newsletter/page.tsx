import type { Metadata } from "next"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { getRegions } from "@/lib/hub/queries"
import { NewsletterSignupForm } from "./signup-form"

export const metadata: Metadata = {
  title: "Newsletter",
  description: "The HUBYPAA newsletter — bi-monthly, regional, and nothing when there's nothing.",
}

export const dynamic = "force-dynamic"

export default async function NewsletterPage() {
  const regions = await getRegions({ activeOnly: true })

  return (
    <>
      <PortalHeader
        kicker="Newsletter"
        title="Subscribe — or don't."
        subtitle="Bi-monthly, regional, and skipped outright when there's nothing meaningful to share. You choose the regions you care about."
      />

      <section className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)]">
          <aside className="grid content-start gap-4">
            <div className="card card-quiet">
              <p className="eyebrow">What we send</p>
              <p className="body-sm mt-3">
                Upcoming events in your regions, brief intros from committee
                chairs, and occasional context pieces. No ads, no tracking
                pixels, no shared lists.
              </p>
            </div>
            <div className="card card-quiet">
              <p className="eyebrow">Cadence</p>
              <p className="body-sm mt-3">
                At most once every two months. If there&rsquo;s nothing meaningful to
                say, that issue is skipped.
              </p>
            </div>
            <div className="card card-quiet">
              <p className="eyebrow">Leaving</p>
              <p className="body-sm mt-3">
                Every issue includes a one-click unsubscribe link. Your data is
                only your email and the regions you picked.
              </p>
            </div>
          </aside>

          <section className="card">
            <p className="eyebrow">Sign up</p>
            <h2
              className="mt-3"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 400,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                letterSpacing: "-0.022em",
                lineHeight: 1.1,
                color: "var(--color-ink)",
              }}
            >
              Pick your regions, leave the rest alone.
            </h2>
            <hr className="hr my-8" />
            <NewsletterSignupForm regions={regions} />
          </section>
        </div>
      </section>
    </>
  )
}