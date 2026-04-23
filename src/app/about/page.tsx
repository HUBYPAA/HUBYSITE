import type { Metadata } from "next"
import Link from "next/link"
import { RunningHead } from "@/lib/components/ornament"

export const metadata: Metadata = {
  title: "About · HUBYPAA",
  description:
    "A national directory for young people's AA meetings, conference records, and supporting context.",
}

export default function AboutPage() {
  return (
    <section className="shell" aria-labelledby="about-title">
      {/* ── Hero ── */}
      <header className="section section--hero">
        <RunningHead
          left={<span className="smallcaps">About</span>}
          center={<span>The Directory</span>}
        />
        <h1 id="about-title" className="section-head">
          This project exists because the information is real,{" "}
          <em>but the path to it is usually messy.</em>
        </h1>
        <p className="lede max-w-3xl">
          Meetings are scattered. Conference details move around.
          Newcomers do not need more noise. They need orientation.
        </p>
      </header>

      {/* ── What this site is / What it is not ── */}
      <section className="section section--tight">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div className="frame">
            <RunningHead left={<span className="smallcaps">What this site is</span>} />
            <div className="mt-5 space-y-5 text-base leading-7 text-stone-700 sm:mt-6 sm:space-y-6 sm:leading-8">
              <p>
                A national directory for young people&apos;s AA meetings,
                conference records, and supporting context. It is designed to help
                someone answer basic questions quickly: Is there a room near me?
                What is coming up? What does YPAA mean? Where do I send a
                correction?
              </p>
              <p>
                It is not trying to replace local AA service structures. It is a
                clearer front door into them.
              </p>
            </div>
          </div>

          <div className="frame frame--carved">
            <RunningHead left={<span className="smallcaps">What it is not</span>} />
            <div className="mt-5 space-y-4 text-sm leading-7 text-stone-700 sm:mt-6 sm:space-y-5">
              <p>Not an official AA body.</p>
              <p>Not a social feed.</p>
              <p>Not a place for personal profiles, attendance data, or public member names.</p>
              <p>Not a claim that every record is already perfect.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="section section--sm">
        <RunningHead
          left={<span className="smallcaps">Principles</span>}
          center={<span>How we keep this</span>}
        />
        <h2 className="subhead">
          Trust through <em>restraint and honesty.</em>
        </h2>

        <div className="prose-grid prose-grid--wide">
          {[
            {
              title: "Usefulness first",
              body: "The fastest path to value is a map, a readable list, and a small amount of honest context.",
            },
            {
              title: "Restraint on purpose",
              body: "The design stays calm, spacious, and editorial so the information feels considered rather than overpackaged.",
            },
            {
              title: "Trust through honesty",
              body: "Conference records that are still scaffold-level should say so. The product should not fake certainty.",
            },
          ].map((item) => (
            <article key={item.title} className="prose-card">
              <span className="prose-card__kicker">Principle</span>
              <h2 className="mt-3 display-page sm:mt-4">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-700 sm:mt-4">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Why now / Keep it better ── */}
      <section className="section section--sm">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="frame">
            <RunningHead left={<span className="smallcaps">Why now</span>} />
            <p className="mt-4 text-base leading-7 text-stone-700 sm:mt-5 sm:leading-8">
              Young people already travel between cities, conferences, committees,
              and home groups. The network behaves like a product even when nobody
              has designed it like one. This site treats that reality seriously.
            </p>
          </div>

          <div className="frame frame--carved">
            <RunningHead left={<span className="smallcaps">Keep it better</span>} />
            <p className="mt-4 text-base leading-7 text-stone-700 sm:mt-5 sm:leading-8">
              The long-term health of this directory depends on people sending
              precise corrections and better source links. The site should get
              stronger because the network uses it, not because the copy sounds
              confident.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 sm:mt-6 sm:gap-4">
              <Link href="/submit" className="btn btn--primary">
                Submit / Update
              </Link>
              <Link href="/safety" className="btn btn--ghost">
                How we keep this safe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
