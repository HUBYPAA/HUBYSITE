import type { Metadata } from "next"
import Link from "next/link"
import {
  ActionStrip,
  LedgerRow,
  LedgerRows,
  PageIntro,
  PageShell,
  Surface,
} from "@/lib/components/atlas"

export const metadata: Metadata = {
  title: "About",
  description:
    "Why HUBYPAA exists, what it does, and what it does not try to be.",
}

export default function AboutPage() {
  return (
    <PageShell tone="stone">
      <div className="shell flex flex-col gap-8">
        <PageIntro
          compact
          kicker="About"
          title={
            <>
              The information is real.
              <br />
              <em>The path to it is usually messy.</em>
            </>
          }
          lead="Meetings are scattered. Conference details move around. Newcomers do not need more noise. They need orientation."
        />

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="grid gap-5">
            <Surface className="grid gap-3">
              <p className="page-kicker">Mission line</p>
              <h2 className="heading-lg">Useful before beautiful.</h2>
              <p className="body-sm" style={{ margin: 0 }}>
                The site is a practical regional recovery atlas. Beauty only
                stays if it helps the user move.
              </p>
            </Surface>

            <LedgerRows>
              <LedgerRow
                label="What this site does"
                title="A clearer front door into the rooms, weekends, and context."
                summary="It helps someone answer basic questions quickly: Is there a room near me? What is coming up? What does YPAA mean? Where do I send a correction?"
                tone="quiet"
              />
              <LedgerRow
                label="What this site does not do"
                title="It does not replace local AA service structures."
                summary="It is not a social feed, not an official AA body, and not a place for public member names or attendance data."
                tone="quiet"
              />
              <LedgerRow
                label="01"
                title="Human-reviewed before flashy."
                summary="Conference records that still need verification should say so. The product should not fake certainty."
                tone="quiet"
              />
              <LedgerRow
                label="02"
                title="Regional without pretending to govern."
                summary="The network already behaves like a product even when nobody has designed it that way."
                tone="quiet"
              />
              <LedgerRow
                label="03"
                title="Clear enough for newcomers, alive enough for YPAA."
                summary="The voice can stay strange and human, but the controls stay plain."
                tone="quiet"
              />
            </LedgerRows>
          </div>

          <Surface className="grid gap-4">
            <div>
              <p className="page-kicker">Keep it better</p>
              <h2 className="heading-lg">The atlas only works if people feed it.</h2>
            </div>
            <p className="body-sm" style={{ margin: 0 }}>
              The long-term health of the directory depends on precise
              corrections and better source links.
            </p>
            <ActionStrip>
              <Link href="/submit" className="btn btn--primary">
                Submit / update
              </Link>
              <Link href="/safety" className="btn btn--ghost">
                Safety
              </Link>
            </ActionStrip>
          </Surface>
        </section>
      </div>
    </PageShell>
  )
}
