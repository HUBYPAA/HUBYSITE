import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"

export const metadata: Metadata = {
  title: "What is YPAA",
  description:
    "A plain-language explanation of Young People in AA, written for newcomers, the curious, and anyone who needs a quick orientation.",
}

const PILLARS = [
  { title: "Meetings",    body: "Still AA meetings. Same steps, same traditions, same aim. The difference is often the age and energy of the room." },
  { title: "Conferences", body: "Speakers, workshops, social time, committee business, travel. These can become major nodes in the wider network." },
  { title: "Service",     body: "Many people first get involved through host committees and conference service — where fellowship becomes responsibility." },
]

const FAQS = [
  { q: "Do I have to be a certain age?",            a: "AA itself does not set a membership age requirement. Local YPAA spaces may describe who they are for, but there is no single national rule that applies everywhere." },
  { q: "Can I go if I am just curious?",             a: "If a meeting is open, yes. Open meetings welcome anyone who wants to learn more. Closed meetings are generally for people who identify as having a desire to stop drinking." },
  { q: "Is YPAA the only place young people recover?", a: "No. Plenty of young people get sober in mixed-age meetings and never identify strongly with YPAA. It is one lane into recovery, not the only one." },
]

export default function WhatIsYPAAPage() {
  return (
    <>
      <PortalHeader
        kicker="What is YPAA"
        title="A part of AA, not a separate program."
        subtitle="The younger side of Alcoholics Anonymous — meetings, conferences, committees, and the friendships that make recovery feel closer to home."
      />

      <section className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
          <article className="prose">
            <p>
              People use YPAA to describe the younger side of Alcoholics
              Anonymous: meetings, conferences, committees, and friendships
              that make recovery feel closer to home when you get sober
              early — or simply when you identify with the room.
            </p>
            <p>
              There is no separate set of steps, no different fellowship,
              and no alternate AA. YPAA is just the name many people use for
              the young people&rsquo;s network within AA. There also is not
              one universal age cutoff. Local groups and conferences may
              describe themselves differently. In practice, most people
              understand YPAA to mean younger members, newcomers, and anyone
              who feels at home in that part of the fellowship.
            </p>
            <p>
              The shorthand most people use: <em>same program, particular room.</em>
            </p>
          </article>

          <aside className="grid content-start gap-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="card card-quiet">
                <p className="eyebrow">{p.title}</p>
                <p className="body-sm mt-3">{p.body}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="mb-8 max-w-xl">
            <p className="eyebrow">Common questions</p>
            <h2 className="display-2 mt-3">Asked often, answered plainly.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {FAQS.map((f) => (
              <article key={f.q} className="card">
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 400,
                    fontSize: "1.2rem",
                    letterSpacing: "-0.018em",
                    lineHeight: 1.18,
                    color: "var(--color-ink)",
                  }}
                >
                  {f.q}
                </h3>
                <p className="body mt-4">{f.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell grid gap-3 sm:grid-cols-3">
          <Link href="/meetings" className="btn btn-secondary">
            Find a meeting
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="btn btn-secondary">
            About this site
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/submit" className="btn btn-primary">
            Send a correction
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
