import type { Metadata } from "next"
import { ConferencesExplorer } from "./conferences-explorer"
import { getConferenceCount, getPastConferences, getUpcomingConferences } from "@/lib/data/query/conferences"

export const metadata: Metadata = {
  title: "Conferences",
  description:
    "Upcoming and past YPAA conferences with map context, cleaner scanning, and room for better records over time.",
}

export default function ConferencesPage() {
  const upcoming = getUpcomingConferences()
  const past = getPastConferences()
  const total = getConferenceCount()

  return (
    <div className="pt-24 sm:pt-28">
      <section className="site-shell">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <section className="panel-raised rise-in relative overflow-hidden p-5 sm:p-7 md:p-9">
            <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(194,103,62,0.12),transparent_42%),radial-gradient(circle_at_top_right,rgba(200,164,78,0.14),transparent_38%)]" />
            <div className="relative z-10">
              <span className="section-kicker">Conferences</span>
              <h1 className="page-title mt-4 max-w-5xl sm:mt-5">
                A more readable calendar for what is coming up.
              </h1>
              <p className="page-intro mt-3 sm:mt-5">
                {total} conference records are currently in the system. Some are
                fully usable. Some are placeholders that still need confirmation.
                The product needs both honesty and momentum.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 sm:mt-7">
                {["Featured record", "Map context", "Archive notes"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-[0.75rem] border border-ink/8 bg-panel/60 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
            <section className="panel rise-in p-5 sm:p-6">
              <p className="meta-label">Calendar scale</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3 xl:grid-cols-3">
                <div className="stat-pair">
                  <strong className="!text-[var(--color-gold)]">{total}</strong>
                  <span>Total</span>
                </div>
                <div className="stat-pair">
                  <strong className="!text-[var(--color-gold)]">{upcoming.length}</strong>
                  <span>Upcoming</span>
                </div>
                <div className="stat-pair">
                  <strong className="!text-[var(--color-gold)]">{past.length}</strong>
                  <span>Archive</span>
                </div>
              </div>
            </section>

            <section className="panel-outline rise-in p-5 sm:p-6">
              <p className="meta-label">Record honesty</p>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                Some entries are ready to plan from. Some are scaffolds that need
                another source check before anybody books a room.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="site-shell mt-6">
        <div className="processional-divider" />
      </section>

      <ConferencesExplorer upcoming={upcoming} past={past} />
    </div>
  )
}
