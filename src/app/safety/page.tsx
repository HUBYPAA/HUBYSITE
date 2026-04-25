import type { Metadata } from "next"
import {
  LedgerRow,
  LedgerRows,
  MarginalRail,
  PageIntro,
  PageShell,
} from "@/lib/components/atlas"

export const metadata: Metadata = {
  title: "Safety",
  description:
    "Safety notes, anonymity reminders, accessibility expectations, and crisis resources for anyone using the site.",
}

const HOTLINES = [
  {
    name: "SAMHSA National Helpline",
    detail: "1-800-662-4357 · confidential, 24/7",
  },
  {
    name: "988 Suicide & Crisis Lifeline",
    detail: "Call or text 988",
  },
  {
    name: "Crisis Text Line",
    detail: "Text HOME to 741741",
  },
  {
    name: "AA General Service Office",
    detail: "212-870-3400",
  },
]

export default function SafetyPage() {
  return (
    <PageShell tone="stone">
      <div className="flex flex-col gap-8">
        <section className="celestial-hero star-field star-field--sparse">
          <div className="god-rays" aria-hidden="true" />
          <div className="celestial-hero__content shell">
            <PageIntro
              compact
              kicker="Safety"
              title={
                <span className="float-text">
                  Safety is not an afterthought.
                  <br />
                  <em>Anonymity is not decorative copy.</em>
                </span>
              }
              lead="If the site helps people move through meetings and conferences, the basic guardrails should be plain, serious, and easy to find."
            />
          </div>
        </section>

        <div className="shell flex flex-col gap-10">
          <div className="grid gap-6 py-4 border-t border-[rgba(24,50,74,0.1)]">
            <div>
              <p className="page-kicker">Need help now</p>
              <h2 className="heading-lg">Immediate support</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {HOTLINES.map((hotline) => (
                <div key={hotline.name} className="grid gap-1">
                  <p className="page-kicker">{hotline.name}</p>
                  <p className="body-sm" style={{ margin: 0 }}>
                    {hotline.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <LedgerRows>
              <LedgerRow
                label="Anonymity"
                title="What people share in meetings is not material for screenshots or casual retelling."
                summary="The site follows the same restraint by avoiding public member profiles, attendance data, and personal names."
              />
              <LedgerRow
                label="Online spaces"
                title="Do not record meetings or share private Zoom details more broadly than intended."
                summary="A digital room does not change the standard."
              />
              <LedgerRow
                label="Travel"
                title="Verify event details from the source link before you book."
                summary="Especially when a record still carries a scaffold or needs-confirmation note."
              />
              <LedgerRow
                label="Boundaries"
                title="A younger room still needs the same care any AA space needs."
                summary="Look for safety teams or host contacts, and tell someone trustworthy if a situation feels wrong."
              />
            </LedgerRows>

            <MarginalRail kicker="Accessibility" title="What the site owes you">
              <p style={{ margin: 0 }}>
                Visible focus states. Plain labels. No hidden critical meaning.
              </p>
              <p style={{ margin: 0 }}>
                Safety information stays boring in the best possible way.
              </p>
            </MarginalRail>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
