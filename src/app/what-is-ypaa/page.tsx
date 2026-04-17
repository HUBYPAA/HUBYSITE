import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "What Is YPAA",
  description:
    "A plain-language explanation of Young People in AA, written for newcomers, the curious, and anyone who needs a quick orientation.",
}

export default function WhatIsYPAAPage() {
  return (
    <div className="site-shell pb-16 pt-24 sm:pt-28">
      <span className="section-kicker">What Is YPAA</span>
      <h1 className="page-title mt-4 max-w-5xl sm:mt-5">
        Young People in AA is a part of AA, not a separate program.
      </h1>
      <p className="page-intro mt-4 sm:mt-5">
        People use YPAA to describe the younger side of Alcoholics Anonymous:
        meetings, conferences, committees, and friendships that make recovery
        feel closer to home when you get sober early or simply identify with the
        room.
      </p>

      <section className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="panel-vault rise-in p-5 sm:p-7 md:p-9">
          <span className="section-kicker">The short version</span>
          <h2 className="section-title mt-3 text-[rgba(240,235,228,0.95)] sm:mt-4">
            It is part of AA, not a separate program.
          </h2>
          <div className="mt-5 space-y-5 text-base leading-7 text-[rgba(210,203,194,0.68)] sm:mt-6 sm:space-y-6 sm:leading-8">
            <p>
              There is no separate set of steps, no different fellowship, and no
              alternate AA. YPAA is just the name many people use for the young
              people&apos;s network within AA.
            </p>
            <p>
              There also is not one universal age cutoff. Local groups and
              conferences may describe themselves differently. In practice, most
              people understand YPAA to mean younger members, newcomers, and
              anyone who feels at home in that part of the fellowship.
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="panel rise-in p-5 sm:p-7">
            <span className="section-kicker">What people usually mean</span>
            <ul className="stone-list mt-5 text-sm sm:mt-6">
              <li>Meetings where the room tends to be younger.</li>
              <li>Conferences built around fellowship, speakers, workshops, and service.</li>
              <li>Committees or host structures that help organize those events.</li>
              <li>A social and service network that can make sobriety feel less isolating.</li>
            </ul>
          </div>

          <div className="panel-outline rise-in p-5 sm:p-7">
            <p className="meta-label">If you only need a room</p>
            <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
              Skip the theory and open the meetings map. This page is for context,
              not a prerequisite for showing up.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-10 sm:mt-12">
        <div className="processional-divider" />
      </div>

      <section className="page-band">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
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
            <article key={item.title} className="panel p-5 sm:p-6">
              <p className="meta-label">Part of the picture</p>
              <h2 className="mt-3 font-serif text-xl tracking-[-0.04em] text-ink sm:mt-4 sm:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted sm:mt-4">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="panel-raised rise-in p-5 sm:p-7">
          <span className="section-kicker">Common questions</span>
          <div className="mt-5 grid gap-4 text-sm leading-7 text-muted sm:mt-6">
            <div>
              <div className="panel-muted p-4 sm:p-5">
                <h2 className="text-base font-medium text-ink sm:text-lg">Do I have to be a certain age?</h2>
                <p className="mt-2">
                AA itself does not set a membership age requirement. Local YPAA
                spaces may describe who they are for, but there is no single
                national rule that applies everywhere.
                </p>
              </div>
            </div>
            <div>
              <div className="panel-muted p-4 sm:p-5">
                <h2 className="text-base font-medium text-ink sm:text-lg">Can I go if I am just curious?</h2>
                <p className="mt-2">
                If a meeting is open, yes. Open meetings welcome anyone who wants
                to learn more. Closed meetings are generally for people who
                identify as having a desire to stop drinking.
                </p>
              </div>
            </div>
            <div>
              <div className="panel-muted p-4 sm:p-5">
                <h2 className="text-base font-medium text-ink sm:text-lg">Is YPAA the only place young people recover?</h2>
                <p className="mt-2">
                No. Plenty of young people get sober in mixed-age meetings and
                never identify strongly with YPAA. It is one lane into recovery,
                not the only one.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="panel rise-in p-5 sm:p-7">
          <span className="section-kicker">Where to go from here</span>
          <p className="mt-4 text-base leading-7 text-muted sm:mt-5 sm:leading-8">
            If you need a room, go straight to meetings. If you want to
            understand the site itself, read About. If you found something off,
            send a correction rather than letting a bad record sit there.
          </p>
          <div className="mt-5 grid gap-3 sm:mt-6">
            <Link href="/meetings" className="action-secondary justify-between">
              Find meetings
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="action-secondary justify-between">
              About this site
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/submit" className="action-secondary justify-between">
              Submit a correction
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
