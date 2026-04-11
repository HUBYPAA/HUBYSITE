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
        <section className="panel-raised p-5 sm:p-7 md:p-9">
          <span className="section-kicker">What this site is</span>
          <div className="mt-5 space-y-5 text-base leading-7 text-muted sm:mt-6 sm:space-y-6 sm:leading-8">
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
        </section>

        <section className="panel p-5 sm:p-7">
          <span className="section-kicker">What it is not</span>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted sm:mt-6 sm:space-y-5">
            <p>Not an official AA body.</p>
            <p>Not a social feed.</p>
            <p>Not a place for personal profiles, attendance data, or public member names.</p>
            <p>Not a claim that every record is already perfect.</p>
          </div>
        </section>
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
              body: "The design stays dark, quiet, and editorial so the information feels considered rather than overpackaged.",
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
        <div className="panel p-5 sm:p-7">
          <span className="section-kicker">Why now</span>
          <p className="mt-4 text-base leading-7 text-muted sm:mt-5 sm:leading-8">
            Young people already travel between cities, conferences, committees,
            and home groups. The network behaves like a product even when nobody
            has designed it like one. This site treats that reality seriously.
          </p>
        </div>

        <div className="panel-raised p-5 sm:p-7">
          <span className="section-kicker">Keep it better</span>
          <p className="mt-4 text-base leading-7 text-muted sm:mt-5 sm:leading-8">
            The long-term health of this directory depends on people sending
            precise corrections and better source links. The site should get
            stronger because the network uses it, not because the copy sounds
            confident.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 sm:mt-6 sm:gap-4">
            <Link href="/submit" className="action-primary">
              Submit / Update
            </Link>
            <Link href="/what-is-ypaa" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent">
              Read what YPAA means
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
