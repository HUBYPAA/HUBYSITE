import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description:
    "Why this site exists, what it is for, and what kind of trust and restraint shaped the product.",
}

export default function AboutPage() {
  return (
    <div className="site-shell pb-16 pt-24 sm:pt-28">
      <span className="section-kicker">About</span>
      <h1 className="page-title mt-4 max-w-5xl sm:mt-5">
        A map-first YPAA site built to be calmer, clearer, and more trustworthy.
      </h1>
      <p className="page-intro mt-4 sm:mt-5">
        This project exists because the information is real, but the path to it
        is usually messy. Meetings are scattered. Conference details move around.
        Newcomers do not need more noise. They need orientation.
      </p>

      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <section className="panel-raised rise-in relative overflow-hidden p-5 sm:p-7 md:p-9">
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(200,164,78,0.15),transparent_42%),radial-gradient(circle_at_top_right,rgba(45,107,94,0.08),transparent_38%)]" />
          <div className="relative z-10">
            <span className="section-kicker">What this site is</span>
            <div className="mt-5 space-y-5 text-base leading-7 text-muted sm:mt-6 sm:space-y-6 sm:leading-8">
              <p>
                A national directory for young people&apos;s AA meetings,
                conference records, and supporting context. It is designed to
                help someone answer basic questions quickly: Is there a room
                near me? What is coming up? What does YPAA mean? Where do I send
                a correction?
              </p>
              <p>
                It is not trying to replace local AA service structures. It is a
                clearer front door into them.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-3">
              {[
                {
                  label: "Map-first",
                  body: "Start with orientation before filters and detail.",
                },
                {
                  label: "National scope",
                  body: "One place to scan rooms and weekends across states.",
                },
                {
                  label: "Volunteer-built",
                  body: "Improves because people keep sending cleaner info.",
                },
              ].map((item) => (
                <div key={item.label} className="panel-muted p-4">
                  <p className="meta-label">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-5">
          <section className="panel rise-in p-5 sm:p-7">
            <span className="section-kicker">What it is not</span>
            <ul className="stone-list mt-5 text-sm sm:mt-6">
              <li>Not an official AA body.</li>
              <li>Not a social feed.</li>
              <li>Not a place for personal profiles, attendance data, or public member names.</li>
              <li>Not a claim that every record is already perfect.</li>
            </ul>
          </section>

          <section className="panel-outline rise-in p-5 sm:p-7">
            <p className="meta-label">Operating stance</p>
            <h2 className="mt-3 font-serif text-[1.7rem] leading-[0.98] tracking-[-0.04em] text-ink sm:text-[2rem]">
              Calm design, honest records, and restraint that earns trust.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted sm:mt-4 sm:text-base">
              The product should feel authored, not loud. It should admit when a
              record still needs work. It should make the next action obvious.
            </p>
          </section>
        </div>
      </div>

      <div className="mt-10 sm:mt-12">
        <div className="processional-divider" />
      </div>

      <section className="page-band">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
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
            <article key={item.title} className="panel p-5 sm:p-6">
              <p className="meta-label">Principle</p>
              <h2 className="mt-3 font-serif text-xl tracking-[-0.04em] text-ink sm:mt-4 sm:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted sm:mt-4">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 sm:gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="panel rise-in p-5 sm:p-7">
          <span className="section-kicker">Why now</span>
          <p className="mt-4 text-base leading-7 text-muted sm:mt-5 sm:leading-8">
            Young people already travel between cities, conferences, committees,
            and home groups. The network behaves like a product even when nobody
            has designed it like one. This site treats that reality seriously.
          </p>
        </div>

        <div className="panel-vault rise-in p-5 sm:p-7">
          <span className="section-kicker">Keep it better</span>
          <h2 className="section-title mt-3 text-[rgba(240,235,228,0.95)] sm:mt-4">
            The directory stays useful only if corrections move faster than drift.
          </h2>
          <p className="mt-4 text-base leading-7 text-[rgba(210,203,194,0.68)] sm:mt-5 sm:leading-8">
            The long-term health of this directory depends on people sending
            precise corrections and better source links. The site should get
            stronger because the network uses it, not because the copy sounds
            confident.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 sm:mt-6 sm:gap-4">
            <Link href="/submit" className="action-primary">
              Submit / Update
            </Link>
            <Link href="/what-is-ypaa" className="action-secondary">
              Read what YPAA means
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
