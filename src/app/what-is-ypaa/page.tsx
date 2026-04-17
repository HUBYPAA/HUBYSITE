import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PortalHeader } from "@/lib/components/ornaments/portal-header"
import { FiligreeRule } from "@/lib/components/ornaments/filigree-rule"
import { HeraldicGlyph } from "@/lib/components/ornaments/heraldic-glyph"

export const metadata: Metadata = {
  title: "What Is YPAA",
  description:
    "A plain-language explanation of Young People in AA, written for newcomers, the curious, and anyone who needs a quick orientation.",
}

const FAQS = [
  {
    q: "Do I have to be a certain age?",
    a: "AA itself does not set a membership age requirement. Local YPAA spaces may describe who they are for, but there is no single national rule that applies everywhere.",
  },
  {
    q: "Can I go if I am just curious?",
    a: "If a meeting is open, yes. Open meetings welcome anyone who wants to learn more. Closed meetings are generally for people who identify as having a desire to stop drinking.",
  },
  {
    q: "Is YPAA the only place young people recover?",
    a: "No. Plenty of young people get sober in mixed-age meetings and never identify strongly with YPAA. It is one lane into recovery, not the only one.",
  },
]

export default function WhatIsYPAAPage() {
  return (
    <div className="pb-16">
      <PortalHeader
        glyph="open-book"
        kicker="what is ypaa"
        title="A part of AA, not a separate program."
        subtitle="The younger side of Alcoholics Anonymous — meetings, conferences, committees, and the friendships that make recovery feel closer to home."
        ribbonSeed={73}
      />

      {/* Inscribed prose */}
      <div className="site-shell mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
        <article className="prose-block max-w-none">
          <p>
            People use YPAA to describe the younger side of Alcoholics
            Anonymous: meetings, conferences, committees, and friendships that
            make recovery feel closer to home when you get sober early — or
            simply when you identify with the room.
          </p>
          <p>
            There is no separate set of steps, no different fellowship, and no
            alternate AA. YPAA is just the name many people use for the young
            people&apos;s network within AA. There also is not one universal
            age cutoff. Local groups and conferences may describe themselves
            differently. In practice, most people understand YPAA to mean
            younger members, newcomers, and anyone who feels at home in that
            part of the fellowship.
          </p>
          <p>
            The shorthand most people use: <em>same program, particular room.</em>
          </p>
        </article>

        <aside className="grid content-start gap-4">
          <div className="panel-chapel panel-chapel--ochre p-5">
            <span className="section-kicker">
              <HeraldicGlyph name="shield-cross" />
              meetings
            </span>
            <p
              className="mt-3 text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-prose)", fontSize: "0.92rem", lineHeight: 1.7 }}
            >
              Still AA meetings. Same steps, same traditions, same aim. The
              difference is often the age and energy of the room.
            </p>
          </div>
          <div className="panel-chapel panel-chapel--emerald p-5">
            <span className="section-kicker">
              <HeraldicGlyph name="star-diamond" />
              conferences
            </span>
            <p
              className="mt-3 text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-prose)", fontSize: "0.92rem", lineHeight: 1.7 }}
            >
              Speakers, workshops, social time, committee business, travel.
              These can become major nodes in the wider network.
            </p>
          </div>
          <div className="panel-chapel panel-chapel--carnation p-5">
            <span className="section-kicker">
              <HeraldicGlyph name="quill-key" />
              service
            </span>
            <p
              className="mt-3 text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-prose)", fontSize: "0.92rem", lineHeight: 1.7 }}
            >
              Many people first get involved through host committees and
              conference service — where fellowship becomes responsibility.
            </p>
          </div>
        </aside>
      </div>

      <div className="site-shell mt-14">
        <FiligreeRule tone="shadow" />
      </div>

      {/* FAQ as illuminated panels */}
      <section className="page-band pt-10">
        <div className="site-shell">
          <div className="mb-8 text-center">
            <span className="section-kicker">
              <HeraldicGlyph name="open-book" />
              common questions
            </span>
            <h2 className="section-title mt-3">Asked often, answered plainly.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {FAQS.map((faq) => (
              <article key={faq.q} className="panel p-5 sm:p-6">
                <p className="meta-label">question</p>
                <h3
                  className="mt-3 text-[var(--color-ink)]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.25rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}
                >
                  {faq.q}
                </h3>
                <p
                  className="mt-4 text-[var(--color-muted)]"
                  style={{ fontFamily: "var(--font-prose)", fontSize: "0.96rem", lineHeight: 1.78 }}
                >
                  {faq.a}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="site-shell">
        <FiligreeRule tone="shadow" />
      </div>

      <section className="page-band pt-10">
        <div className="site-shell grid gap-3 sm:grid-cols-3">
          <Link href="/meetings" className="action-secondary justify-between">
            find a meeting
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="action-secondary justify-between">
            about this site
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/submit" className="action-primary justify-between">
            send a correction
            <ArrowRight className="h-4 w-4 text-[var(--color-gilt-soft)]" />
          </Link>
        </div>
      </section>
    </div>
  )
}
