import type { Metadata } from "next"
import Link from "next/link"
import { RunningHead } from "@/lib/components/ornament"

export const metadata: Metadata = {
  title: "What is YPAA · HUBYPAA",
  description:
    "Young people's AA: what it is, how the conferences work, and the vocabulary of the weekends.",
}

export default function WhatIsYpaaPage() {
  return (
    <section className="shell" aria-labelledby="whatis-title">
      {/* ── Hero ── */}
      <header className="section section--hero">
        <RunningHead
          left={<span className="smallcaps">What is YPAA</span>}
          center={<span>The short version</span>}
        />
        <h1 id="whatis-title" className="section-head">
          There is no separate set of steps,{" "}
          <em>no different fellowship, and no alternate AA.</em>
        </h1>
        <p className="lede max-w-3xl">
          YPAA is just the name many people use for the young people&apos;s
          network within AA. There also is not one universal age cutoff.
          Local groups and conferences may describe themselves differently.
        </p>
      </header>

      {/* ── What people usually mean ── */}
      <section className="section section--tight">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="frame">
            <RunningHead left={<span className="smallcaps">What people usually mean</span>} />
            <div className="mt-5 space-y-4 text-sm leading-7 text-stone-700 sm:mt-6 sm:space-y-5">
              <p>Meetings where the room tends to be younger.</p>
              <p>Conferences built around fellowship, speakers, workshops, and service.</p>
              <p>Committees or host structures that help organize those events.</p>
              <p>A social and service network that can make sobriety feel less isolating.</p>
            </div>
          </div>

          <div className="frame frame--carved">
            <RunningHead left={<span className="smallcaps">Common questions</span>} />
            <div className="mt-5 space-y-5 text-sm leading-7 text-stone-700 sm:mt-6 sm:space-y-6">
              <div>
                <h2 className="text-base font-medium text-ink sm:text-lg">
                  Do I have to be a certain age?
                </h2>
                <p className="mt-2">
                  AA itself does not set a membership age requirement. Local YPAA
                  spaces may describe who they are for, but there is no single
                  national rule that applies everywhere.
                </p>
              </div>
              <div>
                <h2 className="text-base font-medium text-ink sm:text-lg">
                  Can I go if I am just curious?
                </h2>
                <p className="mt-2">
                  If a meeting is open, yes. Open meetings welcome anyone who wants
                  to learn more. Closed meetings are generally for people who
                  identify as having a desire to stop drinking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Part of the picture ── */}
      <section className="section section--sm">
        <RunningHead
          left={<span className="smallcaps">Part of the picture</span>}
          center={<span>The three pillars</span>}
        />
        <h2 className="subhead">
          Meetings, conferences, and <em>the work behind them.</em>
        </h2>

        <div className="prose-grid">
          {[
            {
              title: "Meetings",
              body: "A YPAA meeting is still an AA meeting. Same steps, same traditions, same spiritual aim. The difference is often the age and energy of the room.",
            },
            {
              title: "Conferences",
              body: "YPAA conferences usually mix speakers, workshops, social time, committee business, and travel. They can become major nodes in the wider network.",
            },
            {
              title: "Service",
              body: "A lot of people first get involved through host committees and conference service. For many, that is where fellowship becomes responsibility.",
            },
          ].map((item) => (
            <article key={item.title} className="prose-card">
              <p className="prose-card__kicker">Part of the picture</p>
              <h2 className="mt-3 display-page sm:mt-4">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-700 sm:mt-4">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/meetings" className="btn btn--primary">
            Find a meeting
          </Link>
          <Link href="/conferences" className="btn btn--ghost">
            See the conferences
          </Link>
        </div>
      </section>
    </section>
  )
}
