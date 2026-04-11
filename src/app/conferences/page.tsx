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
        <span className="section-kicker">Conferences</span>
        <h1 className="page-title mt-4 max-w-5xl sm:mt-5">
          A more readable calendar for what is coming up.
        </h1>
        <p className="page-intro mt-3 sm:mt-5">
          {total} conference records are currently in the system. Some are
          fully usable. Some are placeholders that still need confirmation.
          The product needs both honesty and momentum.
        </p>
      </section>

      <ConferencesExplorer upcoming={upcoming} past={past} />
    </div>
  )
}
