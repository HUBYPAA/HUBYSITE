import type { Metadata } from "next"
import Link from "next/link"
import {
  ActionStrip,
  StarCanopy,
  LedgerRow,
  LedgerRows,
  MarginalRail,
  PageIntro,
  PageShell,
} from "@/lib/components/atlas"

export const metadata: Metadata = {
  title: "What is YPAA?",
  description:
    "A clear introduction to young people's AA, how the conferences work, and how someone new can walk in.",
}

export default function WhatIsYpaaPage() {
  return (
    <PageShell tone="stone">
      <div className="shell flex flex-col gap-8">
        <PageIntro
          compact
          kicker="What is YPAA?"
          title={
            <>
              No separate fellowship.
              <br />
              <em>No alternate AA.</em>
            </>
          }
          lead="YPAA is the name many people use for the young people's network within AA. There is not one universal age cutoff, and the rooms still belong to AA."
          actions={
            <ActionStrip>
              <Link href="/meetings" className="btn btn--primary">
                Find a meeting
              </Link>
              <Link href="/conferences" className="btn btn--ghost">
                See the weekends
              </Link>
            </ActionStrip>
          }
        />

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="grid gap-5">
            <LedgerRows>
              <LedgerRow
                label="What people usually mean"
                title="Meetings where the room tends to be younger."
                summary="Conferences built around fellowship, speakers, workshops, and service. Committees that help organize those weekends. A network that can make sobriety feel less isolating."
                tone="quiet"
              />
              <LedgerRow
                label="Do I have to be a certain age?"
                title="No single national rule applies everywhere."
                summary="AA itself does not set a membership age requirement. Local YPAA spaces may describe who they are for, but there is no universal cutoff."
                tone="quiet"
              />
              <LedgerRow
                label="Can I go if I am just curious?"
                title="If the meeting is open, yes."
                summary="Open meetings welcome anyone who wants to learn more. Closed meetings are generally for people who identify as having a desire to stop drinking."
                tone="quiet"
              />
              <LedgerRow
                label="Service path"
                title="A lot of people enter through host committees and conference service."
                summary="For many, that is where fellowship becomes responsibility."
                tone="quiet"
              />
            </LedgerRows>

            <StarCanopy
              kicker="Closing invitation"
              title="The point is not to decode a culture. It is to walk in."
              lead="The rooms, the conferences, and the service paths are just different doorways into the same work."
              items={[
                {
                  href: "/meetings",
                  title: "Find a meeting",
                  meta: "Start with a room",
                },
                {
                  href: "/conferences",
                  title: "See conferences",
                  meta: "Follow the weekends",
                },
                {
                  href: "/submit",
                  title: "Send a correction",
                  meta: "Keep the map honest",
                },
              ]}
            />
          </div>

          <MarginalRail kicker="Walk in" title="Good beginner moves">
            <p style={{ margin: 0 }}>
              Start with an open meeting if you are unsure.
            </p>
            <p style={{ margin: 0 }}>
              Ask a real person what the room is like before assuming the label
              tells you everything.
            </p>
            <p style={{ margin: 0 }}>
              Conferences can be major entry points, but the room is still the
              foundation.
            </p>
          </MarginalRail>
        </section>
      </div>
    </PageShell>
  )
}
