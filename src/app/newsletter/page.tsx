import type { Metadata } from "next"
import {
  MarginalRail,
  PageIntro,
  PageShell,
  Surface,
} from "@/lib/components/atlas"
import { getRegions } from "@/lib/hub/queries"
import { NewsletterSignupForm } from "./signup-form"

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "The HUBYPAA newsletter: events, chair notes, and useful regional updates at a deliberate pace.",
}

export const dynamic = "force-dynamic"

export default async function NewsletterPage() {
  const regions = await getRegions({ activeOnly: true })

  return (
    <PageShell tone="stone">
      <div className="flex flex-col gap-8">
        {/* ── Signal Tower ───────────────────────────── */}
        <section className="celestial-hero">
          <div className="celestial-hero__rays" aria-hidden="true" />
          <div className="celestial-hero__stars" aria-hidden="true" />
          <div className="celestial-hero__content shell">
            <PageIntro
              compact
              kicker="Newsletter"
              title={
                <span className="float-text">
                  Useful regional signal.
                  <br />
                  <em>Trust first.</em>
                </span>
              }
              lead="Events, chair notes, and useful regional updates. At most every two months. Leaving is one click, always."
            />
          </div>
        </section>

        <div className="shell grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Surface className="grid gap-6">
            <div>
              <p className="page-kicker">Promise</p>
              <h2 className="heading-lg">Pick your regions. Leave the rest alone.</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <Surface tone="quiet">
                <p className="page-kicker">What you get</p>
                <p className="body-sm" style={{ margin: 0 }}>
                  Events, chair notes, useful regional updates.
                </p>
              </Surface>
              <Surface tone="quiet">
                <p className="page-kicker">How often</p>
                <p className="body-sm" style={{ margin: 0 }}>
                  At most every two months.
                </p>
              </Surface>
              <Surface tone="quiet">
                <p className="page-kicker">Leaving</p>
                <p className="body-sm" style={{ margin: 0 }}>
                  One click, always.
                </p>
              </Surface>
            </div>
            <NewsletterSignupForm regions={regions} />
          </Surface>

          <MarginalRail kicker="Privacy" title="No list games">
            <p style={{ margin: 0 }}>
              No ads, no tracking pixels, and no shared subscriber lists.
            </p>
            <p style={{ margin: 0 }}>
              The only stored fields are your email, optional name, and the
              regions you picked.
            </p>
          </MarginalRail>
        </div>
      </div>
    </PageShell>
  )
}
